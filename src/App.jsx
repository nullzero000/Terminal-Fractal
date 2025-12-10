import { useState } from 'react';
import HebrewKeyboard from './components/HebrewKeyboard';
import ZoharMonitor from './components/ZoharMonitor';
import AnalysisTable from './components/AnalysisTable';
import { calculateMiluyLevels } from './utils/calculations';
import './App.css'; // Importación crítica de estilos

function App() {
  // Estado 1: El texto que se escribe
  const [inputText, setInputText] = useState("");
  // Estado 2: Los resultados del cálculo (se generan solo al procesar)
  const [analysisData, setAnalysisData] = useState(null);

  // --- MANEJADORES DE ENTRADA ---
  const handleAdd = (char) => {
    setInputText((prev) => prev + char);
    setAnalysisData(null); // Si cambias el texto, borramos la tabla vieja
  };

  const handleSpace = () => setInputText((prev) => prev + " ");
  
  const handleBackspace = () => {
    setInputText((prev) => prev.slice(0, -1));
    setAnalysisData(null);
  };

  const handleClear = () => {
    setInputText("");
    setAnalysisData(null);
  };

  // --- PROCESAMIENTO ---
  const handleProcess = () => {
    if (!inputText.trim()) return;
    // Llamamos al cerebro matemático
    const results = calculateMiluyLevels(inputText, 5);
    setAnalysisData(results);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>EJE-13 / SUPRAMENTE</h1>
        <p>Terminal Fractal (Miluy & Gematria)</p>
      </header>

      <main className="main-layout">
        
        {/* COLUMNA 1: VISUALIZACIÓN */}
        <section className="panel">
          <ZoharMonitor inputString={inputText} />
          
          {/* La tabla solo aparece si analysisData tiene datos */}
          {analysisData && (
            <AnalysisTable levels={analysisData} />
          )}
        </section>

        {/* COLUMNA 2: CONTROL */}
        <section className="panel">
          <HebrewKeyboard 
            onAdd={handleAdd} 
            onSpace={handleSpace} 
            onBackspace={handleBackspace} 
            onClear={handleClear}
          />
          
          <button onClick={handleProcess} className="process-btn">
            ⚡ PROCESAR ESTRUCTURA
          </button>
        </section>

      </main>
    </div>
  );
}

export default App;