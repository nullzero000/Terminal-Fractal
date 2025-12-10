// Biblioteca de colores semánticos (High-End)
const COLOR_PALETTE = [
  { name: 'Obsidiana Absoluta', rgb: [0, 0, 0] },
  { name: 'Blanco Keter', rgb: [255, 255, 255] },
  { name: 'Carmesí Gevurah', rgb: [220, 20, 60] },
  { name: 'Azul Chesed', rgb: [0, 0, 205] },
  { name: 'Oro Tiferet', rgb: [255, 215, 0] },
  { name: 'Esmeralda Netzach', rgb: [0, 128, 0] },
  { name: 'Naranja Hod', rgb: [255, 140, 0] },
  { name: 'Violeta Yesod', rgb: [75, 0, 130] },
  { name: 'Ocre Malchut', rgb: [139, 69, 19] },
  { name: 'Cian Eléctrico', rgb: [0, 255, 255] },
  { name: 'Magenta Profundo', rgb: [139, 0, 139] },
  { name: 'Plata Lunar', rgb: [192, 192, 192] }
];

// Algoritmo de aproximación
const getColorDistance = (rgb1, rgb2) => {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
    Math.pow(rgb1[1] - rgb2[1], 2) +
    Math.pow(rgb1[2] - rgb2[2], 2)
  );
};

export const getSemanticsFromRGB = (r, g, b) => {
  let minDistance = Infinity;
  let closestColor = 'Indeterminado';

  COLOR_PALETTE.forEach(color => {
    const dist = getColorDistance([r, g, b], color.rgb);
    if (dist < minDistance) {
      minDistance = dist;
      closestColor = color.name;
    }
  });

  return closestColor;
};