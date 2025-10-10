# 🏥 Healthcare Management Dashboard

A modern, responsive healthcare management dashboard built with React and Tailwind CSS. This application provides real-time monitoring of patient vital signs with a clean, professional interface designed for healthcare professionals.

![Healthcare Dashboard](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🔍 **Real-time Vital Signs Monitoring**

- **Heart Rate (HR)** - Continuous cardiac monitoring with normal range alerts (60-100 bpm)
- **Blood Pressure (BP)** - Systolic/diastolic pressure tracking with hypertension alerts
- **Blood Oxygen Saturation (SpO₂)** - Critical oxygen level monitoring with alerts below 95%
- **ECG Status** - Heart rhythm monitoring with arrhythmia detection
- **Activity Level** - Daily step count and mobility tracking
- **Respiratory Rate (RR)** - Breathing pattern monitoring (12-24 bpm normal range)

### 📊 **Interactive Dashboard**

- **Patient Overview Table** - Comprehensive patient list with color-coded vital status
- **Real-time Charts** - Interactive trend visualization for each vital sign
- **Alert System** - Smart notifications for critical, high, and medium priority conditions
- **Patient Detail View** - In-depth individual patient monitoring with 24-hour trends

### 🎨 **Modern Design System**

- **Glass Morphism UI** - Contemporary frosted glass effects with backdrop blur
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional Healthcare Theme** - Medical-grade color coding and typography
- **Smooth Animations** - Subtle transitions and hover effects for enhanced UX

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5174
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
healthcare-management/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AlertBadge.jsx   # Risk level indicators
│   │   ├── Navbar.jsx       # Navigation header
│   │   ├── PatientTable.jsx # Patient data table
│   │   ├── VitalCard.jsx    # Vital sign summary cards
│   │   └── VitalChart.jsx   # Interactive charts
│   ├── data/
│   │   └── mockData.js      # Sample patient data
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.jsx    # Main dashboard view
│   │   ├── PatientDetail.jsx# Individual patient view
│   │   └── Alerts.jsx       # Alert management
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles & design system
│   └── App.css              # Component-specific styles
├── eslint.config.js         # Linting configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 Key Components

### 📋 **PatientTable**

- Displays all patients with real-time vital signs
- Color-coded status indicators (🟢 Normal, 🟡 Warning, 🔴 Critical)
- Interactive rows with hover effects
- Sortable columns and responsive layout

### 📊 **VitalCard**

- Individual vital sign summary cards
- Trend indicators with percentage changes
- Interactive click-to-view detailed charts
- Modern glass morphism design

### 📈 **VitalChart**

- 24-hour trend visualization using Chart.js
- Responsive chart design with proper scaling
- Color-coded thresholds for each vital type
- Smooth animations and transitions

### 🚨 **AlertBadge**

- Risk level indicators (Low, Medium, High, Critical)
- Gradient backgrounds with proper contrast
- Animated effects for critical alerts
- Accessible color schemes

## 🎨 Design System

### **Color Palette**

- **Primary Blue**: `#3b82f6` - Main brand color for buttons and accents
- **Success Green**: `#10b981` - Normal vital signs and positive indicators
- **Warning Orange**: `#f59e0b` - Attention required, moderate risk
- **Danger Red**: `#ef4444` - Critical alerts and high risk conditions
- **Neutral Gray**: `#64748b` - Text and subtle UI elements

### **Typography**

- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Responsive Scaling**: Clamp-based fluid typography
- **Letter Spacing**: Optimized for medical readability

### **Component Design**

- **Border Radius**: 16px-24px for modern rounded corners
- **Shadows**: Layered shadow system for depth perception
- **Spacing**: 8px grid system with consistent padding/margins
- **Transitions**: 0.3s cubic-bezier easing for smooth interactions

## 🔧 Configuration

### **Tailwind CSS Setup**

The project uses a custom Tailwind configuration with healthcare-specific colors:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          /* Custom blue palette */
        },
        success: {
          /* Custom green palette */
        },
        warning: {
          /* Custom orange palette */
        },
        danger: {
          /* Custom red palette */
        },
      },
    },
  },
};
```

### **Mock Data Structure**

Each patient object contains:

```javascript
{
  id: 1,
  name: "John Smith",
  heartRate: 72,           // bpm
  bloodPressure: "120/80", // mmHg
  spO2: 98,               // percentage
  ecg: "Normal Sinus Rhythm",
  activityLevel: 8500,     // daily steps
  respiratoryRate: 16,     // bpm
  riskLevel: "Low"         // Low, Medium, High
}
```

## 🚨 Alert System

### **Risk Levels**

- **🟢 Low**: All vitals within normal ranges
- **🟡 Medium**: One or more vitals approaching threshold
- **🔴 High**: Critical vital signs requiring immediate attention

### **Alert Conditions**

- **Tachycardia**: Heart rate > 100 bpm
- **Hypertension**: Systolic BP > 140 mmHg
- **Hypoxemia**: SpO₂ < 95%
- **Arrhythmia**: Irregular ECG patterns
- **Tachypnea**: Respiratory rate > 24 bpm
- **Low Activity**: Daily steps < 2000

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### **Grid System**

- Fluid grid layouts with CSS Grid and Flexbox
- Auto-fitting columns based on screen size
- Minimum card width: 280px
- Maximum container width: 1280px

## 🔒 Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 AA compliant contrast ratios
- **Focus Indicators**: Clear focus states for all interactive elements
- **Semantic HTML**: Proper heading structure and landmarks

## 🛠️ Development

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Code Style**

- ESLint configuration for React and modern JavaScript
- Consistent component structure with hooks
- CSS-in-JS approach with Tailwind utilities
- Modern ES6+ features and best practices

## 🚀 Deployment

### **Build Optimization**

- Vite-powered build process for fast compilation
- Tree-shaking for minimal bundle size
- CSS optimization and purging
- Asset optimization and compression

### **Environment Setup**

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure routing for SPA (Single Page Application)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Chart.js** - For beautiful and responsive charts
- **Vite** - For lightning-fast development experience
- **Inter Font** - For professional typography

## 📞 Support

For support and questions:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/healthcare-management/issues)
- 📖 Documentation: [Project Wiki](https://github.com/your-username/healthcare-management/wiki)

---

**Built with ❤️ for healthcare professionals**

_Empowering better patient care through modern technology_
