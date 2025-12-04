function AdditionalInfo({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">ℹ️</div>
        <h2>Additional Information</h2>
      </div>

      <div className="form-grid">
        <div className="form-group form-grid-full">
          <label className="required">Known Languages</label>
          <input
            type="text"
            value={formData.knownLanguages}
            onChange={(e) => updateFormData('knownLanguages', e.target.value)}
            placeholder="e.g., English, Hindi, Tamil"
            className={errors.knownLanguages ? 'error' : ''}
          />
          {errors.knownLanguages && <span className="text-error">{errors.knownLanguages}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label>
            Hobbies 
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            value={formData.hobbies}
            onChange={(e) => updateFormData('hobbies', e.target.value)}
            placeholder="e.g., Reading, Photography, Sports"
          />
        </div>

        <div className="form-group form-grid-full">
          <label className="required">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => updateFormData('linkedinUrl', e.target.value)}
            placeholder="https://www.linkedin.com/in/your-profile"
            className={errors.linkedinUrl ? 'error' : ''}
          />
          {errors.linkedinUrl && <span className="text-error">{errors.linkedinUrl}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label>
            GitHub URL 
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => updateFormData('githubUrl', e.target.value)}
            placeholder="https://github.com/your-username"
          />
        </div>
      </div>

      <div style={{ 
        marginTop: 'var(--spacing-xl)', 
        padding: 'var(--spacing-lg)',
        background: 'var(--surface-light)',
        borderRadius: 'var(--radius-md)',
        border: '2px solid var(--primary-color)'
      }}>
        <p style={{ 
          color: 'var(--text-secondary)', 
          textAlign: 'center',
          fontSize: '0.95rem'
        }}>
          📋 Please review all information carefully before submitting. 
          You can navigate back to previous sections using the progress bar above.
        </p>
      </div>
    </>
  );
}

export default AdditionalInfo;
