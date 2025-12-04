function GovernmentID({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">🆔</div>
        <h2>Government ID Details</h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">Aadhar Number</label>
          <input
            type="text"
            value={formData.aadharNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 12) {
                updateFormData('aadharNumber', value);
              }
            }}
            placeholder="12-digit Aadhar number"
            maxLength="12"
            className={errors.aadharNumber ? 'error' : ''}
          />
          {errors.aadharNumber && <span className="text-error">{errors.aadharNumber}</span>}
        </div>

        <div className="form-group">
          <label className="required">PAN Number</label>
          <input
            type="text"
            value={formData.panNumber}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (value.length <= 10) {
                updateFormData('panNumber', value);
              }
            }}
            placeholder="e.g., ABCDE1234F"
            maxLength="10"
            className={errors.panNumber ? 'error' : ''}
          />
          {errors.panNumber && <span className="text-error">{errors.panNumber}</span>}
        </div>

        <div className="form-group">
          <label>
            Passport Number 
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            value={formData.passportNumber}
            onChange={(e) => updateFormData('passportNumber', e.target.value.toUpperCase())}
            placeholder="Enter passport number"
          />
        </div>

        <div className="form-group">
          <label>
            Driving License Number 
            <span className="optional-badge">Optional</span>
          </label>
          <input
            type="text"
            value={formData.drivingLicense}
            onChange={(e) => updateFormData('drivingLicense', e.target.value.toUpperCase())}
            placeholder="Enter driving license number"
          />
        </div>
      </div>
    </>
  );
}

export default GovernmentID;
