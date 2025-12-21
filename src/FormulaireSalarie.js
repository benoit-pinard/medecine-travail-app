import { useState } from 'react';
import './FormulaireSalarie.css';

function FormulaireSalarie({ onValidation }) {
  // State (état) : les données du formulaire
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('');

  // Note : Le bouton de validation a été déplacé en bas de page
  // après l'affichage des risques (suite à la sprint review)

  return (
    <div className="formulaire-container">
      <h2>Saisie des données du salarié</h2>
      <form>
        <div className="form-group">
          <label htmlFor="age">Âge :</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Entrez l'âge"
            min="18"
            max="70"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sexe">Sexe :</label>
          <select
            id="sexe"
            value={sexe}
            onChange={(e) => setSexe(e.target.value)}
          >
            <option value="">-- Sélectionner --</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default FormulaireSalarie;