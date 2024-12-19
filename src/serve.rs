use std::{
    fs::File,
    io::{Read, Write},
    net::{TcpListener, TcpStream},
    path::{Path, PathBuf},
};

pub fn serve(output_dir: &Path, port: u16) -> anyhow::Result<()> {
    let addr = format!("127.0.0.1:{}", port);
    println!("Serving at http://{}", addr);
    println!("Hit CTRL-C to stop");

    let listener =
        TcpListener::bind(addr).map_err(|e| anyhow::anyhow!("Failed to bind to address: {}", e))?;

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                if let Err(e) = handle_connection(stream, output_dir) {
                    eprintln!("Error handling connection: {e:?}");
                }
            }
            Err(e) => eprintln!("Connection failed: {e:?}"),
        }
    }

    Ok(())
}

fn handle_connection(mut stream: TcpStream, root_dir: &Path) -> std::io::Result<()> {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer)?;

    let request = String::from_utf8_lossy(&buffer[..]);
    let request_line = request.lines().next().unwrap_or("");
    let parts: Vec<&str> = request_line.split_whitespace().collect();

    if parts.len() < 2 {
        return send_400(&mut stream);
    }

    let path = parts[1];

    if path == "/__poll_for_liveness" {
        return send_200_empty(&mut stream);
    }

    // Remove leading slash and decode percent-encoded characters
    let cleaned_path = decode_percent_encoding(&path[1..]);
    let file_path = root_dir.join(cleaned_path);

    // Prevent directory traversal
    if !file_path.starts_with(root_dir) {
        return send_403(&mut stream);
    }

    let file_path = if file_path.is_dir() {
        file_path.join("index.html")
    } else {
        file_path
    };

    let Ok(mut file) = File::open(&file_path) else {
        return send_404(&mut stream);
    };

    let mut contents = Vec::new();
    file.read_to_end(&mut contents)?;

    let mime_type = guess_mime_type(&file_path);
    send_200(&mut stream, &contents, mime_type)
}

fn decode_percent_encoding(path: &str) -> PathBuf {
    let mut result = String::with_capacity(path.len());
    let mut chars = path.chars();

    while let Some(c) = chars.next() {
        if c == '%' {
            let hex = chars
                .next()
                .and_then(|c1| chars.next().map(|c2| format!("{}{}", c1, c2)));

            if let Some(hex) = hex {
                if let Ok(byte) = u8::from_str_radix(&hex, 16) {
                    result.push(byte as char);
                    continue;
                }
            }
        }
        result.push(c);
    }

    PathBuf::from(result)
}

fn guess_mime_type(path: &Path) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("html") | Some("htm") => "text/html",
        Some("css") => "text/css",
        Some("js") => "application/javascript",
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        Some("gif") => "image/gif",
        Some("svg") => "image/svg+xml",
        Some("ico") => "image/x-icon",
        Some("json") => "application/json",
        Some("txt") => "text/plain",
        Some("pdf") => "application/pdf",
        Some("xml") => "application/xml",
        Some("woff") => "font/woff",
        Some("woff2") => "font/woff2",
        Some("ttf") => "font/ttf",
        Some("otf") => "font/otf",
        Some(ext) => panic!("Unknown file extension: {}", ext),
        None => "application/octet-stream",
    }
}

fn send_200(stream: &mut TcpStream, content: &[u8], content_type: &str) -> std::io::Result<()> {
    send_response(stream, "HTTP/1.1 200 OK", content_type, content)
}
fn send_200_empty(stream: &mut TcpStream) -> std::io::Result<()> {
    send_response(stream, "HTTP/1.1 200 OK", "text/plain", b"")
}
fn send_404(stream: &mut TcpStream) -> std::io::Result<()> {
    send_response(
        stream,
        "HTTP/1.1 404 NOT FOUND",
        "text/plain",
        b"404 Not Found",
    )
}
fn send_400(stream: &mut TcpStream) -> std::io::Result<()> {
    send_response(
        stream,
        "HTTP/1.1 400 BAD REQUEST",
        "text/plain",
        b"400 Bad Request",
    )
}
fn send_403(stream: &mut TcpStream) -> std::io::Result<()> {
    send_response(
        stream,
        "HTTP/1.1 403 FORBIDDEN",
        "text/plain",
        b"403 Forbidden",
    )
}
fn send_response(
    stream: &mut TcpStream,
    status_line: &str,
    content_type: &str,
    content: &[u8],
) -> std::io::Result<()> {
    let response = format!(
        "{}\r\nContent-Type: {}\r\nContent-Length: {}\r\n\r\n",
        status_line,
        content_type,
        content.len()
    );

    stream.write_all(response.as_bytes())?;
    stream.write_all(content)?;
    stream.flush()
}
