import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../DatePicker.css';


function GeneralInfo({ formData, updateFormData, errors }) {
  // Parse the date string to Date object for DatePicker
  const selectedDate = formData.dob ? new Date(formData.dob) : null;

  const handleDateChange = (date) => {
    if (date) {
      // Format date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      updateFormData('dob', dateString);
      
      // Auto-calculate age
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      updateFormData('age', age.toString());
    } else {
      updateFormData('dob', '');
      updateFormData('age', '');
    }
  };

  return (
    <>
      <div className="section-title">
        <div className="section-icon">👤</div>
        <h2>General Information</h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Enter full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="text-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="required">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="text-error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label className="required">Father Name</label>
          <input
            type="text"
            value={formData.fatherName}
            onChange={(e) => updateFormData('fatherName', e.target.value)}
            placeholder="Enter father's name"
            className={errors.fatherName ? 'error' : ''}
          />
          {errors.fatherName && <span className="text-error">{errors.fatherName}</span>}
        </div>

        <div className="form-group">
          <label className="required">Mother Name</label>
          <input
            type="text"
            value={formData.motherName}
            onChange={(e) => updateFormData('motherName', e.target.value)}
            placeholder="Enter mother's name"
            className={errors.motherName ? 'error' : ''}
          />
          {errors.motherName && <span className="text-error">{errors.motherName}</span>}
        </div>

        <div className="form-group">
          <label className="required">Date of Birth</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date of birth"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            maxDate={new Date()}
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            className={errors.dob ? 'error custom-datepicker' : 'custom-datepicker'}
            calendarClassName="custom-calendar"
            wrapperClassName="datepicker-wrapper"
          />
          {errors.dob && <span className="text-error">{errors.dob}</span>}
        </div>

        <div className="form-group">
          <label className="required">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            placeholder="Auto-calculated or enter manually"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="text-error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label className="required">Blood Group</label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => updateFormData('bloodGroup', e.target.value)}
            className={errors.bloodGroup ? 'error' : ''}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && <span className="text-error">{errors.bloodGroup}</span>}
        </div>

        <div className="form-group">
          <label className="required">Marital Status</label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => updateFormData('maritalStatus', e.target.value)}
            className={errors.maritalStatus ? 'error' : ''}
          >
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          {errors.maritalStatus && <span className="text-error">{errors.maritalStatus}</span>}
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
