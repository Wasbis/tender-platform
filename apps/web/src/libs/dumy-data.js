// --- 1. EXPANDED KBLI (20 Izin Usaha Perusahaan Lu) ---
// Fokus: IT, Konsultan Engineering, Reliability, & Supply Hardware
export const myKBLI = [
  "62011", // Aktivitas Pemrograman Komputer
  "62012", // Pengembangan Aplikasi E-commerce
  "62015", // Aktivitas Pemrograman AI & Blockchain
  "62019", // Aktivitas Pemrograman Lainnya
  "62021", // Aktivitas Konsultasi Komputer & Manajemen Fasilitas
  "62029", // Aktivitas Konsultasi Komputer Lainnya
  "62090", // Aktivitas Teknologi Informasi Lainnya
  "63111", // Aktivitas Pengolahan Data
  "63112", // Aktivitas Hosting & Ybdi
  "63122", // Portal Web dan/atau Platform Digital
  "46511", // Perdagangan Besar Komputer dan Perlengkapan
  "46521", // Perdagangan Besar Suku Cadang Elektronik
  "46522", // Perdagangan Besar Peralatan Telekomunikasi
  "71102", // Aktivitas Keinsinyuran dan Konsultasi Teknis Ybdi
  "71201", // Jasa Pengujian Laboratorium (Reliability Testing)
  "71202", // Jasa Inspeksi Teknik
  "70209", // Aktivitas Konsultasi Manajemen Lainnya
  "61999", // Aktivitas Telekomunikasi Lainnya
  "43211", // Instalasi Listrik (Support Server/Data Center)
  "33131", // Reparasi Peralatan Elektronik
];

// --- 2. 50 REALISTIC TENDERS (Mix Match & Unmatch) ---
export const tenders = [
  // --- CLUSTER 1: SOFTWARE DEVELOPMENT (MATCH) ---
  {
    id: "TND-2026-001",
    title: "Pengadaan Jasa Maintenance Server & Network HQ",
    agency: "Kementerian Keuangan",
    value: 2500000000,
    deadline: "2026-03-15",
    status: "Qualified",
    kbliCode: "62019", // MATCH
    location: "Jakarta Pusat",
    requirements: ["ISO 27001", "Cisco CCNP"],
  },
  {
    id: "TND-2026-002",
    title: "Revamping Sistem IoT Monitoring Kilang Balongan",
    agency: "Pertamina Kilang Internasional",
    value: 15000000000,
    deadline: "2026-04-10",
    status: "New",
    kbliCode: "62021", // MATCH
    location: "Indramayu",
    requirements: ["ISO 9001", "CSMS High Risk"],
  },
  {
    id: "TND-2026-003",
    title: "License Renewal Microsoft 365 Enterprise",
    agency: "SKK Migas",
    value: 450000000,
    deadline: "2026-03-01",
    status: "Drafting",
    kbliCode: "46511", // MATCH
    location: "Jakarta Selatan",
    requirements: ["Authorized Reseller"],
  },
  {
    id: "TND-2026-004",
    title: "Pengembangan Dashboard AI Predictive Maintenance",
    agency: "PLN (Persero)",
    value: 3200000000,
    deadline: "2026-05-20",
    status: "New",
    kbliCode: "62015", // MATCH
    location: "Jakarta Selatan",
    requirements: ["ISO 27001", "TensorFlow Cert"],
  },
  {
    id: "TND-2026-005",
    title: "Jasa Managed Service SD-WAN Seluruh Cabang",
    agency: "Bank Mandiri",
    value: 8500000000,
    deadline: "2026-02-25",
    status: "Submitted",
    kbliCode: "61999", // MATCH
    location: "Nasional",
    requirements: ["ISO 20000", "PCIDSS"],
  },

  // --- CLUSTER 2: RELIABILITY ENGINEER O&G (MATCH - Engineering/Consulting) ---
  {
    id: "TND-2026-006",
    title: "Risk Based Inspection (RBI) Study Implementation",
    agency: "Pertamina Hulu Mahakam",
    value: 4500000000,
    deadline: "2026-03-30",
    status: "Qualified",
    kbliCode: "71102", // MATCH
    location: "Kalimantan Timur",
    requirements: ["ISO 55001", "API 580/581"],
  },
  {
    id: "TND-2026-007",
    title: "Reliability Centered Maintenance (RCM) Analysis for Rotating Equipment",
    agency: "Medco E&P Natuna",
    value: 2100000000,
    deadline: "2026-04-05",
    status: "New",
    kbliCode: "71102", // MATCH
    location: "Kepulauan Riau",
    requirements: ["ISO 14224", "CRE Certification"],
  },
  {
    id: "TND-2026-008",
    title: "Provision of Vibration Monitoring Services",
    agency: "ExxonMobil Cepu Limited",
    value: 7800000000,
    deadline: "2026-03-12",
    status: "Drafting",
    kbliCode: "71201", // MATCH
    location: "Bojonegoro",
    requirements: ["ISO 18436", "CSMS High"],
  },
  {
    id: "TND-2026-009",
    title: "Instrument Safety System (SIS) Validation & Verification",
    agency: "BP Berau Ltd",
    value: 5600000000,
    deadline: "2026-06-15",
    status: "New",
    kbliCode: "71202", // MATCH
    location: "Papua Barat",
    requirements: ["IEC 61508", "TUV Functional Safety"],
  },
  {
    id: "TND-2026-010",
    title: "Asset Integrity Management System (AIMS) Consultancy",
    agency: "Mubadala Energy",
    value: 3900000000,
    deadline: "2026-04-22",
    status: "New",
    kbliCode: "70209", // MATCH
    location: "Aceh",
    requirements: ["ISO 55000", "IAM Certificate"],
  },

  // --- CLUSTER 3: UNMATCHED TENDERS (Construction, Catering, Cleaning) ---
  {
    id: "TND-2026-011",
    title: "Pengadaan Catering Harian Site Muara Badak",
    agency: "Pertamina Hulu Sanga Sanga",
    value: 800000000,
    deadline: "2026-02-28",
    status: "New",
    kbliCode: "56210", // UNMATCH (Catering)
    location: "Kalimantan Timur",
    requirements: ["HACCP", "Halal MUI"],
  },
  {
    id: "TND-2026-012",
    title: "Pembangunan Gedung Arsip 3 Lantai",
    agency: "Kementerian PUPR",
    value: 12000000000,
    deadline: "2026-03-20",
    status: "New",
    kbliCode: "41011", // UNMATCH (Konstruksi Gedung)
    location: "Bandung",
    requirements: ["SBU BG001", "ISO 45001"],
  },
  {
    id: "TND-2026-013",
    title: "Jasa Kebersihan (Cleaning Service) Kantor Pusat",
    agency: "BNI 46",
    value: 1500000000,
    deadline: "2026-02-18",
    status: "New",
    kbliCode: "81210", // UNMATCH (Cleaning)
    location: "Jakarta Pusat",
    requirements: ["BNSP Cleaning", "Manpower Supply"],
  },
  {
    id: "TND-2026-014",
    title: "Sewa Kendaraan Operasional Double Cabin 4x4",
    agency: "PetroChina International",
    value: 4200000000,
    deadline: "2026-03-10",
    status: "New",
    kbliCode: "77100", // UNMATCH (Rental Mobil)
    location: "Jambi",
    requirements: ["Unit < 3 Tahun", "Driver SIM B1"],
  },
  {
    id: "TND-2026-015",
    title: "Pengadaan BBM Solar Industri (High Speed Diesel)",
    agency: "Pelindo III",
    value: 25000000000,
    deadline: "2026-03-01",
    status: "New",
    kbliCode: "46610", // UNMATCH (BBM)
    location: "Surabaya",
    requirements: ["Izin Niaga Umum Migas"],
  },

  // --- CLUSTER 4: MIXED & HARDWARE (MATCH) ---
  {
    id: "TND-2026-016",
    title: "Procurement of High Performance Computing (HPC) Server",
    agency: "BRIN",
    value: 9500000000,
    deadline: "2026-05-10",
    status: "Drafting",
    kbliCode: "46511", // MATCH
    location: "Cibinong",
    requirements: ["Principal Letter", "Post-Sales Support"],
  },
  {
    id: "TND-2026-017",
    title: "Pengadaan Laptop Karyawan Batch 1 2026",
    agency: "Telkomsel",
    value: 3000000000,
    deadline: "2026-02-28",
    status: "Submitted",
    kbliCode: "46511", // MATCH
    location: "Jakarta Selatan",
    requirements: ["TKDN > 25%", "Warranty 3 Years"],
  },
  {
    id: "TND-2026-018",
    title: "Digital Twin Implementation for Offshore Platform",
    agency: "PHE ONWJ",
    value: 18000000000,
    deadline: "2026-06-01",
    status: "New",
    kbliCode: "62012", // MATCH
    location: "Jawa Barat",
    requirements: ["ISO 19650", "BIM Level 2"],
  },
  {
    id: "TND-2026-019",
    title: "Cyber Security Penetration Testing (Red Teaming)",
    agency: "Bank Indonesia",
    value: 1200000000,
    deadline: "2026-03-18",
    status: "Qualified",
    kbliCode: "62021", // MATCH
    location: "Jakarta Pusat",
    requirements: ["OSCP", "CREST Registered"],
  },
  {
    id: "TND-2026-020",
    title: "Maintenance Sistem SCADA & Telemetry",
    agency: "PGN (Perusahaan Gas Negara)",
    value: 5500000000,
    deadline: "2026-04-12",
    status: "New",
    kbliCode: "71102", // MATCH
    location: "Sumatera Selatan",
    requirements: ["ISA/IEC 62443", "SCADA Expert"],
  },

  // --- CLUSTER 5: FILLER MATCH (Smaller projects) ---
  {
    id: "TND-2026-021",
    title: "Pembuatan Website Profil Perusahaan",
    agency: "PT Angkasa Pura I",
    value: 150000000,
    deadline: "2026-02-20",
    status: "Rejected", // History data
    kbliCode: "63122", // MATCH
    location: "Jakarta Pusat",
    requirements: ["Portofolio UI/UX"],
  },
  {
    id: "TND-2026-022",
    title: "Sewa Cloud Hosting & Domain 1 Tahun",
    agency: "Kementerian Kesehatan",
    value: 200000000,
    deadline: "2026-03-05",
    status: "Lost",
    kbliCode: "63112", // MATCH
    location: "Jakarta Selatan",
    requirements: ["Tier 3 Data Center"],
  },
  {
    id: "TND-2026-023",
    title: "Konsultasi Implementasi ERP SAP S/4HANA",
    agency: "Krakatau Steel",
    value: 22000000000,
    deadline: "2026-05-30",
    status: "New",
    kbliCode: "62021", // MATCH
    location: "Cilegon",
    requirements: ["SAP Gold Partner", "ASAP Methodology"],
  },
  {
    id: "TND-2026-024",
    title: "Data Center Cooling System Upgrade",
    agency: "Biznet",
    value: 4500000000,
    deadline: "2026-04-01",
    status: "New",
    kbliCode: "43211", // MATCH
    location: "Jakarta Barat",
    requirements: ["CDCP", "Uptime Institute Tier"],
  },
  {
    id: "TND-2026-025",
    title: "Pengadaan CCTV & Access Control System",
    agency: "Otoritas Jasa Keuangan (OJK)",
    value: 1800000000,
    deadline: "2026-03-25",
    status: "New",
    kbliCode: "46521", // MATCH
    location: "Jakarta Pusat",
    requirements: ["ISO 27001", "Lenel Certified"],
  },

  // --- CLUSTER 6: FILLER UNMATCH ---
  {
    id: "TND-2026-026",
    title: "Jasa Pengamanan (Security) Area Kilang",
    agency: "Pertamina RU V",
    value: 8000000000,
    deadline: "2026-03-15",
    status: "New",
    kbliCode: "80100", // UNMATCH
    location: "Balikpapan",
    requirements: ["Gada Utama", "SMP Sistem Manajemen Pengamanan"],
  },
  {
    id: "TND-2026-027",
    title: "Pekerjaan Dredging (Pengerukan) Alur Pelayaran",
    agency: "Kementerian Perhubungan",
    value: 45000000000,
    deadline: "2026-04-20",
    status: "New",
    kbliCode: "42915", // UNMATCH
    location: "Tanjung Priok",
    requirements: ["SIUJK", "Kapal Keruk"],
  },
  {
    id: "TND-2026-028",
    title: "Pengadaan Seragam APD & Safety Shoes",
    agency: "Adaro Energy",
    value: 900000000,
    deadline: "2026-02-28",
    status: "New",
    kbliCode: "14120", // UNMATCH
    location: "Kalimantan Selatan",
    requirements: ["SNI", "TKDN"],
  },
  {
    id: "TND-2026-029",
    title: "Event Organizer Gathering Perusahaan",
    agency: "Pegadaian",
    value: 500000000,
    deadline: "2026-03-10",
    status: "New",
    kbliCode: "82301", // UNMATCH
    location: "Bali",
    requirements: ["CHSE Certified"],
  },
  {
    id: "TND-2026-030",
    title: "Jasa Freight Forwarding & Logistics",
    agency: "Inalum",
    value: 3500000000,
    deadline: "2026-03-22",
    status: "New",
    kbliCode: "52291", // UNMATCH
    location: "Sumatera Utara",
    requirements: ["IATA Agent", "AEO Certified"],
  },

  // --- CLUSTER 7: MIXED STATUS & DOMAIN (MATCH) ---
  {
    id: "TND-2026-031",
    title: "Root Cause Analysis (RCA) Software Subscription",
    agency: "Pupuk Indonesia",
    value: 600000000,
    deadline: "2026-03-08",
    status: "Drafting",
    kbliCode: "46511", // MATCH
    location: "Jakarta Barat",
    requirements: ["Authorized Distributor"],
  },
  {
    id: "TND-2026-032",
    title: "Failure Mode and Effects Analysis (FMEA) Facilitation",
    agency: "Toyota Motor Manufacturing",
    value: 850000000,
    deadline: "2026-04-15",
    status: "New",
    kbliCode: "70209", // MATCH
    location: "Karawang",
    requirements: ["IATF 16949 Knowledge"],
  },
  {
    id: "TND-2026-033",
    title: "Mobile App Development for Field Workers",
    agency: "Pamapersada Nusantara",
    value: 1400000000,
    deadline: "2026-05-01",
    status: "Qualified",
    kbliCode: "62012", // MATCH
    location: "Jakarta Timur",
    requirements: ["Flutter Expert", "Offline-First Architecture"],
  },
  {
    id: "TND-2026-034",
    title: "Corrosion Under Insulation (CUI) Inspection",
    agency: "Chandra Asri Petrochemical",
    value: 2800000000,
    deadline: "2026-03-28",
    status: "New",
    kbliCode: "71202", // MATCH
    location: "Cilegon",
    requirements: ["API 570", "NACE Certified"],
  },
  {
    id: "TND-2026-035",
    title: "Pengadaan & Instalasi Fire Alarm System Data Center",
    agency: "Telkom Sigma",
    value: 1200000000,
    deadline: "2026-02-25",
    status: "Won", // History
    kbliCode: "43211", // MATCH
    location: "Serpong",
    requirements: ["NFPA 72", "FM Global"],
  },

  // --- CLUSTER 8: FINAL MIX (Unmatch & Match) ---
  {
    id: "TND-2026-036",
    title: "Penyewaan Helikopter Offshore Support",
    agency: "Husky CNOOC Madura",
    value: 65000000000,
    deadline: "2026-06-01",
    status: "New",
    kbliCode: "51101", // UNMATCH
    location: "Madura",
    requirements: ["OCIMF OVID", "BGS Audit"],
  },
  {
    id: "TND-2026-037",
    title: "Blockchain-based Supply Chain System",
    agency: "Pelindo",
    value: 5500000000,
    deadline: "2026-05-15",
    status: "New",
    kbliCode: "62015", // MATCH
    location: "Jakarta Utara",
    requirements: ["Hyperledger Fabric", "ISO 27001"],
  },
  {
    id: "TND-2026-038",
    title: "Pipeline Integrity Management System (PIMS) Audit",
    agency: "Pertamina Gas (Pertagas)",
    value: 1900000000,
    deadline: "2026-03-12",
    status: "New",
    kbliCode: "71102", // MATCH
    location: "Jawa Timur",
    requirements: ["ASME B31.8S", "Auditor Certified"],
  },
  {
    id: "TND-2026-039",
    title: "Pengadaan Medical Check Up (MCU) Karyawan",
    agency: "Kimia Farma",
    value: 700000000,
    deadline: "2026-02-28",
    status: "New",
    kbliCode: "86100", // UNMATCH
    location: "Bandung",
    requirements: ["Klinik Utama", "ISO 15189"],
  },
  {
    id: "TND-2026-040",
    title: "API Management Platform Deployment",
    agency: "Bank BTPN",
    value: 2300000000,
    deadline: "2026-04-10",
    status: "Drafting",
    kbliCode: "62021", // MATCH
    location: "Jakarta Selatan",
    requirements: ["Kong/Apigee Expert", "DevSecOps"],
  },
  {
    id: "TND-2026-041",
    title: "Jasa Pengelolaan Limbah B3",
    agency: "Unilever Indonesia",
    value: 3000000000,
    deadline: "2026-03-20",
    status: "New",
    kbliCode: "38120", // UNMATCH
    location: "Cikarang",
    requirements: ["Izin KLHK", "Manifest Festronik"],
  },
  {
    id: "TND-2026-042",
    title: "Technical Writing & Documentation Service",
    agency: "Gojek Tokopedia (GoTo)",
    value: 400000000,
    deadline: "2026-02-22",
    status: "Submitted",
    kbliCode: "70209", // MATCH
    location: "Jakarta Selatan",
    requirements: ["English Native Level", "API Documentation"],
  },
  {
    id: "TND-2026-043",
    title: "Pengadaan Valve & Fitting Instrument",
    agency: "Badak LNG",
    value: 1200000000,
    deadline: "2026-03-05",
    status: "New",
    kbliCode: "46521", // MATCH (Agak maksa ke elektronik/part, tapi bisa masuk supply)
    location: "Bontang",
    requirements: ["Swagelok/Parker", "Origin Cert"],
  },
  {
    id: "TND-2026-044",
    title: "Renovasi Interior Kantor Cabang",
    agency: "Bank BRI",
    value: 900000000,
    deadline: "2026-03-01",
    status: "New",
    kbliCode: "43301", // UNMATCH
    location: "Yogyakarta",
    requirements: ["SBU Interior", "Desain Klasik"],
  },
  {
    id: "TND-2026-045",
    title: "DevOps Automation & CI/CD Implementation",
    agency: "Traveloka",
    value: 1600000000,
    deadline: "2026-04-25",
    status: "Qualified",
    kbliCode: "62019", // MATCH
    location: "BSD City",
    requirements: ["AWS Certified", "Kubernetes"],
  },
  {
    id: "TND-2026-046",
    title: "Thermography Inspection Service",
    agency: "PLN Indonesia Power",
    value: 600000000,
    deadline: "2026-02-27",
    status: "New",
    kbliCode: "71202", // MATCH
    location: "Semarang",
    requirements: ["Level 2 Thermographer", "ISO 18434"],
  },
  {
    id: "TND-2026-047",
    title: "Jasa Konsultan Pajak & Keuangan",
    agency: "Waskita Karya",
    value: 500000000,
    deadline: "2026-03-10",
    status: "New",
    kbliCode: "69200", // UNMATCH
    location: "Jakarta Timur",
    requirements: ["Brevet AB", "Izin Konsultan"],
  },
  {
    id: "TND-2026-048",
    title: "IT Staff Augmentation (20 Java Developers)",
    agency: "Astra International",
    value: 7200000000,
    deadline: "2026-03-30",
    status: "New",
    kbliCode: "78300", // UNMATCH (Outsourcing SDM biasanya beda KBLI, kecuali IT Service)
    location: "Jakarta Utara",
    requirements: ["Spring Boot", "Microservices"],
  },
  {
    id: "TND-2026-049",
    title: "Pengadaan Genset 500 kVA",
    agency: "RSUD Cengkareng",
    value: 1800000000,
    deadline: "2026-03-05",
    status: "New",
    kbliCode: "46591", // UNMATCH (Mesin)
    location: "Jakarta Barat",
    requirements: ["Perkins/Cummins", "Silent Type"],
  },
  {
    id: "TND-2026-050",
    title: "Smart Building System Integration",
    agency: "Ciputra Group",
    value: 6500000000,
    deadline: "2026-05-20",
    status: "New",
    kbliCode: "62021", // MATCH
    location: "Surabaya",
    requirements: ["BMS Schneider", "Greenship Building"],
  },
];

// ... (Data tenders dan myKBLI yang sudah ada biarkan saja)

// --- 3. USERS (Sesuai Skema Tabel Users) ---
export const users = [
  {
    userID: 1,
    fullName: "Admin Sistem",
    email: "admin@tender.ai",
    passwordHash: "admin123", // Di real app ini harus hash (bcrypt)
    role: "Admin",
    avatar: "AS",
  },
  {
    userID: 2,
    fullName: "Diya Async",
    email: "diya@tender.ai",
    passwordHash: "engineer123",
    role: "Engineer",
    avatar: "DA",
  },
  {
    userID: 3,
    fullName: "Pak Bos",
    email: "director@tender.ai",
    passwordHash: "boss123",
    role: "Director",
    avatar: "PB",
  },
];
