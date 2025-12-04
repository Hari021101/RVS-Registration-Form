function EducationalQualification({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">🎓</div>
        <h2>Educational Qualification</h2>
      </div>

      {/* 10th Standard */}
      <div className="subsection">
        <h3 className="subsection-title">10th Standard - Required</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Educational Qualification</label>
            <input
              type="text"
              value={formData.tenth_qualification}
              onChange={(e) => updateFormData('tenth_qualification', e.target.value)}
              placeholder="e.g., SSLC, Matriculation"
            />
          </div>

          <div className="form-group">
            <label className="required">School Name</label>
            <input
              type="text"
              value={formData.tenth_schoolName}
              onChange={(e) => updateFormData('tenth_schoolName', e.target.value)}
              placeholder="Enter school name"
              className={errors.tenth_schoolName ? 'error' : ''}
            />
            {errors.tenth_schoolName && <span className="text-error">{errors.tenth_schoolName}</span>}
          </div>

          <div className="form-group">
            <label className="required">Board</label>
            <input
              type="text"
              value={formData.tenth_board}
              onChange={(e) => updateFormData('tenth_board', e.target.value)}
              placeholder="e.g., CBSE, State Board"
              className={errors.tenth_board ? 'error' : ''}
            />
            {errors.tenth_board && <span className="text-error">{errors.tenth_board}</span>}
          </div>

          <div className="form-group">
            <label className="required">Year of Passing</label>
            <input
              type="text"
              value={formData.tenth_yearOfPassing}
              onChange={(e) => updateFormData('tenth_yearOfPassing', e.target.value)}
              placeholder="e.g., 2015"
              maxLength="4"
              className={errors.tenth_yearOfPassing ? 'error' : ''}
            />
            {errors.tenth_yearOfPassing && <span className="text-error">{errors.tenth_yearOfPassing}</span>}
          </div>

          <div className="form-group">
            <label className="required">% / CGPA</label>
            <input
              type="text"
              value={formData.tenth_percentage}
              onChange={(e) => updateFormData('tenth_percentage', e.target.value)}
              placeholder="e.g., 85% or 8.5 CGPA"
              className={errors.tenth_percentage ? 'error' : ''}
            />
            {errors.tenth_percentage && <span className="text-error">{errors.tenth_percentage}</span>}
          </div>
        </div>
      </div>

      {/* 12th/Diploma */}
      <div className="subsection">
        <h3 className="subsection-title">12th / Diploma - Required</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Educational Qualification</label>
            <input
              type="text"
              value={formData.twelfth_qualification}
              onChange={(e) => updateFormData('twelfth_qualification', e.target.value)}
              placeholder="e.g., HSC, Diploma"
            />
          </div>

          <div className="form-group">
            <label className="required">School/College Name</label>
            <input
              type="text"
              value={formData.twelfth_schoolName}
              onChange={(e) => updateFormData('twelfth_schoolName', e.target.value)}
              placeholder="Enter institution name"
              className={errors.twelfth_schoolName ? 'error' : ''}
            />
            {errors.twelfth_schoolName && <span className="text-error">{errors.twelfth_schoolName}</span>}
          </div>

          <div className="form-group">
            <label className="required">Board</label>
            <input
              type="text"
              value={formData.twelfth_board}
              onChange={(e) => updateFormData('twelfth_board', e.target.value)}
              placeholder="e.g., CBSE, State Board"
              className={errors.twelfth_board ? 'error' : ''}
            />
            {errors.twelfth_board && <span className="text-error">{errors.twelfth_board}</span>}
          </div>

          <div className="form-group">
            <label className="required">Year of Passing</label>
            <input
              type="text"
              value={formData.twelfth_yearOfPassing}
              onChange={(e) => updateFormData('twelfth_yearOfPassing', e.target.value)}
              placeholder="e.g., 2017"
              maxLength="4"
              className={errors.twelfth_yearOfPassing ? 'error' : ''}
            />
            {errors.twelfth_yearOfPassing && <span className="text-error">{errors.twelfth_yearOfPassing}</span>}
          </div>

          <div className="form-group">
            <label className="required">% / CGPA</label>
            <input
              type="text"
              value={formData.twelfth_percentage}
              onChange={(e) => updateFormData('twelfth_percentage', e.target.value)}
              placeholder="e.g., 80% or 8.0 CGPA"
              className={errors.twelfth_percentage ? 'error' : ''}
            />
            {errors.twelfth_percentage && <span className="text-error">{errors.twelfth_percentage}</span>}
          </div>
        </div>
      </div>

      {/* UG - Required */}
      <div className="subsection">
        <h3 className="subsection-title">Under Graduate (UG) - Required</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="required">College Name</label>
            <input
              type="text"
              value={formData.ug_collegeName}
              onChange={(e) => updateFormData('ug_collegeName', e.target.value)}
              placeholder="Enter college name"
              className={errors.ug_collegeName ? 'error' : ''}
            />
            {errors.ug_collegeName && <span className="text-error">{errors.ug_collegeName}</span>}
          </div>

          <div className="form-group">
            <label className="required">Degree</label>
            <input
              type="text"
              value={formData.ug_degree}
              onChange={(e) => updateFormData('ug_degree', e.target.value)}
              placeholder="e.g., B.E., B.Tech, B.Sc"
              className={errors.ug_degree ? 'error' : ''}
            />
            {errors.ug_degree && <span className="text-error">{errors.ug_degree}</span>}
          </div>

          <div className="form-group">
            <label className="required">Department</label>
            <input
              type="text"
              value={formData.ug_department}
              onChange={(e) => updateFormData('ug_department', e.target.value)}
              placeholder="e.g., Computer Science"
              className={errors.ug_department ? 'error' : ''}
            />
            {errors.ug_department && <span className="text-error">{errors.ug_department}</span>}
          </div>

          <div className="form-group">
            <label className="required">Year of Passing</label>
            <input
              type="text"
              value={formData.ug_yearOfPassing}
              onChange={(e) => updateFormData('ug_yearOfPassing', e.target.value)}
              placeholder="e.g., 2021"
              maxLength="4"
              className={errors.ug_yearOfPassing ? 'error' : ''}
            />
            {errors.ug_yearOfPassing && <span className="text-error">{errors.ug_yearOfPassing}</span>}
          </div>

          <div className="form-group">
            <label className="required">% / CGPA</label>
            <input
              type="text"
              value={formData.ug_percentage}
              onChange={(e) => updateFormData('ug_percentage', e.target.value)}
              placeholder="e.g., 75% or 7.5 CGPA"
              className={errors.ug_percentage ? 'error' : ''}
            />
            {errors.ug_percentage && <span className="text-error">{errors.ug_percentage}</span>}
          </div>
        </div>
      </div>

      {/* PG - Optional */}
      <div className="subsection">
        <h3 className="subsection-title">
          Post Graduate (PG) 
          <span className="optional-badge" style={{ marginLeft: '10px' }}>Optional</span>
        </h3>
        <div className="form-grid">
          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              value={formData.pg_collegeName}
              onChange={(e) => updateFormData('pg_collegeName', e.target.value)}
              placeholder="Enter college name or N/A"
            />
          </div>

          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={formData.pg_degree}
              onChange={(e) => updateFormData('pg_degree', e.target.value)}
              placeholder="e.g., M.E., M.Tech, M.Sc or N/A"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={formData.pg_department}
              onChange={(e) => updateFormData('pg_department', e.target.value)}
              placeholder="e.g., Computer Science or N/A"
            />
          </div>

          <div className="form-group">
            <label>Year of Passing</label>
            <input
              type="text"
              value={formData.pg_yearOfPassing}
              onChange={(e) => updateFormData('pg_yearOfPassing', e.target.value)}
              placeholder="e.g., 2023 or N/A"
              maxLength="4"
            />
          </div>

          <div className="form-group">
            <label>% / CGPA</label>
            <input
              type="text"
              value={formData.pg_percentage}
              onChange={(e) => updateFormData('pg_percentage', e.target.value)}
              placeholder="e.g., 80% or 8.0 CGPA or N/A"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EducationalQualification;
