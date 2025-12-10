const PALETTE = [
  { name: 'Negro', rgb: [0, 0, 0] },
  { name: 'Blanco', rgb: [255, 255, 255] },
  { name: 'Rojo', rgb: [255, 0, 0] },
  { name: 'Naranja', rgb: [255, 165, 0] },
  { name: 'Amarillo', rgb: [255, 255, 0] },
  { name: 'Verde', rgb: [0, 128, 0] },
  { name: 'Cian', rgb: [0, 255, 255] },
  { name: 'Azul', rgb: [0, 0, 255] },
  { name: 'Violeta', rgb: [128, 0, 128] },
  { name: 'Magenta', rgb: [255, 0, 255] },
  { name: 'Gris', rgb: [128, 128, 128] }
];

export const getSemanticsFromRGB = (r, g, b) => {
  let min = Infinity;
  let name = 'Desconocido';
  PALETTE.forEach(c => {
    const dist = Math.sqrt((r-c.rgb[0])**2 + (g-c.rgb[1])**2 + (b-c.rgb[2])**2);
    if(dist < min) { min = dist; name = c.name; }
  });
  return name;
};