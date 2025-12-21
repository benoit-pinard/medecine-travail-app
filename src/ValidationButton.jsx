// src/ValidationButton.jsx
import React from 'react';
import './ValidationButton.css';

function ValidationButton({ onValidate, risksCount }) {
  return (
    <div className="validation-container">
      <div className="validation-summary">
        <svg className="validation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="validation-text">
          <h3>Validation du suivi médical</h3>
          <p>
            Vous êtes sur le point de valider l'analyse avec <strong>{risksCount} risque{risksCount > 1 ? 's' : ''}</strong> identifié{risksCount > 1 ? 's' : ''}.
          </p>
          <p className="validation-hint">
            Assurez-vous d'avoir vérifié tous les risques ci-dessus avant de valider.
          </p>
        </div>
      </div>
      
      <button 
        onClick={onValidate}
        className="validation-button"
      >
        <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Valider et générer le suivi
      </button>
    </div>
  );
}

export default ValidationButton;