// src/components/CVForm/CVForm.jsx
import React, { useState } from 'react';
import styles from './CVForm.module.css'; // CSS Module for styling

const CVForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [message, setMessage] = useState(''); // For status messages

  // Update message when file is loaded
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('PDF loaded successfully.');
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a CV file.');
      return;
    }

    const formData = new FormData();
    formData.append('cv_file', selectedFile);
    formData.append('job_description', jobDescription);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload-cv', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to process CV');
      }
      const result = await response.json();

      // Display messages based on the response from the backend.
      setMessage(
        `PDF loaded successfully. Tokenized successfully. Token count: ${result.token_count}`
      );
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while processing your CV.');
    }
  };

  return (
    <div className={styles.cvFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Upload your CV</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.inputFile}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Job Description</label>
          <textarea
            value={jobDescription}
            onChange={handleDescriptionChange}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Improve CV
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CVForm;
