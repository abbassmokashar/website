const { Jimp } = require('jimp');
(async () => {
  for (const f of ['_t_light.png', '_t_dark.png']) {
    const img = await Jimp.read('C:/Users/MC/Desktop/My Portfolio/img/' + f);
    const w = img.bitmap.width, h = img.bitmap.height;
    const d = img.bitmap.data;
    const px = (x, y) => { const i = (y * w + x) * 4; return [d[i], d[i + 1], d[i + 2], d[i + 3]]; };

    // 1) Corner sample = pure panel background (should be uniform theme bg)
    const corner = px(8, 8);
    console.log('---', f, w + 'x' + h, 'corner(rgb):', corner.slice(0, 3).join(','));

    // 2) Build a 44x54 map: W = near-white pixel (>225), w = 200-225, D = dark, O = other
    const cols = 44, rows = 54;
    const cW = w / cols, cH = h / rows;
    let whiteCount = 0;
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        let white = 0, n = 0;
        for (let y = Math.floor(r * cH); y < Math.floor((r + 1) * cH); y += 2) {
          for (let x = Math.floor(c * cW); x < Math.floor((c + 1) * cW); x += 2) {
            const [rr, gg, bb] = px(x, y);
            const m = Math.max(rr, gg, bb);
            if (m > 225 && m - Math.min(rr, gg, bb) < 12) white++;
            n++;
          }
        }
        const frac = white / n;
        if (frac > 0.5) { line += 'W'; whiteCount++; }
        else if (frac > 0.2) line += 'w';
        else if (frac > 0.02) line += '.';
        else line += ' ';
      }
      console.log(line);
    }
    console.log('near-white cells:', whiteCount, '/', cols * rows, '\n');
  }
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
