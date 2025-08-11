import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './cvenhancer.css';

function CVEnhancer() {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

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
      <div className="cv-enhancer-container">
        <div className="cv-enhancer-card">
          <h2 className="cv-enhancer-title">
            {t.cvEnhancer.title}
          </h2>
          
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
                </div>
                <input 
                  type="file" 
                  className="cv-enhancer-upload-input" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
            </div>
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
      </div>
    </section>
  );
}

export default CVEnhancer;