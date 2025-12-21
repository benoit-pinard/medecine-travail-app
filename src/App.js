// src/App.js
import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import FormulaireSalarie from './FormulaireSalarie';
import JobSelector from './JobSelector';
import RiskDisplay from './RiskDisplay';
import ValidationButton from './ValidationButton';

/**
 * Composant principal de l'application
 * 
 * ARCHITECTURE ACTUELLE (Sprint 2 + Améliorations Sprint Review):
 * - Les données sont stockées localement dans src/data/
 * - Pas de communication avec un backend
 * - État géré avec useState au niveau de ce composant
 * - Google Analytics intégré pour tracking des utilisateurs (P8)
 * - Possibilité de décocher les risques (Sprint Review)
 * - Bouton de validation en bas de page (Sprint Review)
 * 
 * TODO Sprint 3: Architecture avec API + Dates de début/fin par métier
 * - Créer un serveur Node.js/Express (backend)
 * - Les composants appelleront l'API pour récupérer les données
 * - Ajouter gestion des dates de début/fin pour chaque métier exercé
 * - Structure prévue:
 *   - GET /api/jobs → liste des métiers
 *   - GET /api/risks?jobs=1,2,3 → risques pour métiers sélectionnés
 *   - POST /api/employee → sauvegarder données du salarié + risques validés
 */

function App() {
  // État partagé: IDs des métiers sélectionnés
  const [selectedJobIds, setSelectedJobIds] = useState([]);
  
  // État pour les risques sélectionnés (après décochage éventuel)
  const [selectedRiskIds, setSelectedRiskIds] = useState([]);

  // Initialisation de Google Analytics
  useEffect(() => {
    // Initialiser GA4 avec ton ID de mesure
    ReactGA.initialize('G-J37F7CYWE5');
    
    // Enregistrer la visite de la page d'accueil
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

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

  // Callback quand les risques sont cochés/décochés
  const handleRisksChange = (riskIds) => {
    setSelectedRiskIds(riskIds);
  };

  // Callback quand le médecin valide
  const handleValidation = () => {
    // TODO Sprint 3: Envoyer les données au backend
    console.log('Données validées:');
    console.log('- Métiers sélectionnés:', selectedJobIds);
    console.log('- Risques validés:', selectedRiskIds);
    
    // Tracker la validation dans GA
    ReactGA.event({
      category: 'User Action',
      action: 'Validation',
      label: `${selectedRiskIds.length} risks validated`,
      value: selectedRiskIds.length
    });
    
    alert(`Validation réussie !\n\n${selectedJobIds.length} métier(s) sélectionné(s)\n${selectedRiskIds.length} risque(s) validé(s)`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aide à la décision pour le suivi en santé au travail</h1>
        <p className="App-subtitle">Identification des risques professionnels</p>
      </header>

      <main className="App-main">
        {/* Étape 1 : Formulaire salarié (sans bouton valider) */}
        <section className="app-section">
          <FormulaireSalarie />
        </section>

        {/* Étape 2 : Sélection des métiers */}
        <section className="app-section">
          <JobSelector onJobsChange={handleJobsChange} />
        </section>

        {/* Étape 3 : Affichage des risques (avec possibilité de décocher) */}
        <section className="app-section">
          <RiskDisplay 
            selectedJobIds={selectedJobIds} 
            onRisksChange={handleRisksChange}
          />
        </section>

        {/* Étape 4 : Validation finale */}
        {selectedRiskIds.length > 0 && (
          <section className="app-section">
            <ValidationButton 
              onValidate={handleValidation}
              risksCount={selectedRiskIds.length}
            />
          </section>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 - Application de médecine du travail - Version P8</p>
      </footer>
    </div>
  );
}

export default App;