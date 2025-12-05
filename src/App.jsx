import { useState, useEffect } from 'react';
import './App.css';
import GeneralInfo from './components/GeneralInfo';
import ContactDetails from './components/ContactDetails';
import GovernmentID from './components/GovernmentID';
import BankDetails from './components/BankDetails';
import EducationalQualification from './components/EducationalQualification';
import SkillsAndTechnical from './components/SkillsAndTechnical';
import AdditionalInfo from './components/AdditionalInfo';
import SuccessScreen from './components/SuccessScreen';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';


const STEPS = [
  { id: 1, label: 'General', component: GeneralInfo },
  { id: 2, label: 'Contact', component: ContactDetails },
  { id: 3, label: 'Govt ID', component: GovernmentID },
  { id: 4, label: 'Bank', component: BankDetails },
  { id: 5, label: 'Education', component: EducationalQualification },
  { id: 6, label: 'Skills', component: SkillsAndTechnical },
  { id: 7, label: 'Additional', component: AdditionalInfo },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // General Information
    name: '',
    gender: '',
    fatherName: '',
    motherName: '',
    dob: '',
    age: '',
    bloodGroup: '',
    maritalStatus: '',
    
    // Contact Details
    personalEmail: '',
    phoneNumber: '',
    emergencyContact: '',
    currentAddress: '',
    permanentAddress: '',
    
    // Government ID
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    drivingLicense: '',
    
    // Bank Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    
    // Educational Qualification - 10th
    tenth_qualification: '',
    tenth_schoolName: '',
    tenth_board: '',
    tenth_yearOfPassing: '',
    tenth_percentage: '',
    
    // 12th/Diploma
    twelfth_qualification: '',
    twelfth_schoolName: '',
    twelfth_board: '',
    twelfth_yearOfPassing: '',
    twelfth_percentage: '',
    
    // UG
    ug_collegeName: '',
    ug_degree: '',
    ug_department: '',
    ug_yearOfPassing: '',
    ug_percentage: '',
    
    // PG
    pg_collegeName: '',
    pg_degree: '',
    pg_department: '',
    pg_yearOfPassing: '',
    pg_percentage: '',
    
    // Skills & Technical
    technologyExpertise: '',
    programmingLanguages: '',
    tools: '',
    softSkills: '',
    softTechnicalSkills: '',
    projectExperience: '',
    certificates: '',
    internshipCertificates: '',
    
    // Additional Info
    knownLanguages: '',
    hobbies: '',
    linkedinUrl: '',
    githubUrl: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCacheNotification, setShowCacheNotification] = useState(false);

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('rvs_registration_form_data');
    const savedStep = localStorage.getItem('rvs_registration_current_step');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setShowCacheNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => setShowCacheNotification(false), 5000);
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  const updateFormData = (field, value) => {
    console.log(`updateFormData called - field: ${field}, value:`, value);
    setFormData(prevFormData => {
      const newData = { ...prevFormData, [field]: value };
      console.table('New formData:', newData);
      // Save to localStorage
      localStorage.setItem('rvs_registration_form_data', JSON.stringify(newData));
      localStorage.setItem('rvs_registration_current_step', currentStep.toString());
      return newData;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Clear cached data
  const clearCachedData = () => {
    localStorage.removeItem('rvs_registration_form_data');
    localStorage.removeItem('rvs_registration_current_step');
    setShowCacheNotification(false);
    
    // Actually clear the form fields
    setCurrentStep(1);
    setFormData({
      name: '', gender: '', fatherName: '', motherName: '', dob: '', age: '',
      bloodGroup: '', maritalStatus: '', personalEmail: '', phoneNumber: '',
      emergencyContact: '', currentAddress: '', permanentAddress: '',
      aadharNumber: '', panNumber: '', passportNumber: '', drivingLicense: '',
      bankName: '', accountHolderName: '', accountNumber: '', ifscCode: '',
      branchName: '', tenth_qualification: '', tenth_schoolName: '', tenth_board: '',
      tenth_yearOfPassing: '', tenth_percentage: '', twelfth_qualification: '',
      twelfth_schoolName: '', twelfth_board: '', twelfth_yearOfPassing: '',
      twelfth_percentage: '', ug_collegeName: '', ug_degree: '', ug_department: '',
      ug_yearOfPassing: '', ug_percentage: '', pg_collegeName: '', pg_degree: '',
      pg_department: '', pg_yearOfPassing: '', pg_percentage: '',
      technologyExpertise: '', programmingLanguages: '', tools: '', softSkills: '',
      softTechnicalSkills: '', projectExperience: '', certificates: '',
      internshipCertificates: '', knownLanguages: '', hobbies: '', linkedinUrl: '',
      githubUrl: '',
    });
    setErrors({});
    
    alert('Cached form data cleared!');
  };


  const validateCurrentStep = () => {
    const newErrors = {};
    
    // Validation based on current step
    switch (currentStep) {
      case 1: // General Information
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.fatherName) newErrors.fatherName = 'Father Name is required';
        if (!formData.motherName) newErrors.motherName = 'Mother Name is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood Group is required';
        if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
        break;
        
      case 2: // Contact Details
        if (!formData.personalEmail) newErrors.personalEmail = 'Personal Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
          newErrors.personalEmail = 'Invalid email format';
        }
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        else if (!/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Phone Number must be 10 digits';
        }
        if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency Contact is required';
        else if (!/^\d{10}$/.test(formData.emergencyContact)) {
          newErrors.emergencyContact = 'Emergency Contact must be 10 digits';
        }
        if (!formData.permanentAddress) newErrors.permanentAddress = 'Permanent Address is required';
        break;
        
      case 3: // Government ID
        if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar Number is required';
        else if (!/^\d{12}$/.test(formData.aadharNumber)) {
          newErrors.aadharNumber = 'Aadhar Number must be 12 digits';
        }
        if (!formData.panNumber) newErrors.panNumber = 'PAN Number is required';
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
          newErrors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F)';
        }
        break;
        
      case 4: // Bank Details
        if (!formData.bankName) newErrors.bankName = 'Bank Name is required';
        if (!formData.accountHolderName) newErrors.accountHolderName = 'Account Holder Name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account Number is required';
        if (!formData.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
        else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
          newErrors.ifscCode = 'Invalid IFSC Code format';
        }
        if (!formData.branchName) newErrors.branchName = 'Branch Name is required';
        break;
        
      case 5: // Educational Qualification
        // 10th Standard - All fields required
        if (!formData.tenth_schoolName) newErrors.tenth_schoolName = '10th School Name is required';
        if (!formData.tenth_board) newErrors.tenth_board = '10th Board is required';
        if (!formData.tenth_yearOfPassing) newErrors.tenth_yearOfPassing = '10th Year of Passing is required';
        if (!formData.tenth_percentage) newErrors.tenth_percentage = '10th Percentage/CGPA is required';
        
        // 12th/Diploma - All fields required
        if (!formData.twelfth_schoolName) newErrors.twelfth_schoolName = '12th/Diploma School Name is required';
        if (!formData.twelfth_board) newErrors.twelfth_board = '12th/Diploma Board is required';
        if (!formData.twelfth_yearOfPassing) newErrors.twelfth_yearOfPassing = '12th/Diploma Year of Passing is required';
        if (!formData.twelfth_percentage) newErrors.twelfth_percentage = '12th/Diploma Percentage/CGPA is required';
        
        // UG - All fields required
        if (!formData.ug_collegeName) newErrors.ug_collegeName = 'UG College Name is required';
        if (!formData.ug_degree) newErrors.ug_degree = 'UG Degree is required';
        if (!formData.ug_department) newErrors.ug_department = 'UG Department is required';
        if (!formData.ug_yearOfPassing) newErrors.ug_yearOfPassing = 'UG Year of Passing is required';
        if (!formData.ug_percentage) newErrors.ug_percentage = 'UG Percentage/CGPA is required';
        break;
        
      case 6: // Skills & Technical
        if (!formData.technologyExpertise) newErrors.technologyExpertise = 'Technology Expertise is required';
        if (!formData.programmingLanguages) newErrors.programmingLanguages = 'Programming Languages are required';
        if (!formData.tools) newErrors.tools = 'Tools are required';
        if (!formData.softSkills) newErrors.softSkills = 'Soft Skills are required';
        if (!formData.projectExperience) newErrors.projectExperience = 'Project Experience is required';
        break;
        
      case 7: // Additional Info
        if (!formData.knownLanguages) newErrors.knownLanguages = 'Known Languages are required';
        if (!formData.linkedinUrl) newErrors.linkedinUrl = 'LinkedIn URL is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };


  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      try {
        // Save to Firebase
        const docRef = await addDoc(collection(db, 'registrations'), {
          ...formData,
          timestamp: serverTimestamp()
        });
        
        console.log('Document written with ID: ', docRef.id);
        
        setIsSubmitted(true);
        // Clear cached data after successful submission
        localStorage.removeItem('rvs_registration_form_data');
        localStorage.removeItem('rvs_registration_current_step');
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('Error submitting form. Data saved locally. Please try again or contact support.');
      }
    }
  };


  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      name: '', gender: '', fatherName: '', motherName: '', dob: '', age: '',
      bloodGroup: '', maritalStatus: '', personalEmail: '', phoneNumber: '',
      emergencyContact: '', currentAddress: '', permanentAddress: '',
      aadharNumber: '', panNumber: '', passportNumber: '', drivingLicense: '',
      bankName: '', accountHolderName: '', accountNumber: '', ifscCode: '',
      branchName: '', tenth_qualification: '', tenth_schoolName: '', tenth_board: '',
      tenth_yearOfPassing: '', tenth_percentage: '', twelfth_qualification: '',
      twelfth_schoolName: '', twelfth_board: '', twelfth_yearOfPassing: '',
      twelfth_percentage: '', ug_collegeName: '', ug_degree: '', ug_department: '',
      ug_yearOfPassing: '', ug_percentage: '', pg_collegeName: '', pg_degree: '',
      pg_department: '', pg_yearOfPassing: '', pg_percentage: '',
      technologyExpertise: '', programmingLanguages: '', tools: '', softSkills: '',
      softTechnicalSkills: '', projectExperience: '', certificates: '',
      internshipCertificates: '', knownLanguages: '', hobbies: '', linkedinUrl: '',
      githubUrl: '',
    });
    setErrors({});
    setIsSubmitted(false);
    // Clear cached data
    localStorage.removeItem('rvs_registration_form_data');
    localStorage.removeItem('rvs_registration_current_step');
  };


  const downloadData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RVS_Registration_${formData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isSubmitted) {
    return <SuccessScreen formData={formData} onReset={handleReset} onDownload={downloadData} />;
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="app">
      <div className="container">
      <header className="app-header">
          <h1>🎯 RVS Team Member Registration</h1>
          <p>Complete Data Collection Sheet</p>
        </header>

        {/* Cache Notification Banner */}
        {showCacheNotification && (
          <div className="cache-notification">
            <div className="cache-notification-content">
              <span className="cache-icon">💾</span>
              <div className="cache-text">
                <strong>Previous data found!</strong>
                <span>Your form data has been restored from the last session.</span>
              </div>
              <button className="btn-clear-cache" onClick={clearCachedData}>
                Clear Saved Data
              </button>
              <button 
                className="btn-close-notification" 
                onClick={() => setShowCacheNotification(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="form-container">
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-steps">
              <div className="progress-line">
                <div 
                  className="progress-line-fill" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`progress-step ${
                    currentStep === step.id ? 'active' : ''
                  } ${currentStep > step.id ? 'completed' : ''}`}
                  onClick={() => {
                    // Allow navigation to completed or current steps
                    if (step.id <= currentStep) {
                      setCurrentStep(step.id);
                    }
                  }}
                >
                  <div className="step-circle">
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Form Section */}
          <form autoComplete="on" onSubmit={(e) => e.preventDefault()}>
            <div className="form-section">
              <CurrentStepComponent 
                formData={formData}
                updateFormData={updateFormData}
                errors={errors}
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            
            {currentStep < STEPS.length ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
