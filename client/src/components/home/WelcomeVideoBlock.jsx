import React, { useState } from 'react';

const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID_HERE'; // Replace with your actual video ID

function WelcomeVideoBlock() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="welcome-video-block" style={{ background: '#80C4E9', color: '#4335A7', padding: '1.25rem 0', textAlign: 'center' }}>
      <div className="welcome-video-content" style={{ maxWidth: 700, margin: '0 auto', fontSize: '1.05rem', fontWeight: 500 }}>
        Welcome! See this <button
          className="welcome-video-link"
          style={{ color: '#4335A7', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => setShowModal(true)}
        >video</button> to learn how I built this project.
      </div>
      {showModal && (
        <div className="welcome-video-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(67,53,167,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#FFF6E9', borderRadius: 16, padding: 24, maxWidth: 800, width: '90%', boxShadow: '0 8px 32px rgba(67,53,167,0.18)' }}>
            <h3 style={{ color: '#4335A7', marginBottom: 16 }}>Project Technical Specs & Building Process</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 16 }}>
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
            <button
              style={{ background: '#4335A7', color: '#FFF6E9', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setShowModal(false)}
            >Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default WelcomeVideoBlock;
