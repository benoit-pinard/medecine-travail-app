import { useState } from 'react';
import './FormulaireSalarie.css';

function FormulaireSalarie({ onValidation }) {
  // State (état) : les données du formulaire
  const [age, setAge] = useState('');
  const [sexe, setSexe] = useState('');

  // Fonction pour gérer la validation du formulaire
  const handleValidation = () => {
    if (age && sexe) {
      // Appelle la fonction parent avec les données
      onValidation({ age, sexe });
      // Réinitialise le formulaire
      setAge('');
      setSexe('');
      alert('Données enregistrées avec succès !');
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

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

        <button type="button" onClick={handleValidation}>
          Valider
        </button>
      </form>
    </div>
  );
}

export default FormulaireSalarie;