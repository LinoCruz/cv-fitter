import React, { useState } from 'react';
import styles from './CVForm.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CVEnhancer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [improvedCV, setImprovedCV] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Update job description state
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  // Function to download the improved CV as PDF
  const handleDownloadPDF = () => {
    const input = document.getElementById('cv-output');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('improved_cv.pdf');
    });
  };

  // Handle form submission to enhance CV
  const handleEnhanceCV = async (e) => {
    e.preventDefault();

    if (!selectedFile || !jobDescription) {
      alert("Please upload a CV and provide a job description.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Enhancing your CV, please wait...");

    try {
      // First, call /upload-cv to extract and tokenize the CV text
      const formData = new FormData();
      formData.append('cv_file', selectedFile);

      const uploadResponse = await fetch('http://127.0.0.1:5000/upload-cv', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error("Error uploading CV file.");
      }

      const uploadData = await uploadResponse.json();
      // Use the full extracted text (or a larger portion) if needed.
      const cvText = uploadData.extracted_text_preview;

      // Now, call /improve-cv with the CV text and job description
      const improveResponse = await fetch('http://127.0.0.1:5000/improve-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cv_text: cvText,
          job_description: jobDescription
        })
      });

      if (!improveResponse.ok) {
        throw new Error("Error enhancing CV.");
      }

      const improveData = await improveResponse.json();
      setImprovedCV(improveData.improved_cv);
    } catch (error) {
      console.error("Enhancement error: ", error);
      alert("An error occurred while enhancing your CV.");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h2>Input Data</h2>
        <form onSubmit={handleEnhanceCV}>
          <div className={styles.formGroup}>
            <label>Upload your CV (PDF):</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Job Description:</label>
            <textarea 
              value={jobDescription} 
              onChange={handleJobDescriptionChange} 
              placeholder="Enter job description here..."
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Enhance CV
          </button>
        </form>
      </div>
      <div className={styles.rightSide}>
        <h2>Improved CV</h2>
        {improvedCV ? (
          <div id="cv-output" className={styles.cvOutput} dangerouslySetInnerHTML={{ __html: improvedCV }} />
        ) : (
          <p>Your improved CV will appear here after processing.</p>
        )}
        {improvedCV && (
          <button onClick={handleDownloadPDF} className={styles.downloadButton}>
            Download CV as PDF
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.loadingModal}>
          <div className={styles.loadingContent}>
            <p>{loadingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVEnhancer;
