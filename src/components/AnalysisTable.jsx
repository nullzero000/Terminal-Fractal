import React from 'react';

const AnalysisTable = ({ levels }) => {
  // Si no hay datos (null) o la lista está vacía, no mostramos nada
  if (!levels || levels.length === 0) return null;

  // Extraemos el último nivel para mostrar el resultado final
  const finalLevel = levels[levels.length - 1];

  return (
    <div className="analysis-container">
      <h3 className="analysis-title">DIAGNÓSTICO FRACTAL (CUANTITATIVO)</h3>
      
      <div className="table-wrapper">
        <table className="miluy-table">
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Letras</th>
              <th>Masa (Gematria)</th>
              <th>Esencia (Reducción)</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((lvl) => (
              <tr key={lvl.level}>
                <td className="level-cell">Nivel {lvl.level}</td>
                <td>{lvl.chars.length}</td>
                <td className="value-cell">{lvl.totalValue}</td>
                <td className="reduced-cell">{lvl.reducedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-box">
        <p>VIBRACIÓN DEL EJE: <span className="final-number">{finalLevel.reducedValue}</span></p>
      </div>
    </div>
  );
};

export default AnalysisTable;