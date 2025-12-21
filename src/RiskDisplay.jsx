// src/RiskDisplay.jsx
import React, { useState, useEffect } from 'react';
import risks from './data/risksData';
import './RiskDisplay.css';

function RiskDisplay({ selectedJobIds, onRisksChange }) {
  const [filteredRisks, setFilteredRisks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [checkedRisks, setCheckedRisks] = useState({});

  // Filtrer les risques en fonction des métiers sélectionnés
  useEffect(() => {
    if (!selectedJobIds || selectedJobIds.length === 0) {
      setFilteredRisks([]);
      setCheckedRisks({});
      if (onRisksChange) onRisksChange([]);
      return;
    }

    const matchingRisks = risks.filter(risk => 
      risk.jobIds.some(jobId => selectedJobIds.includes(jobId))
    );

    setFilteredRisks(matchingRisks);

    // Par défaut, tous les risques sont cochés
    const initialChecked = {};
    matchingRisks.forEach(risk => {
      initialChecked[risk.id] = true;
    });
    setCheckedRisks(initialChecked);

    // Notifier le parent avec tous les IDs cochés par défaut
    if (onRisksChange) {
      onRisksChange(matchingRisks.map(r => r.id));
    }

    // Par défaut, toutes les catégories sont dépliées
    const categories = [...new Set(matchingRisks.map(r => r.category))];
    const initialExpanded = {};
    categories.forEach(cat => {
      initialExpanded[cat] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [selectedJobIds]);

  // Gérer le cochage/décochage d'un risque
  const handleRiskToggle = (riskId) => {
    const newCheckedRisks = {
      ...checkedRisks,
      [riskId]: !checkedRisks[riskId]
    };
    setCheckedRisks(newCheckedRisks);

    // Notifier le parent avec la liste des IDs cochés
    const checkedIds = Object.keys(newCheckedRisks)
      .filter(id => newCheckedRisks[id])
      .map(id => parseInt(id));
    
    if (onRisksChange) {
      onRisksChange(checkedIds);
    }
  };

  // Filtrer par recherche
  const displayedRisks = filteredRisks.filter(risk =>
    risk.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Grouper par catégorie
  const risksByCategory = {};
  displayedRisks.forEach(risk => {
    const category = risk.category || 'Non classé';
    if (!risksByCategory[category]) {
      risksByCategory[category] = [];
    }
    risksByCategory[category].push(risk);
  });

  // Toggle catégorie
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Si aucun métier sélectionné
  if (!selectedJobIds || selectedJobIds.length === 0) {
    return (
      <div className="risk-display empty">
        <div className="empty-state">
          <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3>Aucun risque à afficher</h3>
          <p>Veuillez d'abord sélectionner au moins un métier</p>
        </div>
      </div>
    );
  }

  const checkedCount = Object.values(checkedRisks).filter(Boolean).length;

  return (
    <div className="risk-display">
      <div className="risk-header">
        <h2>Risques professionnels identifiés</h2>
        <div className="risk-count">
          <span className="count-badge">{checkedCount}</span>
          <span className="count-text">risque{checkedCount > 1 ? 's' : ''} sélectionné{checkedCount > 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="risk-instruction">
        <p>💡 <strong>Décochez</strong> les risques que vous souhaitez écarter de l'analyse</p>
      </div>

      {/* Barre de recherche */}
      <div className="search-bar">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher un risque..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => setSearchTerm('')}
            aria-label="Effacer la recherche"
          >
            ×
          </button>
        )}
      </div>

      {/* Liste des risques par catégorie */}
      <div className="risks-container">
        {Object.keys(risksByCategory).length === 0 ? (
          <div className="no-results">
            <p>Aucun risque trouvé pour "{searchTerm}"</p>
          </div>
        ) : (
          Object.entries(risksByCategory)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([category, categoryRisks]) => (
            <div key={category} className="risk-category">
              <div 
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <h3>{category}</h3>
                <div className="category-meta">
                  <span className="category-count">{categoryRisks.length}</span>
                  <svg 
                    className={`collapse-icon ${expandedCategories[category] ? 'expanded' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedCategories[category] && (
                <ul className="risk-list">
                  {categoryRisks.map(risk => (
                    <li key={risk.id} className={`risk-item ${checkedRisks[risk.id] ? 'checked' : 'unchecked'}`}>
                      <div className="risk-content">
                        <label className="risk-checkbox-label">
                          <input
                            type="checkbox"
                            checked={checkedRisks[risk.id] || false}
                            onChange={() => handleRiskToggle(risk.id)}
                            className="risk-checkbox"
                          />
                          <span className={`risk-label ${!checkedRisks[risk.id] ? 'strikethrough' : ''}`}>
                            {risk.label}
                          </span>
                        </label>
                        <span className="risk-jobs-count">
                          {risk.jobIds.filter(id => selectedJobIds.includes(id)).length} métier{risk.jobIds.filter(id => selectedJobIds.includes(id)).length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RiskDisplay;