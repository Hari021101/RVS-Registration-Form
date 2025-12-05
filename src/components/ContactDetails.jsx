function ContactDetails({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">📧</div>
        <h2>Contact Details</h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">Personal Email ID</label>
          <input
            type="email"
            value={formData.personalEmail}
            onChange={(e) => updateFormData('personalEmail', e.target.value)}
            placeholder="your.email@example.com"
            className={errors.personalEmail ? 'error' : ''}
            autoComplete="email"
          />
          {errors.personalEmail && <span className="text-error">{errors.personalEmail}</span>}
        </div>

        <div className="form-group">
          <label className="required">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData('phoneNumber', e.target.value)}
            placeholder="10-digit mobile number"
            maxLength="10"
            className={errors.phoneNumber ? 'error' : ''}
            autoComplete="tel"
          />
          {errors.phoneNumber && <span className="text-error">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label className="required">Emergency Contact Number</label>
          <input
            type="tel"
            value={formData.emergencyContact}
            onChange={(e) => updateFormData('emergencyContact', e.target.value)}
            placeholder="10-digit emergency contact"
            maxLength="10"
            className={errors.emergencyContact ? 'error' : ''}
            autoComplete="tel-national"
          />
          {errors.emergencyContact && <span className="text-error">{errors.emergencyContact}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label>
            Current Address 
            <span className="optional-badge">Optional</span>
          </label>
          <textarea
            value={formData.currentAddress}
            onChange={(e) => updateFormData('currentAddress', e.target.value)}
            placeholder="Enter your current address"
            rows="3"
            autoComplete="street-address"
          />
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Permanent Address</label>
          <textarea
            value={formData.permanentAddress}
            onChange={(e) => updateFormData('permanentAddress', e.target.value)}
            placeholder="Enter your permanent address"
            rows="3"
            className={errors.permanentAddress ? 'error' : ''}
            autoComplete="street-address"
          />
          {errors.permanentAddress && <span className="text-error">{errors.permanentAddress}</span>}
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
