import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './cvenhancer.css';

function CVEnhancer() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [model, setModel] = useState("o3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const modelOptions = [
    { value: "o3", label: t.cvEnhancer.aiModelOptions.o3 },
    { value: "4o", label: t.cvEnhancer.aiModelOptions["4o"] },
    { value: "gpt-5", label: t.cvEnhancer.aiModelOptions.gpt5 }
  ];

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle job description change
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  // Handle model change
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  // Handle Enhance CV button click
  const handleEnhanceCV = async () => {
    setError("");
    setResult(null);
    if (!file) {
      setError("Please upload your CV file.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDescription);
  formData.append("model", model);
      // You can add language if needed
      // formData.append("language", "en");

      const response = await fetch("/api/enhance-cv", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to enhance CV");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section id="cv-enhancer" className="cv-enhancer">
      <div className="cv-enhancer-main-layout">
        <div className="cv-enhancer-card">
          <h2 className="cv-enhancer-title">
            {t.cvEnhancer.title}
          </h2>
          {/* ...existing form code... */}
          <div className="cv-enhancer-form-group">
            <label className="cv-enhancer-label">
              {t.cvEnhancer.uploadLabel}
            </label>
            <div className="cv-enhancer-upload-wrapper">
              <label className="cv-enhancer-upload-area">
                <div className="cv-enhancer-upload-content">
                  <svg xmlns="http://www.w3.org/2000/svg" className="cv-enhancer-upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="cv-enhancer-upload-text">
                    {file ? file.name : t.cvEnhancer.uploadText}
                  </p>
                  <span className="cv-enhancer-upload-message" style={{fontSize: '0.9rem', color: '#2563eb', display: 'block'}}>
                    (Only PDF and .Doc files are accepted)
                  </span>
                </div>
                <input 
                  type="file" 
                  className="cv-enhancer-upload-input" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
            {/* Message moved inside upload box */}
          </div>

          <div className="cv-enhancer-form-group">
            <label htmlFor="ai-model" className="cv-enhancer-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t.cvEnhancer.aiModelLabel}
              <span
                style={{ position: 'relative', cursor: 'pointer' }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
                {showTooltip && (
                  <span style={{
                    background: 'rgba(128,128,128,0.85)',
                    color: '#fff',
                    textAlign: 'left',
                    borderRadius: '4px',
                    padding: '8px',
                    position: 'absolute',
                    zIndex: 10,
                    left: '20px',
                    top: '-10px',
                    width: '220px',
                    fontSize: '0.75rem',
                    boxShadow: 'none',
                    border: '1px solid #ccc'
                  }}>
                    {t.cvEnhancer.aiModelTooltip}
                  </span>
                )}
              </span>
            </label>
            <select
              id="ai-model"
              className="cv-enhancer-select"
              value={model}
              onChange={handleModelChange}
              style={{ marginTop: '0.5rem' }}
            >
              {modelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="cv-enhancer-form-group">
            <label htmlFor="job-description" className="cv-enhancer-label">
              {t.cvEnhancer.jobDescriptionLabel}
            </label>
            <textarea
              id="job-description"
              rows="6"
              className="cv-enhancer-textarea"
              placeholder={t.cvEnhancer.jobDescriptionPlaceholder}
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            ></textarea>
          </div>
          
          <div className="cv-enhancer-button-container">
            <button
              type="button"
              className="cv-enhancer-button"
              onClick={handleEnhanceCV}
              disabled={loading}
            >
              {loading ? "Enhancing..." : t.cvEnhancer.buttonText}
            </button>
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            {result && (
              <div style={{ marginTop: 16 }}>
                <h3>Enhanced CV Results</h3>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
        <div className="cv-enhancer-preview-box">
          <div className="cv-enhancer-preview-content">
            {/* Modern placeholder icon and message */}
            <svg className="cv-enhancer-preview-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" stroke="currentColor">
              <rect x="8" y="8" width="32" height="32" rx="6" fill="#e0e7ff" />
              <path d="M16 20h16M16 28h10" stroke="#4335A7" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 className="cv-enhancer-preview-title">Enhanced CV Preview</h3>
            <p className="cv-enhancer-preview-text">Your enhanced CV will appear here after processing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CVEnhancer;