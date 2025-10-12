import { useState } from 'react';
import './App.css';
import FormulaireSalarie from './FormulaireSalarie';
import SelectionRisques from './SelectionRisques';

function App() {
  const [donneeSalarie, setDonneeSalarie] = useState(null);

  const handleValidation = (donnees) => {
    setDonneeSalarie(donnees);
    console.log('Données saisies :', donnees);
  };

  const handleRisquesValidation = (risques) => {
    console.log('Risques sélectionnés :', risques);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Application d'aide à la décision médicale</h1>
        <p>Bienvenue ! Cette application aide les médecins du travail à proposer un parcours de suivi adapté.</p>
      </header>

      <main className="App-main">
        <FormulaireSalarie onValidation={handleValidation} />
        <SelectionRisques onValidation={handleRisquesValidation} />

        {donneeSalarie && (
          <div className="resultat-container">
            <h3>Données enregistrées :</h3>
            <p><strong>Âge :</strong> {donneeSalarie.age}</p>
            <p><strong>Sexe :</strong> {donneeSalarie.sexe}</p>
            <p><strong>Poste :</strong> {donneeSalarie.poste}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;