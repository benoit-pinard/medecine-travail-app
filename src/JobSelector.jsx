// src/JobSelector.jsx
import React, { useState } from 'react';
import jobs from './data/jobsData';
import './JobSelector.css';

function JobSelector({ onJobsChange }) {
  const [currentJob, setCurrentJob] = useState('');
  const [previousJobs, setPreviousJobs] = useState([]);

  // Gérer la sélection du métier actuel
  const handleCurrentJobChange = (e) => {
    const jobId = parseInt(e.target.value);
    setCurrentJob(jobId);
    
    // Mettre à jour la liste complète des métiers sélectionnés
    updateSelectedJobs(jobId, previousJobs);
  };

  // Gérer la sélection/désélection des métiers antérieurs
  const handlePreviousJobToggle = (jobId) => {
    let updatedPreviousJobs;
    
    if (previousJobs.includes(jobId)) {
      // Désélectionner
      updatedPreviousJobs = previousJobs.filter(id => id !== jobId);
    } else {
      // Sélectionner
      updatedPreviousJobs = [...previousJobs, jobId];
    }
    
    setPreviousJobs(updatedPreviousJobs);
    updateSelectedJobs(currentJob, updatedPreviousJobs);
  };

  // Mettre à jour la liste complète et notifier le parent
  const updateSelectedJobs = (current, previous) => {
    const allSelectedJobs = [];
    
    if (current) {
      allSelectedJobs.push(current);
    }
    
    // Ajouter les métiers antérieurs (sauf s'ils sont déjà dans current)
    previous.forEach(jobId => {
      if (jobId !== current) {
        allSelectedJobs.push(jobId);
      }
    });
    
    // Notifier le composant parent
    if (onJobsChange) {
      onJobsChange(allSelectedJobs);
    }
  };

  return (
    <div className="job-selector">
      <h2>Sélection des métiers</h2>
      
      {/* Métier actuel */}
      <div className="current-job-section">
        <label htmlFor="current-job">
          <span className="label-required">Métier actuel du salarié *</span>
        </label>
        <select
          id="current-job"
          value={currentJob}
          onChange={handleCurrentJobChange}
          className="job-select"
        >
          <option value="">-- Sélectionnez un métier --</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
        {currentJob && (
          <p className="job-description">
            {jobs.find(j => j.id === currentJob)?.description}
          </p>
        )}
      </div>

      {/* Métiers antérieurs */}
      <div className="previous-jobs-section">
        <label>
          <span className="label-optional">Métiers exercés antérieurement (optionnel)</span>
        </label>
        <p className="helper-text">
          Cochez les métiers que le salarié a exercés dans le passé
        </p>
        
        <div className="jobs-grid">
          {jobs.map(job => (
            <div
              key={job.id}
              className={`job-checkbox-item ${
                job.id === currentJob ? 'disabled' : ''
              } ${previousJobs.includes(job.id) ? 'selected' : ''}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={previousJobs.includes(job.id)}
                  onChange={() => handlePreviousJobToggle(job.id)}
                  disabled={job.id === currentJob}
                />
                <span className="job-name">{job.name}</span>
                <span className="job-category">{job.category}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Résumé de la sélection */}
      {(currentJob || previousJobs.length > 0) && (
        <div className="selection-summary">
          <h3>Métiers sélectionnés :</h3>
          <ul>
            {currentJob && (
              <li className="current">
                <strong>{jobs.find(j => j.id === currentJob)?.name}</strong> (actuel)
              </li>
            )}
            {previousJobs.map(jobId => (
              jobId !== currentJob && (
                <li key={jobId}>
                  {jobs.find(j => j.id === jobId)?.name} (antérieur)
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobSelector;