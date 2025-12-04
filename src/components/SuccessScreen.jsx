import * as XLSX from 'xlsx';

function SuccessScreen({ formData, onReset, onDownload }) {
  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const downloadExcel = () => {
    try {
      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const wsData = [];
      
      // Section definitions
      const sectionGroups = {
        'General Information': [
          'name', 'gender', 'fatherName', 'motherName', 'dob', 'age', 'bloodGroup', 'maritalStatus'
        ],
        'Contact Details': [
          'personalEmail', 'phoneNumber', 'emergencyContact', 'currentAddress', 'permanentAddress'
        ],
        'Government ID Details': [
          'aadharNumber', 'panNumber', 'passportNumber', 'drivingLicense'
        ],
        'Bank Details': [
          'bankName', 'accountHolderName', 'accountNumber', 'ifscCode', 'branchName'
        ],
        'Educational Qualification - 10th': [
          'tenth_qualification', 'tenth_schoolName', 'tenth_board', 'tenth_yearOfPassing', 'tenth_percentage'
        ],
        'Educational Qualification - 12th/Diploma': [
          'twelfth_qualification', 'twelfth_schoolName', 'twelfth_board', 'twelfth_yearOfPassing', 'twelfth_percentage'
        ],
        'Educational Qualification - UG': [
          'ug_collegeName', 'ug_degree', 'ug_department', 'ug_yearOfPassing', 'ug_percentage'
        ],
        'Educational Qualification - PG': [
          'pg_collegeName', 'pg_degree', 'pg_department', 'pg_yearOfPassing', 'pg_percentage'
        ],
        'Skills & Technical Details': [
          'technologyExpertise', 'programmingLanguages', 'tools', 'softSkills',
          'softTechnicalSkills', 'projectExperience', 'certificates', 'internshipCertificates'
        ],
        'Additional Information': [
          'knownLanguages', 'hobbies', 'linkedinUrl', 'githubUrl'
        ]
      };

      // Build worksheet data with sections - SHOW ALL FIELDS
      Object.entries(sectionGroups).forEach(([sectionName, fields]) => {
        // Add section header row
        wsData.push([sectionName, '']);
        
        // Add ALL fields under this section (even if empty)
        fields.forEach(field => {
          const value = formData[field] || ''; // Show empty string if no data
          wsData.push([formatLabel(field), value]);
        });
        
        // Add empty row after each section
        wsData.push(['', '']);
      });

      // Create worksheet from data
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Set column widths
      ws['!cols'] = [
        { wch: 40 }, // Field Name column
        { wch: 65 }  // Value column
      ];

      // Apply enhanced styling to all cells
      const range = XLSX.utils.decode_range(ws['!ref']);
      
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.s.c + 1; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) {
            // Create empty cell object for styling
            ws[cellAddress] = { t: 's', v: '' };
          }
          
          const cellValue = ws[cellAddress].v;
          
          // Check if this is a section header
          const isSectionHeader = Object.keys(sectionGroups).includes(cellValue);
          
          if (isSectionHeader) {
            // Section header styling - Purple/Indigo gradient look
            ws[cellAddress].s = {
              font: { 
                bold: true, 
                sz: 13, 
                color: { rgb: "FFFFFF" },
                name: "Calibri"
              },
              fill: { fgColor: { rgb: "4F46E5" } }, // Indigo-600
              alignment: { 
                horizontal: "left", 
                vertical: "center",
                indent: 1
              },
              border: {
                top: { style: "medium", color: { rgb: "312E81" } },
                bottom: { style: "medium", color: { rgb: "312E81" } },
                left: { style: "medium", color: { rgb: "312E81" } },
                right: { style: "medium", color: { rgb: "312E81" } }
              }
            };
          } else if (C === 0 && cellValue && cellValue !== '') {
            // Field name styling (left column) - Bold with colored background
            ws[cellAddress].s = {
              font: { 
                bold: true, 
                sz: 11,
                color: { rgb: "1F2937" }, // Dark gray text
                name: "Calibri"
              },
              fill: { fgColor: { rgb: "DBEAFE" } }, // Light blue background
              alignment: { 
                horizontal: "left", 
                vertical: "center",
                indent: 1
              },
              border: {
                top: { style: "thin", color: { rgb: "93C5FD" } },
                bottom: { style: "thin", color: { rgb: "93C5FD" } },
                left: { style: "thin", color: { rgb: "93C5FD" } },
                right: { style: "thin", color: { rgb: "93C5FD" } }
              }
            };
          } else if (C === 1) {
            // Value styling (right column)
            const isEmpty = !cellValue || cellValue === '';
            
            ws[cellAddress].s = {
              font: { 
                sz: 11,
                color: isEmpty ? { rgb: "9CA3AF" } : { rgb: "374151" }, // Gray if empty, dark if filled
                italic: isEmpty,
                name: "Calibri"
              },
              fill: { fgColor: { rgb: isEmpty ? "FEF3C7" : "FFFFFF" } }, // Light yellow if empty, white if filled
              alignment: { 
                horizontal: "left", 
                vertical: "center", 
                wrapText: true,
                indent: 1
              },
              border: {
                top: { style: "thin", color: { rgb: "E5E7EB" } },
                bottom: { style: "thin", color: { rgb: "E5E7EB" } },
                left: { style: "thin", color: { rgb: "E5E7EB" } },
                right: { style: "thin", color: { rgb: "E5E7EB" } }
              }
            };
            
            // If empty, show placeholder text
            if (isEmpty) {
              ws[cellAddress].v = '';
              ws[cellAddress].t = 's';
            }
          }
        }
      }

      // Set row heights
      ws['!rows'] = [];
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
        if (ws[cellAddress] && Object.keys(sectionGroups).includes(ws[cellAddress].v)) {
          ws['!rows'][R] = { hpt: 28 }; // Taller height for section headers
        } else {
          ws['!rows'][R] = { hpt: 22 }; // Regular height for data rows
        }
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Registration Data');

      // Generate filename
      const fileName = `RVS_Registration_${formData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Write file
      XLSX.writeFile(wb, fileName, {
        bookType: 'xlsx',
        type: 'binary'
      });
      
      console.log('Excel file downloaded successfully with enhanced styling');
    } catch (error) {
      console.error('Error downloading Excel file:', error);
      alert('Error downloading Excel file. Please try again.');
    }
  };

  const sections = {
    'General Information': [
      'name', 'gender', 'fatherName', 'motherName', 'dob', 'age', 'bloodGroup', 'maritalStatus'
    ],
    'Contact Details': [
      'personalEmail', 'phoneNumber', 'emergencyContact', 'currentAddress', 'permanentAddress'
    ],
    'Government ID Details': [
      'aadharNumber', 'panNumber', 'passportNumber', 'drivingLicense'
    ],
    'Bank Details': [
      'bankName', 'accountHolderName', 'accountNumber', 'ifscCode', 'branchName'
    ],
    'Educational Qualification - 10th': [
      'tenth_qualification', 'tenth_schoolName', 'tenth_board', 'tenth_yearOfPassing', 'tenth_percentage'
    ],
    'Educational Qualification - 12th/Diploma': [
      'twelfth_qualification', 'twelfth_schoolName', 'twelfth_board', 'twelfth_yearOfPassing', 'twelfth_percentage'
    ],
    'Educational Qualification - UG': [
      'ug_collegeName', 'ug_degree', 'ug_department', 'ug_yearOfPassing', 'ug_percentage'
    ],
    'Educational Qualification - PG': [
      'pg_collegeName', 'pg_degree', 'pg_department', 'pg_yearOfPassing', 'pg_percentage'
    ],
    'Skills & Technical Details': [
      'technologyExpertise', 'programmingLanguages', 'tools', 'softSkills',
      'softTechnicalSkills', 'projectExperience', 'certificates', 'internshipCertificates'
    ],
    'Additional Information': [
      'knownLanguages', 'hobbies', 'linkedinUrl', 'githubUrl'
    ]
  };

  return (
    <div className="app">
      <div className="container">
        <div className="form-container">
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2>Registration Successful! 🎉</h2>
            <p>
              Thank you for completing the RVS Team Member registration form.<br />
              Your information has been recorded successfully.
            </p>

            <div className="success-actions">
              <button className="btn btn-primary" onClick={downloadExcel}>
                📊 Download Excel
              </button>
              <button className="btn btn-primary" onClick={onDownload}>
                📥 Download JSON
              </button>
              <button className="btn btn-secondary" onClick={onReset}>
                📝 Submit Another Form
              </button>
            </div>

            <div className="data-display">
              <h3>📊 Submitted Information</h3>
              {Object.entries(sections).map(([sectionName, fields]) => (
                <div key={sectionName}>
                  <h4 style={{ 
                    color: 'var(--primary-light)', 
                    marginTop: 'var(--spacing-lg)',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: '1rem',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: 'var(--spacing-xs)'
                  }}>
                    {sectionName}
                  </h4>
                  {fields.map(field => {
                    const value = formData[field];
                    if (!value) return null;
                    return (
                      <div key={field} className="data-item">
                        <span className="data-label">{formatLabel(field)}:</span>
                        <span className="data-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;
