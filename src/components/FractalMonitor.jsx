import React from 'react';
import { analyzeFrequencyAndColor } from '../utils/spectralEngine';

const styles = {
  details: {
    marginTop: '30px',
    borderTop: '1px solid #333',
    color: '#666',
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    width: '100%',
    maxWidth: '850px',
    cursor: 'pointer'
  },
  summary: { 
    padding: '15px 0', 
    outline: 'none', 
    color: '#888', 
    textTransform: 'uppercase', 
    letterSpacing: '1px' 
  },
  content: { 
    padding: '15px', 
    background: '#050505', 
    borderRadius: '8px', 
    border: '1px solid #222' 
  },
  
  // Grid: Nivel | Letras | RGB | Suma
  row: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 140px 60px', 
    gap: '15px',
    alignItems: 'start',
    marginBottom: '8px',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '8px'
  },
  colLevel: { color: '#555' },
  colChars: { 
    color: '#aaa', 
    letterSpacing: '2px', 
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    fontSize: '0.9rem'
  },
  colRGB: {
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    color: '#666',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  rgbPreview: (color) => ({
    display: 'inline-block',
    width: '10px', height: '10px',
    background: color,
    borderRadius: '2px',
    marginRight: '5px'
  }),
  colMath: { textAlign: 'right', color: '#888', fontWeight: 'bold' }
};

const FractalMonitor = ({ levels, colorSystem }) => {
  if (!levels) return null;

  return (
    <details style={styles.details}>
      <summary style={styles.summary}>[+] EXPEDIENTE TÉCNICO & DATA VECTORIAL</summary>
      <div style={styles.content}>
        
        {/* Cabecera */}
        <div style={{...styles.row, borderBottom: '1px solid #444', color: '#fff', fontSize:'0.7rem'}}>
            <div>LVL</div>
            <div>SECUENCIA</div>
            <div style={{textAlign:'right'}}>VECTOR RGB</div>
            <div style={{textAlign:'right'}}>GEM</div>
        </div>

        {levels.map((lvl) => {
          // CRITICO: Pasamos el colorSystem al motor para que calcule con la paleta correcta
          const analysis = analyzeFrequencyAndColor(lvl.chars, colorSystem);
          
          // Formateo visual del RGB
          const rgbRaw = analysis ? analysis.mixedColor.replace('rgb(', '').replace(')', '') : '0,0,0';

          return (
            <div key={lvl.level} style={styles.row}>
               <span style={styles.colLevel}>{lvl.level}</span>
               
               <span style={styles.colChars}>
                 {lvl.chars.join(' ')}
               </span>
               
               <div style={styles.colRGB}>
                 <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                    <span style={styles.rgbPreview(analysis?.mixedColor)}></span>
                    {rgbRaw}
                 </div>
               </div>
               
               <span style={styles.colMath}>{lvl.reducedValue}</span>
            </div>
          );
        })}
      </div>
    </details>
  );
};

export default FractalMonitor;