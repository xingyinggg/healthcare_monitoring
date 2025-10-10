// Mock data for healthcare dashboard
export const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    heartRate: 72,
    bloodPressure: "120/80",
    spO2: 98,
    ecg: "Normal Sinus Rhythm",
    activityLevel: 8500,
    respiratoryRate: 16,
    riskLevel: "Low",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    heartRate: 95,
    bloodPressure: "150/95",
    spO2: 94,
    ecg: "Atrial Fibrillation",
    activityLevel: 3200,
    respiratoryRate: 22,
    riskLevel: "High",
  },
  {
    id: 3,
    name: "Michael Chen",
    heartRate: 68,
    bloodPressure: "115/75",
    spO2: 99,
    ecg: "Normal Sinus Rhythm",
    activityLevel: 12000,
    respiratoryRate: 14,
    riskLevel: "Low",
  },
  {
    id: 4,
    name: "Emily Davis",
    heartRate: 88,
    bloodPressure: "135/85",
    spO2: 96,
    ecg: "Sinus Tachycardia",
    activityLevel: 6800,
    respiratoryRate: 18,
    riskLevel: "Medium",
  },
  {
    id: 5,
    name: "Robert Wilson",
    heartRate: 105,
    bloodPressure: "160/100",
    spO2: 92,
    ecg: "Ventricular Tachycardia",
    activityLevel: 1200,
    respiratoryRate: 28,
    riskLevel: "High",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    heartRate: 75,
    bloodPressure: "118/78",
    spO2: 98,
    ecg: "Normal Sinus Rhythm",
    activityLevel: 9500,
    respiratoryRate: 15,
    riskLevel: "Low",
  },
  {
    id: 7,
    name: "David Brown",
    heartRate: 82,
    bloodPressure: "128/82",
    spO2: 97,
    ecg: "Sinus Arrhythmia",
    activityLevel: 7200,
    respiratoryRate: 17,
    riskLevel: "Medium",
  },
  {
    id: 8,
    name: "Jennifer Miller",
    heartRate: 110,
    bloodPressure: "170/105",
    spO2: 90,
    ecg: "Atrial Flutter",
    activityLevel: 800,
    respiratoryRate: 30,
    riskLevel: "High",
  },
  {
    id: 9,
    name: "Thomas Garcia",
    heartRate: 70,
    bloodPressure: "112/72",
    spO2: 99,
    ecg: "Normal Sinus Rhythm",
    activityLevel: 11500,
    respiratoryRate: 13,
    riskLevel: "Low",
  },
  {
    id: 10,
    name: "Amanda Rodriguez",
    heartRate: 92,
    bloodPressure: "142/88",
    spO2: 95,
    ecg: "Premature Ventricular Contractions",
    activityLevel: 5400,
    respiratoryRate: 20,
    riskLevel: "Medium",
  },
];

// Generate historical data for charts (24 readings per patient)
export const generateHistoricalData = (patientId, vitalType) => {
  const labels = [];
  const data = [];

  for (let i = 23; i >= 0; i--) {
    const date = new Date();
    date.setHours(date.getHours() - i);
    labels.push(
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    // Generate realistic variations based on vital type and patient
    const patient = mockPatients.find((p) => p.id === patientId);
    let baseValue, variation;

    switch (vitalType) {
      case "heartRate":
        baseValue = patient.heartRate;
        variation = Math.random() * 20 - 10; // ±10 bpm
        data.push(Math.max(50, Math.min(150, baseValue + variation)));
        break;
      case "spO2":
        baseValue = patient.spO2;
        variation = Math.random() * 6 - 3; // ±3%
        data.push(Math.max(85, Math.min(100, baseValue + variation)));
        break;
      case "respiratoryRate":
        baseValue = patient.respiratoryRate;
        variation = Math.random() * 6 - 3; // ±3 breaths/min
        data.push(Math.max(8, Math.min(40, baseValue + variation)));
        break;
      case "activityLevel":
        baseValue = patient.activityLevel;
        variation = Math.random() * 2000 - 1000; // ±1000 steps
        data.push(Math.max(0, Math.min(20000, baseValue + variation)));
        break;
      case "bloodPressure":
        // For blood pressure, we'll use systolic values
        const [systolic] = patient.bloodPressure.split("/").map(Number);
        variation = Math.random() * 20 - 10; // ±10 mmHg
        data.push(Math.max(90, Math.min(200, systolic + variation)));
        break;
      case "ecg":
        // For ECG, we'll generate heart rhythm stability scores (0-100)
        baseValue =
          patient.ecg === "Normal Sinus Rhythm"
            ? 95
            : patient.ecg.includes("Tachycardia")
            ? 70
            : patient.ecg.includes("Fibrillation")
            ? 50
            : 80;
        variation = Math.random() * 20 - 10;
        data.push(Math.max(30, Math.min(100, baseValue + variation)));
        break;
      default:
        data.push(Math.random() * 100);
    }
  }

  return { labels, data };
};

// Alert conditions for high-risk patients
export const getPatientAlerts = () => {
  return mockPatients
    .filter((patient) => patient.riskLevel === "High")
    .slice(0, 5)
    .map((patient) => ({
      ...patient,
      condition:
        patient.heartRate > 100
          ? "Tachycardia"
          : patient.bloodPressure.split("/")[0] > 140
          ? "Hypertension"
          : patient.spO2 < 95
          ? "Hypoxemia"
          : patient.respiratoryRate > 24
          ? "Tachypnea"
          : patient.ecg !== "Normal Sinus Rhythm"
          ? "Arrhythmia"
          : "Abnormal Activity",
      alertColor: patient.riskLevel === "High" ? "red" : "orange",
    }));
};
