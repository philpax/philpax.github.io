use anyhow::Context;
use std::path::{Path, PathBuf};
use std::process::Command;

const VERSION: &str = "4.1.6";
const TAILWIND_CSS_INPUT: &str = "src/styles/tailwind.css";

/// Downloads the requested version of Tailwind, if required, and runs it.
pub fn download_and_run(fast: bool) -> anyhow::Result<String> {
    run_with_local(&download(fast)?)
}

/// Run the globally-installed `tailwind` executable.
pub fn run_with_global() -> anyhow::Result<String> {
    let (shell, flag) = if cfg!(target_os = "windows") {
        ("cmd", "/C")
    } else {
        ("sh", "-c")
    };

    run_tailwind_command(Command::new(shell).args([
        flag,
        &format!("tailwindcss --input {TAILWIND_CSS_INPUT} --output -"),
    ]))
}

fn run_with_local(tailwind_executable: &Path) -> anyhow::Result<String> {
    run_tailwind_command(Command::new(tailwind_executable.canonicalize()?).args([
        "--input",
        TAILWIND_CSS_INPUT,
        "--output",
        "-",
    ]))
}

fn run_tailwind_command(command: &mut Command) -> anyhow::Result<String> {
    let output = command.output().context("Failed to run tailwind")?;
    let stdout = String::from_utf8_lossy(&output.stdout);

    if !output.status.success() {
        anyhow::bail!(
            "Failed to run tailwind: stdout {stdout}, stderr {}",
            String::from_utf8_lossy(&output.stderr)
        );
    }

    Ok(stdout.to_string())
}

/// Download a fixed version of Tailwind CSS's CLI
fn download(fast: bool) -> anyhow::Result<PathBuf> {
    let output_path = if cfg!(target_os = "windows") {
        PathBuf::from("tailwind.exe")
    } else {
        PathBuf::from("tailwind")
    };

    // Check if executable exists and has correct version
    if output_path.exists() {
        if fast {
            // We skip the version check if fast mode is enabled
            return Ok(output_path);
        }

        let output = Command::new(output_path.canonicalize()?)
            .output()
            .context("Failed to execute tailwind")?;

        let stdout = String::from_utf8_lossy(&output.stdout);
        let Some(first_line) = stdout.lines().next() else {
            anyhow::bail!("Failed to read tailwind version");
        };
        if first_line.contains(&format!("v{VERSION}")) {
            return Ok(output_path);
        }
    }

    let url = {
        let executable_name = if cfg!(target_os = "windows") && cfg!(target_arch = "x86_64") {
            "tailwindcss-windows-x64.exe"
        } else if cfg!(target_os = "macos") && cfg!(target_arch = "aarch64") {
            "tailwindcss-macos-arm64"
        } else if cfg!(target_os = "macos") && cfg!(target_arch = "x86_64") {
            "tailwindcss-macos-x64"
        } else if cfg!(target_os = "linux") && cfg!(target_arch = "aarch64") {
            "tailwindcss-linux-arm64"
        } else if cfg!(target_os = "linux") && cfg!(target_arch = "x86_64") {
            "tailwindcss-linux-x64"
        } else {
            anyhow::bail!("Unsupported platform");
        };
        format!("https://github.com/tailwindlabs/tailwindcss/releases/download/v{VERSION}/{executable_name}")
    };

    // Download using OS-specific commands
    if cfg!(target_os = "windows") {
        // Use PowerShell's Invoke-WebRequest (aliased as curl)
        let command = format!(
            "$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri '{url}' -OutFile '{}'",
            output_path.display()
        );
        Command::new("powershell")
            .args(["-Command", &command])
            .status()
            .context("Failed to download using PowerShell")?;
    } else {
        // Use curl for Unix systems (Linux/macOS)
        Command::new("curl")
            .args(["-L", "-o", output_path.to_str().unwrap(), &url])
            .status()
            .context("Failed to download using curl")?;
    }

    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(&output_path, std::fs::Permissions::from_mode(0o755))?;
    }

    Ok(output_path)
}
