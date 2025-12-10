import React from 'react';
import { KEYBOARD_LAYOUT, HEBREW_DATA } from '../data/constants';

const styles = {
  wrapper: {
    display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px auto', width: '100%', maxWidth: '850px',
    padding: '30px', 
    background: '#151515', 
    backgroundImage: `radial-gradient(circle at center, #222 0%, #000 100%)`,
    borderRadius: '16px', border: '1px solid #333', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.9)', 
    boxSizing: 'border-box', direction: 'rtl'
  },
  row: { display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' },
  
  // TECLA DINÁMICA
  key: (isActive, color) => {
    // Detectamos si el color es muy oscuro (como negro) para cambiar el brillo a blanco
    const isDark = color === 'rgb(0, 0, 0)' || color === 'rgb(10, 10, 10)' || color === 'rgb(50, 50, 50)';
    const glowColor = isDark ? 'rgba(255,255,255,0.6)' : color; // Brillo blanco para letras negras

    return {
      flex: '1 0 auto', minWidth: '45px', maxWidth: '70px', height: '65px',
      // Fondo de piedra oscura
      background: '#1a1a1a',
      borderTop: '1px solid #333', borderLeft: '1px solid #222', borderRight: '1px solid #111', borderBottom: '2px solid #000',
      borderRadius: '6px',
      color: isActive ? '#fff' : (isDark ? '#888' : color), // Si es negra, la pintamos gris claro en reposo
      fontSize: '2rem', cursor: 'pointer', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'serif',
      transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      
      // EFECTOS DE LUZ
      // 1. Text Shadow: Si es activa explota, si no, tiene un borde sutil para leerse
      textShadow: isActive 
        ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}`
        : (isDark ? '0 0 2px rgba(255,255,255,0.3)' : 'none'), 
        
      // 2. Box Shadow: La "Chispa" interior
      // Inset pequeño = luz contenida. Outset grande = luz liberada.
      boxShadow: isActive
        ? `0 0 20px ${glowColor}, inset 0 0 15px ${glowColor}` // Encendido total
        : `inset 0 0 10px ${color.replace('rgb', 'rgba').replace(')', ', 0.2)')}, 0 5px 10px rgba(0,0,0,0.5)`, // Chispa dormida
        
      transform: isActive ? 'translateY(2px)' : 'translateY(0)'
    };
  },
  tinyNum: { position: 'absolute', top: '3px', right: '5px', fontSize: '0.6rem', opacity: 0.3, fontFamily: 'monospace', color: '#666' },
  controlBtn: { background: '#222', border: '1px solid #333', color: '#666', padding: '0 25px', height: '50px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px' }
};

const HebrewKeyboard = ({ onKeyPress, getActiveColor }) => {
  const [hoverKey, setHoverKey] = React.useState(null);
  const [activeKey, setActiveKey] = React.useState(null);

  const handlePress = (char) => {
    setActiveKey(char);
    onKeyPress(char);
    setTimeout(() => setActiveKey(null), 150);
  };

  return (
    <div style={styles.wrapper}>
      {KEYBOARD_LAYOUT.map((rowStr, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {rowStr.split('').map((char) => {
            const data = HEBREW_DATA[char] || {};
            const color = getActiveColor(char);
            // La tecla se "prende" si se presiona O si el mouse pasa por encima
            const isActive = activeKey === char || hoverKey === char;
            
            return (
              <button
                key={char}
                style={styles.key(isActive, color)}
                onMouseDown={() => handlePress(char)}
                onMouseEnter={() => setHoverKey(char)}
                onMouseLeave={() => setHoverKey(null)}
              >
                <span style={styles.tinyNum}>{data.val}</span>
                {char}
              </button>
            );
          })}
        </div>
      ))}
      
      <div style={styles.row}>
        <button style={styles.controlBtn} onClick={() => onKeyPress(' ')}>ESPACIO</button>
        <button style={{...styles.controlBtn, color: '#a44', borderColor:'#522'}} onClick={() => onKeyPress('BACKSPACE')}>BORRAR</button>
      </div>
    </div>
  );
};

export default HebrewKeyboard;