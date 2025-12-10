import { HEBREW_DATA, NORMALIZE_MAP } from '../data/constants';

// Auxiliar: Extraer números de "rgb(255, 0, 0)"
const parseRGB = (rgbStr) => {
  const match = rgbStr.match(/\d+/g);
  return match ? match.map(Number) : [0, 0, 0];
};

// MOTOR DE ANÁLISIS
export const analyzeFrequencyAndColor = (charsArray) => {
  if (!charsArray || charsArray.length === 0) return null;

  const frequency = {};
  let totalValidChars = 0;

  // 1. Conteo de Frecuencias
  charsArray.forEach(char => {
    const norm = NORMALIZE_MAP[char] || char;
    if (HEBREW_DATA[norm]) {
      frequency[norm] = (frequency[norm] || 0) + 1;
      totalValidChars++;
    }
  });

  // 2. Ordenar por Dominancia (Mayor a menor)
  const sortedKeys = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
  const dominantChar = sortedKeys[0]; // La letra rey

  // 3. Mezcla de Colores (Weighted Average)
  let sumR = 0, sumG = 0, sumB = 0;

  Object.keys(frequency).forEach(char => {
    const count = frequency[char];
    const data = HEBREW_DATA[char];
    const [r, g, b] = parseRGB(data.color);
    
    // Peso de la letra en la mezcla
    const weight = count / totalValidChars;
    
    sumR += r * weight;
    sumG += g * weight;
    sumB += b * weight;
  });

  const mixedColor = `rgb(${Math.round(sumR)}, ${Math.round(sumG)}, ${Math.round(sumB)})`;

  // 4. Generación del Dictamen Técnico (Estilo Rab. Yosef / Zonana)
  const domData = HEBREW_DATA[dominantChar];
  
  let diagnosis = "Lectura inconclusa. Datos insuficientes.";
  
  if (domData) {
    diagnosis = `
      DETECTADO: Sobrecarga de frecuencia '${domData.name}' (${frequency[dominantChar]} iteraciones).
      EJE SEFIRÓTICO: ${domData.sefira}.
      ELEMENTO: ${domData.element}.
      
      DICTAMEN TÉCNICO: La vibración dominante sugiere una concentración excesiva en la vasija de ${domData.planet}. 
      Para equilibrar la ecuación de luz, el sujeto debe trabajar: "${domData.energy}".
      
      ACCION REQUERIDA: Si la luz es directa, aplicar restricción (Gevurah). Si es reflejada, aumentar el otorgamiento (Chesed).
    `;
  }

  return {
    dominant: dominantChar,
    frequencyMap: frequency,
    total: totalValidChars,
    mixedColor: mixedColor,
    diagnosis: diagnosis,
    topList: sortedKeys.slice(0, 3) // Top 3 letras
  };
};