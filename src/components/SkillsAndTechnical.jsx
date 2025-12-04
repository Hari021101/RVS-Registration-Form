function SkillsAndTechnical({ formData, updateFormData, errors }) {
  return (
    <>
      <div className="section-title">
        <div className="section-icon">💻</div>
        <h2>Skills & Technical Details</h2>
      </div>

      <div className="form-grid">
        <div className="form-group form-grid-full">
          <label className="required">Technology Expertise</label>
          <textarea
            value={formData.technologyExpertise}
            onChange={(e) => updateFormData('technologyExpertise', e.target.value)}
            placeholder="e.g., Web Development, Cloud Computing, AI/ML"
            rows="2"
            className={errors.technologyExpertise ? 'error' : ''}
          />
          {errors.technologyExpertise && <span className="text-error">{errors.technologyExpertise}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Programming Languages Known</label>
          <textarea
            value={formData.programmingLanguages}
            onChange={(e) => updateFormData('programmingLanguages', e.target.value)}
            placeholder="e.g., Python, JavaScript, Java, C++"
            rows="2"
            className={errors.programmingLanguages ? 'error' : ''}
          />
          {errors.programmingLanguages && <span className="text-error">{errors.programmingLanguages}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Tools</label>
          <textarea
            value={formData.tools}
            onChange={(e) => updateFormData('tools', e.target.value)}
            placeholder="e.g., Git, Docker, VS Code, Postman"
            rows="2"
            className={errors.tools ? 'error' : ''}
          />
          {errors.tools && <span className="text-error">{errors.tools}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Soft Skills</label>
          <textarea
            value={formData.softSkills}
            onChange={(e) => updateFormData('softSkills', e.target.value)}
            placeholder="e.g., Communication, Teamwork, Problem Solving, Leadership"
            rows="2"
            className={errors.softSkills ? 'error' : ''}
          />
          {errors.softSkills && <span className="text-error">{errors.softSkills}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label>
            Soft Technical Skills 
            <span className="optional-badge">Optional</span>
          </label>
          <textarea
            value={formData.softTechnicalSkills}
            onChange={(e) => updateFormData('softTechnicalSkills', e.target.value)}
            placeholder="e.g., Agile, Scrum, CI/CD practices"
            rows="2"
          />
        </div>

        <div className="form-group form-grid-full">
          <label className="required">Project Experience</label>
          <textarea
            value={formData.projectExperience}
            onChange={(e) => updateFormData('projectExperience', e.target.value)}
            placeholder="Brief description of major projects you've worked on"
            rows="3"
            className={errors.projectExperience ? 'error' : ''}
          />
          {errors.projectExperience && <span className="text-error">{errors.projectExperience}</span>}
        </div>

        <div className="form-group form-grid-full">
          <label>
            Certificates 
            <span className="optional-badge">Optional</span>
          </label>
          <textarea
            value={formData.certificates}
            onChange={(e) => updateFormData('certificates', e.target.value)}
            placeholder="List any professional certificates (e.g., AWS Certified, Google Cloud)"
            rows="2"
          />
        </div>

        <div className="form-group form-grid-full">
          <label>
            Internship Certificates 
            <span className="optional-badge">Optional</span>
          </label>
          <textarea
            value={formData.internshipCertificates}
            onChange={(e) => updateFormData('internshipCertificates', e.target.value)}
            placeholder="List internship certificates with company names"
            rows="2"
          />
        </div>
      </div>
    </>
  );
}

export default SkillsAndTechnical;
