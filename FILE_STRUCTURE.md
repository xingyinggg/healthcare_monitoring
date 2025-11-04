# Healthcare Monitoring - File Directory Structure & Descriptions

```
healthcare_monitoring/
├── 📂 .git/                           # Git version control repository
├── 📂 .vscode/                        # VS Code workspace settings
├── 📂 node_modules/                   # NPM dependencies (auto-generated)
├── 📂 dist/                           # Built production files (auto-generated)
├── 📂 public/                         # Static public assets
│   └── 🖼️  vite.svg                   # Vite logo icon
├── 📂 src/                            # Source code directory
│   ├── 📂 assets/                     # Static assets (images, fonts, etc.)
│   │   └── ⚛️  react.svg              # React logo icon
│   ├── 📂 components/                 # Reusable React components
│   │   ├── 🧩 AlertBadge.jsx          # Alert notification badge component
│   │   ├── 🧭 Navbar.jsx              # Main navigation bar component
│   │   ├── 📊 PatientTable.jsx        # Patient data table component
│   │   ├── 📈 VitalCard.jsx           # Individual vital signs card
│   │   └── 📉 VitalChart.jsx          # Charts for vital signs visualization
│   ├── 📂 config/                     # Configuration files
│   │   └── ⚙️  config.js              # Centralized app configuration (AWS, Metabase)
│   ├── 📂 data/                       # Data management
│   │   └── 🗃️  mockData.js            # Mock patient data for development
│   ├── 📂 pages/                      # React page components
│   │   ├── 🚨 Alerts.jsx              # Alerts management page
│   │   ├── 📊 Analytics.jsx           # Analytics dashboard with Metabase
│   │   ├── 🏠 Dashboard.jsx           # Main dashboard page
│   │   ├── 🔐 Login.jsx               # User authentication page
│   │   └── 👤 PatientDetail.jsx       # Individual patient details page
│   ├── 📂 services/                   # Business logic services
│   │   └── 🔗 metabaseService.js      # Metabase JWT integration service
│   ├── 📂 utils/                      # Utility functions
│   │   └── 🧪 metabaseTest.js         # Metabase integration testing utilities
│   ├── 🎨 App.css                     # Main application styles
│   ├── ⚛️  App.jsx                    # Root React component & routing
│   ├── ☁️  aws-config.js              # AWS config (DEPRECATED - use config/config.js)
│   ├── 🎨 index.css                   # Global CSS styles
│   └── 🚀 main.jsx                    # React application entry point
├── 🌐 index.html                      # HTML template file
├── 📦 package.json                    # NPM dependencies & scripts
├── 📦 package-lock.json               # Locked dependency versions
├── ⚙️  vite.config.js                 # Vite bundler configuration
├── 🎨 tailwind.config.js              # Tailwind CSS configuration
├── 🎨 postcss.config.js               # PostCSS configuration
├── 🔍 eslint.config.js                # ESLint code quality rules
├── 📝 README.md                       # Project documentation
├── 🔒 .gitignore                      # Git ignore rules
├── 🔧 .env.example                    # Environment variables template
├── �️  healthcare-monitoring.zip      # Project archive file
└── 🗃️  .DS_Store                      # macOS system file
```

## 📋 Detailed File Descriptions

### 🏗️ **Root Configuration Files**
| File | Purpose | Description |
|------|---------|-------------|
| `package.json` | 📦 Dependencies | Defines NPM packages, scripts, and project metadata |
| `vite.config.js` | ⚙️ Build Config | Vite bundler settings for development and production |
| `tailwind.config.js` | 🎨 CSS Framework | Tailwind CSS utility classes configuration |
| `eslint.config.js` | 🔍 Code Quality | JavaScript/React code linting rules |
| `index.html` | 🌐 HTML Template | Base HTML file where React app mounts |

### ⚛️ **React Application Core**
| File | Purpose | Description |
|------|---------|-------------|
| `src/main.jsx` | 🚀 Entry Point | React app initialization with AuthProvider setup |
| `src/App.jsx` | 🏠 Root Component | Main app component with routing configuration |
| `src/App.css` | 🎨 App Styles | Application-specific CSS styles |
| `src/index.css` | 🎨 Global Styles | Global CSS styles and Tailwind imports |

### 🔐 **Authentication & Configuration**
| File | Purpose | Description |
|------|---------|-------------|
| `src/config/config.js` | ⚙️ App Config | Centralized configuration (AWS, Metabase) with env variables |
| `src/aws-config.js` | ☁️ Auth Config (DEPRECATED) | Legacy AWS Cognito config (use config/config.js instead) |
| `.env.local` | 🔧 Environment | Environment variables for secure configuration |

### 🔗 **Services & Utilities**
| File | Purpose | Description |
|------|---------|-------------|
| `src/services/metabaseService.js` | 📊 Analytics | Metabase JWT token generation and URL creation |
| `src/utils/metabaseTest.js` | 🧪 Testing | Metabase integration testing utilities |

### 🧩 **React Components**
| File | Purpose | Description |
|------|---------|-------------|
| `Navbar.jsx` | 🧭 Navigation | Top navigation bar with auth and menu items |
| `AlertBadge.jsx` | 🚨 Notifications | Alert notification badge component |
| `PatientTable.jsx` | 📊 Data Table | Sortable table displaying patient information |
| `VitalCard.jsx` | 📈 Metrics Card | Individual vital sign metric display card |
| `VitalChart.jsx` | 📉 Data Visualization | Charts for trending vital signs data |

### 📄 **Page Components**
| File | Purpose | Description |
|------|---------|-------------|
| `Dashboard.jsx` | 🏠 Main Page | Primary dashboard with patient overview |
| `Analytics.jsx` | 📊 Analytics | Metabase dashboard integration with secure embedding |
| `Alerts.jsx` | 🚨 Alert Management | Alert monitoring and management interface |
| `Login.jsx` | 🔐 Authentication | User login interface (AWS Cognito) |
| `PatientDetail.jsx` | 👤 Patient Info | Detailed view of individual patient data |

### 🗃️ **Data Management**
| File | Purpose | Description |
|------|---------|-------------|
| `src/data/mockData.js` | 🗃️ Test Data | Mock patient data for development and testing |

### 🚀 **Build & Deployment**
| File | Purpose | Description |
|------|---------|-------------|
| `dist/` | 📦 Production Build | Generated production-ready files |
| `node_modules/` | 📚 Dependencies | Installed NPM packages |

## 🔄 **Application Flow**

```
1. 🚀 main.jsx 
   ↓ (Initializes React app with AuthProvider)
2. ⚛️ App.jsx 
   ↓ (Routes to different pages based on authentication)
3. 🧭 Navbar.jsx 
   ↓ (Provides navigation across pages)
4. 🏠 Dashboard.jsx / � Alerts.jsx / � Login.jsx
   ↓ (Main page components)
5. 🧩 Components (VitalCard, PatientTable, etc.)
   ↓ (Reusable UI components)
6. 🗃️ mockData.js
   ↓ (Provides data to components)
```

## 🎯 **Key Features Implemented**

- ✅ **AWS Cognito Authentication** (OIDC)
- ✅ **React Router Navigation**
- ✅ **Responsive Dashboard UI**
- ✅ **Patient Data Management**
- ✅ **Vital Signs Monitoring**
- ✅ **Alert System**
- ✅ **Modern CSS with Tailwind**
- ✅ **Vite Build System**

## 🛠️ **Development Commands**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint code quality check
```