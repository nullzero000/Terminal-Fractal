import React, { useState, useMemo } from 'react';
import { analyzeFrequencyAndColor } from '../utils/spectralEngine';
import { HEBREW_DATA } from '../data/constants';

const styles = {
  container: (baseColor) => ({
    backgroundColor: baseColor,
    // Overlay oscuro para garantizar legibilidad del texto blanco
    backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(0,0,0,0.98) 100%)`,
    border: `1px solid rgba(255,255,255,0.15)`,
    boxShadow: `0 0 80px -20px ${baseColor}`,
    borderRadius: '12px', 
    padding: '30px', 
    color: '#fff', 
    fontFamily: 'sans-serif',
    maxWidth: '650px', 
    margin: '30px auto', 
    position: 'relative', 
    overflow: 'hidden', 
    transition: 'background-color 0.5s ease'
  }),
  nav: { 
    display: 'flex', 
    gap: '5px', 
    marginBottom: '25px', 
    borderBottom: '1px solid rgba(255,255,255,0.15)', 
    paddingBottom: '10px', 
    overflowX: 'auto' 
  },
  tab: (isActive) => ({
    background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
    border: 'none', 
    padding: '8px 12px', 
    cursor: 'pointer', 
    fontSize: '0.75rem', 
    textTransform: 'uppercase', 
    borderRadius: '4px',
    transition: 'all 0.3s', 
    fontWeight: isActive ? 'bold' : 'normal'
  }),
  content: { animation: 'fadeIn 0.6s ease' },
  
  // SECCIÓN ÁUREA
  goldenSection: { 
    display: 'flex', 
    alignItems: 'baseline', 
    justifyContent: 'center', 
    gap: '15px', 
    margin: '30px 0', 
    padding: '20px 0', 
    borderTop: '1px solid rgba(255,255,255,0.1)', 
    borderBottom: '1px solid rgba(255,255,255,0.1)' 
  },
  goldenLetter: (size, color) => ({ 
    fontSize: `${size}rem`, 
    color: color, 
    textShadow: `0 0 ${size * 5}px ${color}`, 
    lineHeight: 1, 
    fontFamily: 'serif', 
    transition: 'all 0.5s ease' 
  }),
  
  sectionTitle: { 
    fontSize: '0.65rem', 
    color: 'rgba(255,255,255,0.4)', 
    letterSpacing: '3px', 
    textTransform: 'uppercase', 
    marginTop: '30px', 
    marginBottom: '10px', 
    textAlign: 'center' 
  },
  textBody: { 
    fontSize: '1.1rem', 
    lineHeight: '1.7', 
    color: 'rgba(255,255,255,0.9)', 
    textAlign: 'center' 
  },
  
  // GRILLA DE ATRIBUTOS
  attrGrid: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '10px', 
    flexWrap: 'wrap',
    fontSize: '0.75rem', 
    color: '#aaa', 
    marginTop: '15px', 
    fontFamily: 'monospace' 
  },
  attrItem: { 
    border: '1px solid #444', 
    padding: '4px 10px', 
    borderRadius: '4px',
    background: 'rgba(0,0,0,0.3)'
  }
};

const TacticalReadout = ({ levels, getActiveColor, colorSystem }) => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  // Recalcular cuando cambia el nivel O el sistema de color
  const analysis = useMemo(() => {
    if (!levels || !levels[selectedLevel]) return null;
    return analyzeFrequencyAndColor(levels[selectedLevel].chars, colorSystem);
  }, [levels, selectedLevel, colorSystem]);

  if (!levels || levels.length === 0 || !analysis) return null;

  const { dominantData, frequencyMap } = analysis;
  
  // Color del sistema activo para el fondo ambiental
  const systemColor = getActiveColor(analysis.dominant); 

  // TOP 5 (Ordenado por frecuencia)
  const sortedLetters = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
  const top5 = sortedLetters.slice(0, 5);
  const GOLDEN_RATIO = 1.618;
  const BASE_SIZE = 4.5;

  return (
    <div style={styles.container(systemColor)}>
      <div style={styles.nav}>
        {levels.map((lvl) => (
          <button key={lvl.level} style={styles.tab(selectedLevel === lvl.level)} onClick={() => setSelectedLevel(lvl.level)}>
            {lvl.level === 0 ? 'RAÍZ' : `NIVEL ${lvl.level}`}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.sectionTitle}>FRECUENCIA ÁUREA (TOP 5)</div>
        
        <div style={styles.goldenSection}>
          {top5.map((char, i) => {
            // Tamaño decrece según proporción áurea
            const size = BASE_SIZE / Math.pow(GOLDEN_RATIO, i);
            // Color según el sistema elegido
            const color = getActiveColor(char);
            
            return (
              <div key={char} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <span style={styles.goldenLetter(size, color)}>{char}</span>
                <span style={{fontSize:'0.6rem', opacity:0.3, marginTop:'5px'}}>x{frequencyMap[char]}</span>
              </div>
            );
          })}
        </div>

        <div style={styles.sectionTitle}>SINTESIS DE EJE: {analysis.dominant} ({dominantData?.name})</div>
        
        {/* Atributos Místicos */}
        <div style={styles.attrGrid}>
          <span style={styles.attrItem}>ELEM: {dominantData?.element || 'N/A'}</span>
          <span style={styles.attrItem}>PLAN: {dominantData?.planet || 'N/A'}</span>
          <span style={styles.attrItem}>ARCANO: {dominantData?.tarot || 'N/A'}</span>
        </div>

        <div style={{...styles.textBody, marginTop: '20px'}}>
          {dominantData?.energy}
        </div>
      </div>
    </div>
  );
};

export default TacticalReadout;