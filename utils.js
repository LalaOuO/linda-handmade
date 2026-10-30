// utils.js
export function relDate(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function toInputDate(dottedStr) { 
  return dottedStr ? dottedStr.replace(/\./g, '-') : ''; 
}

export function toDisplayDate(dashedStr) { 
  return dashedStr ? dashedStr.replace(/-/g, '.') : ''; 
}

export function hexToRgb(hex) {
  let c = (hex || '#9B83A4').replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16) || 0;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

export function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function getColorCategory(hex) {
  if (!hex) return 'c_purple';
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (hsl.l <= 0.22) return 'c_gray';
  if (hsl.l >= 0.86 || (hsl.s <= 0.12 && hsl.l >= 0.65)) return 'c_white';
  if (hsl.s <= 0.14) return 'c_gray';
  const h = hsl.h;
  if (h >= 345 || h < 18) return 'c_red';
  if (h >= 18 && h < 55) return 'c_orange';
  if (h >= 65 && h < 168) return 'c_green';
  if (h >= 168 && h < 250) return 'c_blue';
  if (h >= 250 && h < 345) return 'c_purple';
  return 'c_purple';
}
