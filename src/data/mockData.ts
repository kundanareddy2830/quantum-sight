// Hardcoded data for Project Foresight demo
export const DEMO_DATA = {
  // Transaction history (normal baseline)
  transactionHistory: [
    { id: "TX-0992", time: "09:15 AM", from: "C11475", to: "C88234", amount: 850, status: "Normal" },
    { id: "TX-0993", time: "09:32 AM", from: "C77391", to: "C11475", amount: 1200, status: "Normal" },
    { id: "TX-0994", time: "10:41 AM", from: "C11475", to: "C55123", amount: 2300, status: "Normal" },
    { id: "TX-0995", time: "11:03 AM", from: "C44567", to: "C11475", amount: 750, status: "Normal" },
    { id: "TX-0996", time: "11:28 AM", from: "C11475", to: "C33891", amount: 1450, status: "Normal" },
    { id: "TX-0997", time: "11:45 AM", from: "C22445", to: "C11475", amount: 980, status: "Normal" },
    { id: "TX-0998", time: "12:01 PM", from: "C11475", to: "C66778", amount: 1750, status: "Normal" },
    { id: "TX-0999", time: "12:02 PM", from: "C11475", to: "C77889", amount: 320, status: "Normal" },
    { id: "TX-1000", time: "12:03 PM", from: "C11475", to: "C99882", amount: 5000, status: "Normal" }
  ],

  // The suspicious transaction that triggers analysis
  suspiciousTransaction: {
    id: "TX-1001",
    from: "C11475",
    to: "C99882",
    amount: 5000,
    time: "12:03 PM",
    note: "Selected for analysis"
  },

  // Fraud ring cluster (3-4 coordinated transactions)
  fraudRing: [
    { id: "TX-1001", from: "C11475", to: "C99882", amount: 5000, time: "12:03 PM" },
    { id: "TX-1002", from: "C99882", to: "C44391", amount: 4800, time: "12:04 PM" },
    { id: "TX-1003", from: "C44391", to: "C77234", amount: 4600, time: "12:05 PM" },
    { id: "TX-1004", from: "C77234", to: "C88445", amount: 4400, time: "12:06 PM" }
  ],

  // GNN Network nodes and edges (learned from history)
  networkGraph: {
    nodes: [
      { id: "C11475", label: "Primary Account", type: "primary", transfers: 8, flagged: false },
      { id: "C88234", label: "Regular", type: "normal", transfers: 3, flagged: false },
      { id: "C77391", label: "Regular", type: "normal", transfers: 4, flagged: false },
      { id: "C55123", label: "Regular", type: "normal", transfers: 2, flagged: false },
      { id: "C44567", label: "Regular", type: "normal", transfers: 3, flagged: false },
      { id: "C33891", label: "Regular", type: "normal", transfers: 2, flagged: false },
      { id: "C22445", label: "Regular", type: "normal", transfers: 1, flagged: false },
      { id: "C66778", label: "Regular", type: "normal", transfers: 1, flagged: false },
      { id: "C77889", label: "Regular", type: "normal", transfers: 1, flagged: false },
      // Suspicious nodes
      { id: "C99882", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C44391", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C77234", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true },
      { id: "C88445", label: "Suspicious", type: "suspicious", transfers: 1, flagged: true }
    ],
    edges: [
      { source: "C11475", target: "C88234", value: 850 },
      { source: "C77391", target: "C11475", value: 1200 },
      { source: "C11475", target: "C55123", value: 2300 },
      { source: "C44567", target: "C11475", value: 750 },
      { source: "C11475", target: "C33891", value: 1450 },
      { source: "C22445", target: "C11475", value: 980 },
      { source: "C11475", target: "C66778", value: 1750 },
      { source: "C11475", target: "C77889", value: 320 },
      // Suspicious edges
      { source: "C11475", target: "C99882", value: 5000, suspicious: true },
      { source: "C99882", target: "C44391", value: 4800, suspicious: true },
      { source: "C44391", target: "C77234", value: 4600, suspicious: true },
      { source: "C77234", target: "C88445", value: 4400, suspicious: true }
    ]
  },

  // Perturbation vector (16D) - exact numbers from spec
  perturbationVector: [0.12, -0.07, 0.04, 0.20, -0.01, 0.05, 0.09, -0.02, 0.03, 0.11, -0.06, 0.02, 0.00, 0.08, 0.06, -0.03],

  // PCA reduced (4D) - exact numbers from spec
  pcaVector: [0.21, -0.05, 0.12, 0.03],

  // Quantum-enhanced (2D) - exact numbers from spec
  quantumVector: [0.15375345, 0.03578131],
  quantumVectorDisplay: [0.1538, 0.0358],

  // Hamiltonian display
  hamiltonian: "H = 0.1538 * ZI + 0.0358 * IZ",

  // VQE results - exact numbers from spec
  vqeResults: {
    energy: -0.1744,
    probabilities: {
      "01": 0.7959,
      "00": 0.2041
    },
    verdict: "Moderate Risk — Verify",
    confidence: "79.59%",
    recommendation: "Manual review, request OTP"
  },

  // 2D scatter plot data for QCL visualization
  scatterData: {
    normal: [
      { x: 0.02, y: 0.01, label: "Normal" },
      { x: 0.01, y: 0.03, label: "Normal" },
      { x: -0.01, y: 0.02, label: "Normal" },
      { x: 0.03, y: -0.01, label: "Normal" },
      { x: -0.02, y: -0.01, label: "Normal" },
      { x: 0.01, y: -0.02, label: "Normal" },
      { x: -0.01, y: 0.01, label: "Normal" }
    ],
    suspicious: { x: 0.1538, y: 0.0358, label: "Suspicious" }
  }
};