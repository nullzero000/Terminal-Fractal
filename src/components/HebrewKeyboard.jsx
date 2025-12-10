import React from 'react';
import { KEYBOARD_LAYOUT } from '../data/constants';

const HebrewKeyboard = ({ onAdd, onSpace, onBackspace, onClear }) => {
  return (
    <div className="keyboard-container">
      <h3 className="keyboard-title">MATRIZ DE ENTRADA</h3>
      
      <div className="keys-grid">
        {KEYBOARD_LAYOUT.map((row, i) => (
          <div key={i} className="key-row">
            {row.split('').map((char) => (
              <button 
                key={char} 
                onClick={() => onAdd(char)}
                className="hebrew-btn"
              >
                {char}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      <div className="controls-row">
        <button onClick={onSpace} className="control-btn space-btn">Espacio</button>
        <button onClick={onBackspace} className="control-btn delete-btn">⌫</button>
        <button onClick={onClear} className="control-btn clear-btn">Reset</button>
      </div>
    </div>
  );
};

export default HebrewKeyboard;