// src/data/constants.js

// 1. BASE DE DATOS ONTOLÓGICA (Zohar / Energía / Color)
export const HEBREW_DATA = {
  // --- MADRES (Elementos) ---
  'א': { val: 1, color: 'rgb(240, 248, 255)', name: 'Aleph', type: 'Madre', element: 'Aire', planet: 'Urano', sefira: 'Keter', energy: 'Paradoja. Silencio que contiene todo el sonido.' },
  'מ': { val: 40, color: 'rgb(0, 0, 205)', name: 'Mem', type: 'Madre', element: 'Agua', planet: 'Neptuno', sefira: 'Chesed', energy: 'Matriz Gestante. Frío que une. Revelación.' },
  'ש': { val: 300, color: 'rgb(220, 20, 60)', name: 'Shin', type: 'Madre', element: 'Fuego', planet: 'Plutón', sefira: 'Gevurah', energy: 'Transformación radical. Fuego ascendente.' },

  // --- DOBLES (Planetas) ---
  'ב': { val: 2, color: 'rgb(255, 255, 240)', name: 'Bet', type: 'Doble', element: 'Tierra', planet: 'Luna', sefira: 'Chokhmah', energy: 'La Casa. Bendición y dualidad.' },
  'ג': { val: 3, color: 'rgb(255, 140, 0)', name: 'Gimel', type: 'Doble', element: 'Fuego', planet: 'Marte', sefira: 'Gevurah', energy: 'El dador. Riqueza y movimiento.' },
  'ד': { val: 4, color: 'rgb(255, 215, 0)', name: 'Dalet', type: 'Doble', element: 'Fuego', planet: 'Sol', sefira: 'Tiferet', energy: 'La Puerta. Anulación del ego.' },
  'כ': { val: 20, color: 'rgb(0, 128, 0)', name: 'Kaf', type: 'Doble', element: 'Tierra', planet: 'Venus', sefira: 'Netzach', energy: 'La Palma. Potencial de materialización.' },
  'פ': { val: 80, color: 'rgb(148, 0, 211)', name: 'Pei', type: 'Doble', element: 'Aire', planet: 'Mercurio', sefira: 'Hod', energy: 'La Boca. Poder de la palabra.' },
  'ר': { val: 200, color: 'rgb(105, 105, 105)', name: 'Resh', type: 'Doble', element: 'Tierra', planet: 'Saturno', sefira: 'Yesod', energy: 'Cabeza. Liderazgo o pobreza mental.' },
  'ת': { val: 400, color: 'rgb(75, 0, 130)', name: 'Tav', type: 'Doble', element: 'Tierra', planet: 'Júpiter', sefira: 'Malchut', energy: 'El Sello. Verdad absoluta.' },

  // --- SIMPLES (Zodiaco) ---
  'ה': { val: 5, color: 'rgb(255, 69, 0)', name: 'Hei', type: 'Simple', element: 'Fuego', planet: 'Aries', sefira: 'Malchut', energy: 'Aliento de vida. Expresión.' },
  'ו': { val: 6, color: 'rgb(139, 69, 19)', name: 'Vav', type: 'Simple', element: 'Tierra', planet: 'Tauro', sefira: 'Yesod', energy: 'El conector. Verdad y continuidad.' },
  'ז': { val: 7, color: 'rgb(255, 255, 0)', name: 'Zayin', type: 'Simple', element: 'Aire', planet: 'Géminis', sefira: 'Hod', energy: 'La Espada. Discernimiento.' },
  'ח': { val: 8, color: 'rgb(0, 191, 255)', name: 'Chet', type: 'Simple', element: 'Agua', planet: 'Cáncer', sefira: 'Binah', energy: 'Vida. Trascender límites.' },
  'ט': { val: 9, color: 'rgb(255, 165, 0)', name: 'Tet', type: 'Simple', element: 'Fuego', planet: 'Leo', sefira: 'Chesed', energy: 'Bondad oculta. Vasija fuerte.' },
  'י': { val: 10, color: 'rgb(85, 107, 47)', name: 'Yod', type: 'Simple', element: 'Tierra', planet: 'Virgo', sefira: 'Malchut', energy: 'Punto primordial. Humildad.' },
  'ל': { val: 30, color: 'rgb(173, 216, 230)', name: 'Lamed', type: 'Simple', element: 'Aire', planet: 'Libra', sefira: 'Tiferet', energy: 'Enseñanza. Conexión mente-corazón.' },
  'נ': { val: 50, color: 'rgb(0, 128, 128)', name: 'Nun', type: 'Simple', element: 'Agua', planet: 'Escorpio', sefira: 'Netzach', energy: 'Caída y Redención. Fidelidad.' },
  'ס': { val: 60, color: 'rgb(250, 128, 114)', name: 'Samekh', type: 'Simple', element: 'Fuego', planet: 'Sagitario', sefira: 'Tiferet', energy: 'Apoyo cíclico. Confianza.' },
  'ע': { val: 70, color: 'rgb(47, 79, 79)', name: 'Ayin', type: 'Simple', element: 'Tierra', planet: 'Capricornio', sefira: 'Hod', energy: 'El Ojo. Percepción profunda.' },
  'צ': { val: 90, color: 'rgb(224, 255, 255)', name: 'Tzadik', type: 'Simple', element: 'Aire', planet: 'Acuario', sefira: 'Yesod', energy: 'El Justo. Rectitud.' },
  'ק': { val: 100, color: 'rgb(70, 130, 180)', name: 'Kof', type: 'Simple', element: 'Agua', planet: 'Piscis', sefira: 'Malchut', energy: 'Santidad. Elevar chispas.' }
};

// 2. MAPA DE EXPANSIÓN (MILUY)
export const MILUY_MAP = {
  'א': ['א', 'ל', 'ף'], 
  'ב': ['ב', 'י', 'ת'], 
  'ג': ['ג', 'מ', 'ל'],
  'ד': ['ד', 'ל', 'ת'], 
  'ה': ['ה', 'ה'],       
  'ו': ['ו', 'א', 'ו'],
  'ז': ['ז', 'י', 'ן'], 
  'ח': ['ח', 'י', 'ת'], 
  'ט': ['ט', 'י', 'ת'],
  'י': ['י', 'ו', 'ד'], 
  'כ': ['כ', 'ף'],       
  'ך': ['כ', 'ף'],       
  'ל': ['ל', 'מ', 'ד'], 
  'מ': ['מ', 'ם'],       
  'ם': ['מ', 'ם'],
  'נ': ['נ', 'ו', 'ן'], 
  'ן': ['נ', 'ו', 'ן'], 
  'ס': ['ס', 'מ', 'כ'],
  'ע': ['ע', 'י', 'ן'], 
  'פ': ['פ', 'א', 'י'], 
  'ף': ['פ', 'א', 'י'],
  'צ': ['צ', 'ד', 'י'], 
  'ץ': ['צ', 'ד', 'י'], 
  'ק': ['ק', 'ו', 'ף'],
  'ר': ['ר', 'י', 'ש'], 
  'ש': ['ש', 'י', 'ן'], 
  'ת': ['ת', 'ו', 'י']
};

// 3. NORMALIZACIÓN DE LETRAS FINALES (SOFIT)
export const NORMALIZE_MAP = {
  'ך': 'כ', 
  'ם': 'מ', 
  'ן': 'נ', 
  'ף': 'פ', 
  'ץ': 'צ'
};

// 4. DISPOSICIÓN DEL TECLADO
export const KEYBOARD_LAYOUT = [
  "אבגדהוזחטי",
  "כלמנסעפצקר",
  "שת"
];