import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./footer.css";

function Footer() {
  const { t } = useLanguage();
  const [modal, setModal] = useState(null);

  const handleOpenModal = (type) => setModal(type);
  const handleCloseModal = () => setModal(null);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              CV Fitter
            </a>
            <p className="footer-copyright">Made by Lino Cruz.</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} CV Fitter. {t.footer.rights}
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-description">
              {t.footer.description}
            </div>
            <div className="footer-buttons">
                <button type="button" className="footer-link" onClick={() => handleOpenModal('about')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 13 21.13V25"/></svg>
                  {t.footer.about}
                </button>
                <button type="button" className="footer-link" onClick={() => handleOpenModal('privacy')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  {t.footer.privacy}
                </button>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,55,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#f3f4f6', color: '#1e293b', borderRadius: '16px', boxShadow: '0 4px 32px rgba(0,0,0,0.18)', maxWidth: '90vw', width: '480px', padding: '2.5rem 2rem', fontSize: '1.08rem', fontWeight: 400, lineHeight: 1.6, position: 'relative' }}>
            <button onClick={handleCloseModal} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', color: '#64748b', cursor: 'pointer' }}>&times;</button>
            {modal === 'about' && (
              <>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: '#334155' }}>{t.footer.about}</h2>
                <div>{t.footer.aboutModal}</div>
              </>
            )}
            {modal === 'privacy' && (
              <>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', color: '#334155' }}>{t.footer.privacy}</h2>
                <div>{t.footer.privacyModal}</div>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
