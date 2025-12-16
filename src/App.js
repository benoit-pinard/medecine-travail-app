// src/App.js
import React, { useState } from 'react';
import './App.css';
import FormulaireSalarie from './FormulaireSalarie';
import JobSelector from './JobSelector';
import RiskDisplay from './RiskDisplay';

function App() {
  const [selectedJobIds, setSelectedJobIds] = useState([]);

  // Callback quand les métiers sont sélectionnés
  const handleJobsChange = (jobIds) => {
    setSelectedJobIds(jobIds);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Médecine du Travail - Aide à la décision</h1>
        <p className="App-subtitle">Identification des risques professionnels</p>
      </header>

      <main className="App-main">
        {/* Étape 1 : Formulaire salarié (existant) */}
        <section className="app-section">
          <FormulaireSalarie />
        </section>

        {/* Étape 2 : Sélection des métiers */}
        <section className="app-section">
          <JobSelector onJobsChange={handleJobsChange} />
        </section>

        {/* Étape 3 : Affichage des risques */}
        <section className="app-section">
          <RiskDisplay selectedJobIds={selectedJobIds} />
        </section>
      </main>

      <footer className="App-footer">
        <p>© 2024 - Application de médecine du travail - Sprint 2</p>
      </footer>
    </div>
  );
}

export default App;