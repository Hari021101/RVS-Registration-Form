# 🎯 RVS Team Member Registration Form

## Overview

A beautiful, modern, multi-step registration form for collecting comprehensive team member data. Built with React, Vite, and modern CSS design principles.

## ✨ Features

### 🎨 Modern UI/UX

- **Stunning Design**: Vibrant color palette with dark mode aesthetics
- **Glassmorphism Effects**: Modern, premium feel with gradient accents
- **Smooth Animations**: Fade-in, slide-in, and pulse effects throughout
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices

### 📋 Multi-Step Form

The form is divided into 7 logical steps with a visual progress indicator:

1. **General Information** 👤

   - Name, Gender, Father/Mother Name
   - Date of Birth (with auto-calculated age)
   - Blood Group, Marital Status

2. **Contact Details** 📧

   - Personal Email (validated)
   - Phone Number (10-digit validation)
   - Emergency Contact (10-digit validation)
   - Current Address (optional) & Permanent Address

3. **Government ID Details** 🆔

   - Aadhar Number (12-digit validation) \*
   - PAN Number (format validation) \*
   - Passport Number (optional)
   - Driving License Number (optional)

4. **Bank Details** 🏦

   - Bank Name, Account Holder Name
   - Account Number
   - IFSC Code (format validation)
   - Branch Name

5. **Educational Qualification** 🎓

   - 10th Standard (optional)
   - 12th/Diploma (optional)
   - Under Graduate (required)
   - Post Graduate (optional)

6. **Skills & Technical Details** 💻

   - Technology Expertise
   - Programming Languages
   - Tools & Frameworks
   - Soft Skills
   - Project Experience
   - Certificates (optional)

7. **Additional Information** ℹ️
   - Known Languages
   - Hobbies (optional)
   - LinkedIn URL \*
   - GitHub URL (optional)

\*Required fields are marked with validation

### ✅ Smart Validation

- **Real-time validation** for all required fields
- **Format validation** for:
  - Email addresses
  - Phone numbers (10 digits)
  - Aadhar (12 digits)
  - PAN (ABCDE1234F format)
  - IFSC Code (SBIN0001234 format)
- **Auto-calculation** of age from Date of Birth
- **Error messages** displayed clearly below each field

### 🎯 User-Friendly Features

- **Progressive Navigation**: Click on any completed step to go back
- **Visual Progress Bar**: Shows current step and completed steps with checkmarks
- **Clear Field Labels**: Required fields marked with red asterisk (\*)
- **Optional Badges**: Optional fields clearly marked
- **Placeholder Text**: Helpful examples in every input field

### 📥 Data Export

- **Excel Download**: Export submitted data as a formatted Excel (.xlsx) file
- **JSON Download**: Export submitted data as a formatted JSON file
- **File Naming**: Automatically named with team member name and date
- **Complete Data**: All fields included in the export
- **Excel Format**: Two-column layout (Field Name | Value) for easy readability in spreadsheet applications

### 🎉 Success Screen

- **Confirmation Display**: Shows all submitted information organized by section
- **Review Data**: Scroll through all submitted information
- **Download Option**: One-click download of registration data
- **Submit Another**: Quick reset to register another team member

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

Already set up! The project is ready to use.

### Running the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
RegistrationForm/
├── src/
│   ├── components/
│   │   ├── GeneralInfo.jsx
│   │   ├── ContactDetails.jsx
│   │   ├── GovernmentID.jsx
│   │   ├── BankDetails.jsx
│   │   ├── EducationalQualification.jsx
│   │   ├── SkillsAndTechnical.jsx
│   │   ├── AdditionalInfo.jsx
│   │   └── SuccessScreen.jsx
│   ├── App.jsx (Main form logic)
│   ├── App.css (Component styles)
│   ├── index.css (Design system & global styles)
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🎨 Design System

### Color Palette

- **Primary**: Deep purple/blue gradient (HSL 250, 70%, 60%)
- **Secondary**: Vibrant cyan (HSL 200, 80%, 55%)
- **Accent**: Purple tones for highlights
- **Background**: Dark gradient (HSL 240, 20%, 8%)
- **Surface**: Elevated dark cards (HSL 240, 15%, 12%)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Gradient text effects
- **Body Text**: Clean, high-contrast for readability

### Animations

- **Page Load**: Fade-in effects
- **Step Changes**: Slide-in transitions
- **Button Hover**: Lift and glow effects
- **Progress**: Smooth width transitions

## 📋 Form Field Reference

### Required Fields by Section

**General Information:** ALL fields required
**Contact Details:** All except Current Address
**Government ID:** Aadhar & PAN only
**Bank Details:** ALL fields required
**Education:** Only UG (Undergraduate) details required
**Skills:** Technology, Programming Languages, Tools, Soft Skills, Project Experience
**Additional:** Known Languages, LinkedIn URL

## 💾 Data Format

The exported JSON file contains all form fields with the following structure:

```json
{
  "name": "John Doe",
  "gender": "Male",
  "dob": "1998-05-15",
  "age": "26"
  // ... all other fields
}
```

## 🔒 Privacy & Security Notes

- Data is only stored in browser memory (no backend)
- JSON export is local-only (no server upload)
- No third-party tracking or analytics
- User controls all data

## 🛠️ Customization

### Changing Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary-hue: 250; /* Change this for different primary color */
  --secondary-hue: 200; /* Change this for different secondary color */
}
```

### Adding New Fields

1. Add field to `formData` state in `App.jsx`
2. Add corresponding component/input in relevant section file
3. Add validation logic in `validateCurrentStep()` if required

### Modifying Validation

Edit the validation logic in `App.jsx` → `validateCurrentStep()` function

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (multi-column layout)
- **Tablet/Mobile**: ≤ 768px (single-column layout)

## 🎯 Key Features Summary

✅ 7-step progressive form with visual progress tracking
✅ Comprehensive validation for all data types
✅ Auto-calculated age from DOB
✅ Format validation for Aadhar, PAN, IFSC, Email, Phone
✅ Optional/Required field indicators
✅ Clean success screen with data review
✅ Excel export functionality (.xlsx format)
✅ JSON export functionality
✅ Fully responsive design
✅ Modern, premium UI with animations
✅ Dark mode aesthetics
✅ Error handling with helpful messages

## 🤝 Support

For any issues or questions about the registration form, please contact the RVS Team administrators.

---

**Built with ❤️ for the RVS Team**
