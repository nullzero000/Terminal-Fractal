// src/utils/calculations.js
import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '../data/constants';

// --- MOTOR AUXILIAR 1: Suma Digital ---
// Ejemplo: Recibe 123 -> Devuelve 6 (1+2+3)
export const digitalSum = (num) => {
  return String(num)
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
};

// --- MOTOR AUXILIAR 2: Reducción de Esencia ---
// Reduce recursivamente hasta quedar en un solo dígito (1-9)
export const reduceToSingleDigit = (num) => {
  let current = num;
  while (current >= 10) {
    current = digitalSum(current);
  }
  return current;
};

// --- MOTOR PRINCIPAL: Generador Fractal (Miluy) ---
export const calculateMiluyLevels = (inputString, maxLevel = 5) => {
  if (!inputString) return [];

  const levels = [];
  
  // Nivel 0: La entrada original (convertida a array y limpia de espacios)
  let currentChars = inputString.split('').filter(c => c !== ' ');

  for (let i = 0; i <= maxLevel; i++) {
    // A. Calcular Gematria del Nivel Actual
    let levelSum = 0;

    currentChars.forEach(char => {
      // 1. Normalizar: Si es Sofit (final), la convertimos a su base (ej. ם -> מ)
      // para poder buscar su valor numérico en la base de datos.
      const normalizedChar = NORMALIZE_MAP[char] || char;
      
      // 2. Buscar valor en la Matrix
      const data = HEBREW_DATA[normalizedChar]; 
      
      // 3. Sumar (Si el caracter es válido)
      if (data) {
        levelSum += data.val;
      }
    });

    // B. Guardar la "foto" de este nivel
    levels.push({
      level: i,
      chars: currentChars, // Las letras que componen este nivel
      totalValue: levelSum, // La suma total (Masa)
      reducedValue: reduceToSingleDigit(levelSum) // La reducción (Esencia)
    });

    // C. Expansión Fractal (Preparar el siguiente nivel)
    // Si aún no llegamos al nivel 5, expandimos cada letra.
    if (i < maxLevel) {
      const nextChars = [];
      currentChars.forEach(char => {
        // Buscamos la expansión en el mapa. 
        // Si no existe (ej. un signo desconocido), se mantiene el caracter original.
        const expansion = MILUY_MAP[char] || [char];
        nextChars.push(...expansion);
      });
      // El resultado de la expansión se convierte en la entrada del siguiente ciclo
      currentChars = nextChars;
    }
  }

  return levels;
};