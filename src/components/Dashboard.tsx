import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Activity, 
  Network, 
  Zap, 
  Cpu, 
  BrainCircuit,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Import all dashboard pages
import LandingPage from './pages/LandingPage';
import TransactionHistory from './pages/TransactionHistory';
import GNNNetwork from './pages/GNNNetwork';
import FraudRingDetection from './pages/FraudRingDetection';
import PerturbationVector from './pages/PerturbationVector';
import PCAReduction from './pages/PCAReduction';
import QuantumProcessing from './pages/QuantumProcessing';
import HamiltonianRiskMap from './pages/HamiltonianRiskMap';
import VQEOptimization from './pages/VQEOptimization';
import FinalForecast from './pages/FinalForecast';
import ReplaySummary from './pages/ReplaySummary';

type PageType = 
  | 'landing'
  | 'history' 
  | 'network'
  | 'fraud-ring'
  | 'perturbation'
  | 'pca'
  | 'quantum'
  | 'hamiltonian'
  | 'vqe'
  | 'forecast'
  | 'replay';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Auto-play sequence
  const autoPlaySequence: PageType[] = [
    'fraud-ring',
    'perturbation', 
    'pca',
    'quantum',
    'hamiltonian',
    'vqe',
    'forecast'
  ];

  const startAutoPlay = () => {
    setCurrentPage('fraud-ring');
    setIsAutoPlaying(true);
    setAnalysisStep(0);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    setAnalysisStep(0);
  };

  const resetDemo = () => {
    setCurrentPage('landing');
    setIsAutoPlaying(false);
    setAnalysisStep(0);
  };

  // Auto-play progression
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      const nextStep = analysisStep + 1;
      
      if (nextStep < autoPlaySequence.length) {
        setCurrentPage(autoPlaySequence[nextStep]);
        setAnalysisStep(nextStep);
      } else {
        // End of auto-play sequence
        setIsAutoPlaying(false);
        setCurrentPage('forecast');
      }
    }, getStepDuration(currentPage));

    return () => clearTimeout(timer);
  }, [currentPage, analysisStep, isAutoPlaying]);

  // Different durations for each step (minimum 30 seconds each)
  const getStepDuration = (page: PageType): number => {
    const durations = {
      'fraud-ring': 30000,
      'perturbation': 30000,
      'pca': 30000,
      'quantum': 30000,
      'hamiltonian': 30000,
      'vqe': 30000,
      'forecast': 0
    };
    return durations[page] || 30000;
  };

  const renderCurrentPage = () => {
    const pageProps = {
      onNext: (nextPage: PageType) => setCurrentPage(nextPage),
      onStartAnalysis: startAutoPlay,
      isAutoPlaying
    };

    switch (currentPage) {
      case 'landing':
        return <LandingPage {...pageProps} />;
      case 'history':
        return <TransactionHistory {...pageProps} />;
      case 'network':
        return <GNNNetwork {...pageProps} />;
      case 'fraud-ring':
        return <FraudRingDetection {...pageProps} />;
      case 'perturbation':
        return <PerturbationVector {...pageProps} />;
      case 'pca':
        return <PCAReduction {...pageProps} />;
      case 'quantum':
        return <QuantumProcessing {...pageProps} />;
      case 'hamiltonian':
        return <HamiltonianRiskMap {...pageProps} />;
      case 'vqe':
        return <VQEOptimization {...pageProps} />;
      case 'forecast':
        return <FinalForecast {...pageProps} />;
      case 'replay':
        return <ReplaySummary {...pageProps} />;
      default:
        return <LandingPage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background opacity-80" />
      
      {/* Navigation bar */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-quantum" />
              <h1 className="text-xl font-bold text-foreground">Project Foresight</h1>
            </div>
            <Badge variant="outline" className="text-quantum border-quantum/50">
              Hybrid Fraud Forecast
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAutoPlaying && (
              <Badge className="animate-pulse bg-quantum/20 text-quantum border-quantum/50">
                <Activity className="h-3 w-3 mr-1" />
                Analyzing...
              </Badge>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemo}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Progress indicator for auto-play */}
      {isAutoPlaying && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <Card className="card-quantum">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {autoPlaySequence.map((step, index) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index <= analysisStep ? 'bg-quantum' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Step {analysisStep + 1} of {autoPlaySequence.length}
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;