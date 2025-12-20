// src/App.js
import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import FormulaireSalarie from './FormulaireSalarie';
import JobSelector from './JobSelector';
import RiskDisplay from './RiskDisplay';

/**
 * Composant principal de l'application
 * 
 * ARCHITECTURE ACTUELLE (Sprint 2):
 * - Les données sont stockées localement dans src/data/
 * - Pas de communication avec un backend
 * - État géré avec useState au niveau de ce composant
 * - Google Analytics intégré pour tracking des utilisateurs (P8)
 * 
 * TODO Sprint 3: Architecture avec API
 * - Créer un serveur Node.js/Express (backend)
 * - Les composants appelleront l'API pour récupérer les données
 * - Structure prévue:
 *   - GET /api/jobs → liste des métiers
 *   - GET /api/risks?jobs=1,2,3 → risques pour les métiers sélectionnés
 *   - POST /api/employee → sauvegarder les données du salarié
 */

function App() {
  // État partagé: IDs des métiers sélectionnés
  const [selectedJobIds, setSelectedJobIds] = useState([]);

  // Initialisation de Google Analytics
  useEffect(() => {
    // Initialiser GA4 avec ton ID de mesure
    ReactGA.initialize('G-J37F7CYWE5');
    
    // Enregistrer la visite de la page d'accueil
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  // TODO Sprint 3: Ajouter état pour les données du salarié
  // const [employeeData, setEmployeeData] = useState(null);

  // Callback quand les métiers sont sélectionnés
  const handleJobsChange = (jobIds) => {
    setSelectedJobIds(jobIds);
    
    // Tracker l'événement de sélection de métiers dans GA
    ReactGA.event({
      category: 'User Interaction',
      action: 'Selected Jobs',
      label: `${jobIds.length} job(s) selected`,
      value: jobIds.length
    });
  };

  // TODO Sprint 3: Callback pour sauvegarder les données du salarié
  // const handleEmployeeDataSave = async (data) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/employee', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //     });
  //     const result = await response.json();
  //     setEmployeeData(result);
  //   } catch (error) {
  //     console.error('Erreur:', error);
  //   }
  // };

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
          {/* TODO Sprint 3: Passer handleEmployeeDataSave en prop */}
          {/* <FormulaireSalarie onValidation={handleEmployeeDataSave} /> */}
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
        <p>© 2024 - Application de médecine du travail - Sprint 2 terminé</p>
        {/* TODO Sprint 3: Ajouter version API */}
      </footer>
    </div>
  );
}

export default App;