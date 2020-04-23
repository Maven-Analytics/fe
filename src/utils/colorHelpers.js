export function hexToRgb(hex, asString = true) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  if (asString) {
    return result ? `${r}, ${g}, ${b}` : null;
  }

  return result
    ? {
        r,
        g,
        b
      }
    : null;
}
