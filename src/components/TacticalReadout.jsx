import React, { useState } from 'react';

// Estilos
const styles = {
  container: (glowColor) => ({
    background: `linear-gradient(145deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.8) 100%)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid rgba(255,255,255,0.1)`,
    borderLeft: `4px solid ${glowColor}`,
    boxShadow: `0 0 30px -10px ${glowColor}40`,
    borderRadius: '12px',
    padding: '24px',
    color: '#E5E5E5',
    fontFamily: '"Courier New", Courier, monospace', // Fallback seguro si no hay fuentes cargadas
    maxWidth: '500px',
    margin: '20px auto',
    position: 'relative',
    overflow: 'hidden'
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '10px'
  },
  letterBox: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: 1
  },
  metaData: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '0.8rem',
    opacity: 0.7
  },
  colorBadge: (bg) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.1)', // Fondo neutro con borde de color
    border: `1px solid ${bg}`,
    color: '#fff',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  }),
  axiomBox: {
    marginTop: '20px',
    padding: '15px',
    background: 'rgba(255,255,255,0.03)',
    borderLeft: '2px solid #555',
  },
  axiomTitle: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '8px',
    color: '#aaa'
  },
  axiomText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    fontStyle: 'italic'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  button: (active) => ({
    flex: 1,
    padding: '10px',
    background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    color: active ? '#fff' : '#888',
    cursor: 'pointer',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease'
  })
};

const TacticalReadout = ({ data }) => {
  const [mode, setMode] = useState('struct'); // 'struct' | 'bond'

  if (!data) return <div style={{color: '#555'}}>ESPERANDO INPUT...</div>;

  // Extracción segura de datos para evitar crashes si faltan axiomas
  const { dominantData, mixedColor, semanticColor, axioms } = data;
  
  const safeAxioms = axioms || { struct: "Cargando datos...", bond: "Cargando datos..." };
  const currentAxiom = safeAxioms[mode] || "Sin datos en este vector.";

  return (
    <div style={styles.container(mixedColor)}>
      <div style={styles.header}>
        <div style={styles.letterBox}>
          {dominantData?.name || 'N/A'} <span style={{opacity: 0.5}}>{data.dominant}</span>
        </div>
        <div style={styles.metaData}>
          <span>FREQ: DOMINANTE</span>
          <span style={styles.colorBadge(mixedColor)}>
            {semanticColor || 'Calculando...'}
          </span>
        </div>
      </div>

      <div style={styles.controls}>
        <button 
          style={styles.button(mode === 'struct')} 
          onClick={() => setMode('struct')}
        >
          ARQUITECTURA
        </button>
        <button 
          style={styles.button(mode === 'bond')} 
          onClick={() => setMode('bond')}
        >
          ALQUIMIA
        </button>
      </div>

      <div style={styles.axiomBox}>
        <div style={styles.axiomTitle}>
          /// PROTOCOLO: {mode === 'struct' ? 'MATERIALIZACIÓN' : 'COHERENCIA'}
        </div>
        <div style={styles.axiomText}>
          "{currentAxiom}"
        </div>
      </div>
    </div>
  );
};

export default TacticalReadout;