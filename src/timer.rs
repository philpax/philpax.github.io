use std::time::{Duration, Instant};

pub struct Timer {
    step: usize,
    accumulated: Duration,
    verbose: bool,
}

impl Timer {
    pub fn new(verbose: bool) -> Self {
        Self {
            step: 1,
            accumulated: Duration::ZERO,
            verbose,
        }
    }

    pub fn step<R>(&mut self, label: &str, f: impl FnOnce(&mut Substeps) -> R) -> R {
        let now = Instant::now();
        let mut substeps = Substeps::new(self.verbose, 1);
        let result = f(&mut substeps);
        let elapsed = now.elapsed();
        println!("{}. {} in {:?}", self.step, label, elapsed);
        substeps.flush();
        self.step += 1;
        self.accumulated += elapsed;
        result
    }

    #[cfg(feature = "serve")]
    pub fn report(&mut self, label: &str, message: &str) {
        println!("{}. {} ({})", self.step, label, message);
        self.step += 1;
    }

    pub fn finish(self) {
        println!("Total time: {:?}", self.accumulated);
    }
}

struct BufferedLine {
    indent: usize,
    step: usize,
    label: String,
    elapsed: Option<Duration>,
    children: Vec<BufferedLine>,
}

impl BufferedLine {
    fn total_elapsed(&self) -> Duration {
        self.elapsed.unwrap_or(Duration::ZERO)
            + self
                .children
                .iter()
                .map(|c| c.total_elapsed())
                .sum::<Duration>()
    }

    fn print(&self) {
        let indent_str = "   ".repeat(self.indent);
        let total = self.total_elapsed();
        if total > Duration::ZERO {
            println!("{}{}. {} in {:?}", indent_str, self.step, self.label, total);
        } else {
            println!("{}{}. {}:", indent_str, self.step, self.label);
        }
        for child in &self.children {
            child.print();
        }
    }
}

pub struct Substeps {
    step: usize,
    verbose: bool,
    indent: usize,
    buffer: Vec<BufferedLine>,
}

impl Substeps {
    fn new(verbose: bool, indent: usize) -> Self {
        Self {
            step: 1,
            verbose,
            indent,
            buffer: Vec::new(),
        }
    }

    fn flush(&self) {
        for line in &self.buffer {
            line.print();
        }
    }

    pub fn step<R>(&mut self, label: &str, f: impl FnOnce() -> R) -> R {
        let now = Instant::now();
        let result = f();
        if self.verbose {
            let elapsed = now.elapsed();
            self.buffer.push(BufferedLine {
                indent: self.indent,
                step: self.step,
                label: label.to_string(),
                elapsed: Some(elapsed),
                children: Vec::new(),
            });
        }
        self.step += 1;
        result
    }

    pub fn step_nested<R>(&mut self, label: &str, f: impl FnOnce(&mut Substeps) -> R) -> R {
        let mut nested = Substeps::new(self.verbose, self.indent + 1);
        let result = f(&mut nested);
        if self.verbose {
            self.buffer.push(BufferedLine {
                indent: self.indent,
                step: self.step,
                label: label.to_string(),
                elapsed: None, // Will be computed from children
                children: nested.buffer,
            });
        }
        self.step += 1;
        result
    }

    pub fn report(&mut self, label: &str, elapsed: Duration) {
        if self.verbose {
            self.buffer.push(BufferedLine {
                indent: self.indent,
                step: self.step,
                label: label.to_string(),
                elapsed: Some(elapsed),
                children: Vec::new(),
            });
        }
        self.step += 1;
    }
}
