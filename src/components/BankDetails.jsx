function BankDetails({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">🏦</div>
        <h2>Bank Details</h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">Bank Name</label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => updateFormData('bankName', e.target.value)}
            placeholder="Enter bank name"
            className={errors.bankName ? 'error' : ''}
          />
          {errors.bankName && <span className="text-error">{errors.bankName}</span>}
        </div>

        <div className="form-group">
          <label className="required">Account Holder Name</label>
          <input
            type="text"
            value={formData.accountHolderName}
            onChange={(e) => updateFormData('accountHolderName', e.target.value)}
            placeholder="As per bank records"
            className={errors.accountHolderName ? 'error' : ''}
          />
          {errors.accountHolderName && <span className="text-error">{errors.accountHolderName}</span>}
        </div>

        <div className="form-group">
          <label className="required">Account Number</label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => updateFormData('accountNumber', e.target.value)}
            placeholder="Enter account number"
            className={errors.accountNumber ? 'error' : ''}
          />
          {errors.accountNumber && <span className="text-error">{errors.accountNumber}</span>}
        </div>

        <div className="form-group">
          <label className="required">IFSC Code</label>
          <input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => updateFormData('ifscCode', e.target.value.toUpperCase())}
            placeholder="e.g., SBIN0001234"
            maxLength="11"
            className={errors.ifscCode ? 'error' : ''}
          />
          {errors.ifscCode && <span className="text-error">{errors.ifscCode}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Branch Name</label>
          <input
            type="text"
            value={formData.branchName}
            onChange={(e) => updateFormData('branchName', e.target.value)}
            placeholder="Enter branch name"
            className={errors.branchName ? 'error' : ''}
          />
          {errors.branchName && <span className="text-error">{errors.branchName}</span>}
        </div>
      </div>
    </>
  );
}

export default BankDetails;
