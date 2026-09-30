//! A field of contour lines like the header's, drawn for the preview images.
//!
//! Seeded value noise, summed over a few octaves, gives a smooth rolling
//! height field. Lines are drawn where the height crosses evenly spaced
//! levels, each a fixed width in pixels however steep the field is under it.

/// A field drawn in `colour` over `background`, `width` by `height`, as RGBA.
/// Each `seed` gives a different field.
pub fn render(
    width: u32,
    height: u32,
    seed: u64,
    background: [f64; 3],
    colour: [f64; 3],
) -> Vec<u8> {
    let noise = Noise { seed };
    // One sample past each edge, so every pixel has a neighbour to measure
    // the field's slope against.
    let columns = width as usize + 1;
    let heights: Vec<f64> = (0..=height)
        .flat_map(|y| (0..=width).map(move |x| (x, y)))
        .map(|(x, y)| noise.fractal(x as f64 / SCALE, y as f64 / SCALE))
        .collect();
    let at = |x: usize, y: usize| heights[y * columns + x];

    let mut rgba = Vec::with_capacity(width as usize * height as usize * 4);
    for y in 0..height as usize {
        for x in 0..width as usize {
            let h = at(x, y);
            let level = h * LEVELS;
            // How far the level moves per pixel here, and so how many pixels
            // away the nearest line is.
            let slope = (at(x + 1, y) - h).hypot(at(x, y + 1) - h) * LEVELS;
            let to_line = (level - level.round()).abs() / slope.max(f64::EPSILON);
            let line = 1.0 - smoothstep(LINE_HALF_WIDTH - 0.75, LINE_HALF_WIDTH + 0.75, to_line);
            // Lines fade where the field runs low, which gives it depth.
            let alpha = line * (0.55 + 0.45 * smoothstep(0.1, 0.6, h)) * OPACITY;
            rgba.extend(
                background.iter().zip(colour).map(|(&bg, fg)| {
                    ((bg + (fg - bg) * alpha).clamp(0.0, 1.0) * 255.0).round() as u8
                }),
            );
            rgba.push(255);
        }
    }
    rgba
}

// --- Private implementation details ---

/// Pixels to one cell of the coarsest octave.
const SCALE: f64 = 220.0;
/// Contour levels across the field's range of heights.
const LEVELS: f64 = 9.0;
/// Half a line's width in pixels. The images are shown scaled down, so the
/// lines are heavier than the header's hairlines.
const LINE_HALF_WIDTH: f64 = 1.5;
/// How strongly the lines show over the background, as in the header.
const OPACITY: f64 = 0.5;
const OCTAVES: u32 = 4;

/// Value noise: a random height at each point of an integer lattice, eased
/// between.
struct Noise {
    seed: u64,
}

impl Noise {
    /// Octaves of noise, each twice as fine and half as strong as the last,
    /// in 0..1.
    fn fractal(&self, x: f64, y: f64) -> f64 {
        let (mut sum, mut total, mut strength, mut frequency) = (0.0, 0.0, 1.0, 1.0);
        for octave in 0..OCTAVES {
            sum += strength * self.value(x * frequency, y * frequency, octave);
            total += strength;
            strength *= 0.5;
            frequency *= 2.0;
        }
        sum / total
    }

    /// One octave at a point, in 0..1.
    fn value(&self, x: f64, y: f64, octave: u32) -> f64 {
        let (x0, y0) = (x.floor(), y.floor());
        let ease = |t: f64| t * t * (3.0 - 2.0 * t);
        let (tx, ty) = (ease(x - x0), ease(y - y0));
        let (x0, y0) = (x0 as i64, y0 as i64);
        let corner = |dx: i64, dy: i64| self.lattice(x0 + dx, y0 + dy, octave);
        let top = lerp(corner(0, 0), corner(1, 0), tx);
        let bottom = lerp(corner(0, 1), corner(1, 1), tx);
        lerp(top, bottom, ty)
    }

    /// The height at a lattice point, in 0..1: a hash of the point, the
    /// octave and the seed.
    fn lattice(&self, x: i64, y: i64, octave: u32) -> f64 {
        let mut h = self.seed
            ^ (x as u64).wrapping_mul(0x9e37_79b9_7f4a_7c15)
            ^ (y as u64).wrapping_mul(0xc2b2_ae3d_27d4_eb4f)
            ^ (octave as u64).wrapping_mul(0x1656_67b1_9e37_79f9);
        // SplitMix64's finaliser.
        h = (h ^ (h >> 30)).wrapping_mul(0xbf58_476d_1ce4_e5b9);
        h = (h ^ (h >> 27)).wrapping_mul(0x94d0_49bb_1331_11eb);
        h ^= h >> 31;
        (h >> 11) as f64 / (1u64 << 53) as f64
    }
}

fn lerp(a: f64, b: f64, t: f64) -> f64 {
    a + (b - a) * t
}

fn smoothstep(edge0: f64, edge1: f64, x: f64) -> f64 {
    let t = ((x - edge0) / (edge1 - edge0)).clamp(0.0, 1.0);
    t * t * (3.0 - 2.0 * t)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn the_same_seed_draws_the_same_field() {
        let draw = |seed| render(32, 16, seed, [0.0; 3], [1.0; 3]);
        assert_eq!(draw(1), draw(1));
        assert_ne!(draw(1), draw(2));
    }

    #[test]
    fn noise_stays_in_range() {
        let noise = Noise { seed: 7 };
        for i in 0..1000 {
            let v = noise.fractal(i as f64 * 0.37, i as f64 * 0.61);
            assert!((0.0..=1.0).contains(&v), "{v}");
        }
    }
}
