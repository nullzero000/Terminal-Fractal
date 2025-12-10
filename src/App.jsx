// ... (Imports iguales que antes)
import React, { useState, useEffect } from 'react';
import { calculateMiluyLevels } from './utils/calculations';
import TacticalReadout from './components/TacticalReadout'; 
import HebrewKeyboard from './components/HebrewKeyboard';
import FractalMonitor from './components/FractalMonitor';
import { HEBREW_DATA } from './data/constants'; 

function App() {
  const [input, setInput] = useState('');
  const [fractalData, setFractalData] = useState([]);
  const [colorSystem, setColorSystem] = useState('gd'); // gd, ari, ort
  const [customColors, setCustomColors] = useState({});

  const getActiveColor = (char) => {
    if (!HEBREW_DATA[char]) return '#555';
    if (colorSystem === 'custom' && customColors[char]) return customColors[char];
    return HEBREW_DATA[char].palettes[colorSystem] || HEBREW_DATA[char].palettes['gd'];
  };

  const handleKeyPress = (char) => {
    if (char === 'BACKSPACE') {
      setInput(prev => prev.slice(0, -1));
    } else if (char === ' ') {
      setInput(prev => prev + ' ');
    } else {
      setInput(prev => prev + char);
    }
  };

  useEffect(() => {
    if (!input || input.trim() === '') {
      setFractalData([]);
      return;
    }
    const levels = calculateMiluyLevels(input, 5);
    setFractalData(levels);
  }, [input]);

  // Props compartidas
  const sharedProps = { colorSystem, customColors, getActiveColor };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'Helvetica, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px'}}>
        <div style={{ fontSize: '0.8rem', color: '#444', letterSpacing: '2px' }}>TERMINAL EJE-13</div>
        <div style={{display: 'flex', gap: '5px'}}>
          {['gd', 'ari', 'ort'].map(sys => (
            <button 
              key={sys}
              onClick={() => setColorSystem(sys)}
              style={{
                background: colorSystem === sys ? '#333' : 'transparent',
                color: colorSystem === sys ? '#fff' : '#444',
                border: '1px solid #333', padding: '6px 12px', fontSize: '0.6rem', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px'
              }}
            >
              {sys === 'gd' ? 'HERMÉTICO' : sys === 'ari' ? 'LURIÁNICO' : 'ORTODOXO'}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        fontSize: '3.5rem', fontFamily: 'serif', minHeight: '80px', margin: '0 0 30px 0',
        width: '90%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row-reverse', gap: '4px'
      }}>
        {input.length > 0 ? (
          input.split('').map((char, index) => {
            const charColor = getActiveColor(char);
            // Visibilidad en input también: si es negro, glow blanco
            const isDark = charColor === 'rgb(0, 0, 0)';
            return (
              <span key={index} style={{ 
                color: charColor,
                textShadow: isDark ? `0 0 10px rgba(255,255,255,0.5)` : `0 0 25px ${charColor}`,
                fontWeight: 'bold', lineHeight: 1
              }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })
        ) : <span style={{opacity: 0.1}}>...</span>}
      </div>

      <HebrewKeyboard onKeyPress={handleKeyPress} {...sharedProps} />

      {fractalData.length > 0 && (
        <>
          <TacticalReadout levels={fractalData} {...sharedProps} />
          {/* IMPORTANTE: Pasamos colorSystem para que el monitor calcule bien el RGB */}
          <FractalMonitor levels={fractalData} colorSystem={colorSystem} /> 
        </>
      )}

    </div>
  );
}

export default App;