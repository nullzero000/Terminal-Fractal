// src/App.jsx (Simplificado)
import React, { useState, useEffect } from 'react';
import { calculateMiluyLevels } from './utils/calculations';
import { analyzeFrequencyAndColor } from './utils/spectralEngine';
import TacticalReadout from './components/TacticalReadout'; // <--- IMPORTAR
// ... otros imports (Keyboard, etc)

function App() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState(null);

  // Efecto para recalcular en tiempo real
  useEffect(() => {
    const levels = calculateMiluyLevels(input, 5);
    // Extraemos todas las letras generadas en todos los niveles para el análisis espectral
    const allChars = levels.flatMap(l => l.chars);
    const result = analyzeFrequencyAndColor(allChars);
    setAnalysis(result);
  }, [input]);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      {/* 1. Input / Teclado aquí */}
      
      {/* 2. Visualización High-End */}
      {analysis && (
        <TacticalReadout data={analysis} />
      )}

      {/* 3. Tablas de datos crudos (opcional, debajo) */}
    </div>
  );
}

export default App;