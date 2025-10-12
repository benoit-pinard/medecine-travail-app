import { useState } from 'react';
import './SelectionRisques.css';

function SelectionRisques({ onValidation }) {
  const [risques, setRisques] = useState({});

  const listeRisques = [
    { id: 'chimique', label: 'Chimique', famille: 'Exposition chimique' },
    { id: 'biologique', label: 'Biologique', famille: 'Exposition biologique' },
    { id: 'ergonomique', label: 'Ergonomique', famille: 'Risques ergonomiques' },
    { id: 'psychosocial', label: 'Psychosocial', famille: 'Risques psychosociaux' },
    { id: 'physique', label: 'Physique', famille: 'Risques physiques' },
  ];

  const handleRisqueChange = (risqueId, type) => {
    setRisques(prev => ({
      ...prev,
      [risqueId]: {
        ...prev[risqueId],
        [type]: !prev[risqueId]?.[type]
      }
    }));
  };

  const handleValidation = () => {
    onValidation(risques);
    alert('Risques enregistrés avec succès !');
  };

  return (
    <div className="selection-container">
      <h2>Sélection des risques professionnels</h2>
      <p>Cochez les risques auxquels le salarié est exposé</p>
      
      <div className="risques-list">
        {listeRisques.map(risque => (
          <div key={risque.id} className="risque-item">
            <label className="risque-label">
              <input
                type="checkbox"
                checked={risques[risque.id]?.actuel || false}
                onChange={() => handleRisqueChange(risque.id, 'actuel')}
              />
              <span>{risque.label} (actuel)</span>
            </label>
            <label className="risque-label">
              <input
                type="checkbox"
                checked={risques[risque.id]?.antérieur || false}
                onChange={() => handleRisqueChange(risque.id, 'antérieur')}
              />
              <span>{risque.label} (antérieur)</span>
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleValidation}>
        Valider les risques
      </button>
    </div>
  );
}

export default SelectionRisques;