import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  ChevronRight, 
  Database,
  Network, 
  BrainCircuit,
  Zap,
  Cpu, 
  BarChart3,
  Settings,
  Shield,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Import step components
import DataInputStep from './steps/DataInputStep';
import TransactionGraphStep from './steps/TransactionGraphStep';
import GNNEmbeddingsStep from './steps/GNNEmbeddingsStep';
import PCAReductionStep from './steps/PCAReductionStep';
import QCLCircuitStep from './steps/QCLCircuitStep';
import QuantumVectorStep from './steps/QuantumVectorStep';
import HamiltonianStep from './steps/HamiltonianStep';
import VQEOptimizationStep from './steps/VQEOptimizationStep';
import RiskVerdictStep from './steps/RiskVerdictStep';

type StepType = 
  | 'data-input'
  | 'transaction-graph' 
  | 'gnn-embeddings'
  | 'pca-reduction'
  | 'qcl-circuit'
  | 'quantum-vector'
  | 'hamiltonian'
  | 'vqe-optimization'
  | 'risk-verdict';

interface Step {
  id: StepType;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  tooltip: string;
}

const steps: Step[] = [
  {
    id: 'data-input',
    title: 'Data Input',
    description: 'Transaction data and selection',
    icon: Database,
    tooltip: 'Input recent transactions and select one for analysis'
  },
  {
    id: 'transaction-graph',
    title: 'Transaction Graph',
    description: 'Network visualization',
    icon: Network,
    tooltip: 'Interactive graph showing account connections and transaction flows'
  },
  {
    id: 'gnn-embeddings',
    title: 'GNN Embeddings',
    description: 'Perturbation vector creation',
    icon: BrainCircuit,
    tooltip: 'GNN creates embeddings and computes difference to identify anomalies'
  },
  {
    id: 'pca-reduction',
    title: 'PCA Reduction',
    description: '16D → 4D compression',
    icon: BarChart3,
    tooltip: 'Principal Component Analysis reduces dimensions for quantum processing'
  },
  {
    id: 'qcl-circuit',
    title: 'QCL Circuit',
    description: 'Quantum circuit parameters',
    icon: Zap,
    tooltip: 'Quantum Convolutional Layer circuit setup and parameter visualization'
  },
  {
    id: 'quantum-vector',
    title: 'Quantum Vector',
    description: '4D → 2D quantum enhancement',
    icon: Cpu,
    tooltip: 'QCL produces quantum-enhanced 2D vector with hidden correlations'
  },
  {
    id: 'hamiltonian',
    title: 'Hamiltonian',
    description: 'Risk map construction',
    icon: Settings,
    tooltip: 'Build Hamiltonian from quantum vector to create risk landscape'
  },
  {
    id: 'vqe-optimization',
    title: 'VQE Optimization',
    description: 'Parameter optimization',
    icon: AlertTriangle,
    tooltip: 'Variational Quantum Eigensolver finds optimal energy configuration'
  },
  {
    id: 'risk-verdict',
    title: 'Risk Verdict',
    description: 'Final probability & action',
    icon: Shield,
    tooltip: 'Final risk assessment with probability distribution and recommended action'
  }
];

const Dashboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('data-input');
  const [completedSteps, setCompletedSteps] = useState<Set<StepType>>(new Set());

  const handleStepComplete = (stepId: StepType) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    
    // Auto-advance to next step
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleStepClick = (stepId: StepType) => {
    setCurrentStep(stepId);
  };

  const resetDemo = () => {
    setCurrentStep('data-input');
    setCompletedSteps(new Set());
  };

  const renderCurrentStep = () => {
    const stepProps = {
      onComplete: () => handleStepComplete(currentStep),
      onNext: (nextStep: StepType) => setCurrentStep(nextStep),
      isCompleted: completedSteps.has(currentStep)
    };

    switch (currentStep) {
      case 'data-input':
        return <DataInputStep {...stepProps} />;
      case 'transaction-graph':
        return <TransactionGraphStep {...stepProps} />;
      case 'gnn-embeddings':
        return <GNNEmbeddingsStep {...stepProps} />;
      case 'pca-reduction':
        return <PCAReductionStep {...stepProps} />;
      case 'qcl-circuit':
        return <QCLCircuitStep {...stepProps} />;
      case 'quantum-vector':
        return <QuantumVectorStep {...stepProps} />;
      case 'hamiltonian':
        return <HamiltonianStep {...stepProps} />;
      case 'vqe-optimization':
        return <VQEOptimizationStep {...stepProps} />;
      case 'risk-verdict':
        return <RiskVerdictStep {...stepProps} />;
      default:
        return <DataInputStep {...stepProps} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex">
        {/* Side Navigation */}
        <nav className="w-80 bg-card border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3 mb-2">
              <BrainCircuit className="h-8 w-8 text-quantum" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Project Foresight</h1>
                <p className="text-sm text-muted-foreground">Hybrid Fraud Detection</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemo}
              className="w-full mt-3"
            >
              Reset Demo
            </Button>
          </div>

          {/* Steps */}
          <div className="flex-1 p-4 space-y-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = completedSteps.has(step.id);
              const isAccessible = index === 0 || completedSteps.has(steps[index - 1].id);

              return (
                <Tooltip key={step.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => isAccessible && handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 border ${
                        isActive 
                          ? 'bg-quantum/10 border-quantum text-quantum' 
                          : isCompleted
                          ? 'bg-success/10 border-success/50 text-success hover:bg-success/20'
                          : isAccessible
                          ? 'bg-card border-border hover:bg-muted/50 text-foreground'
                          : 'bg-muted/30 border-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-quantum text-quantum-foreground' 
                            : isCompleted
                            ? 'bg-success text-success-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-muted-foreground">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="font-semibold text-sm truncate">{step.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-quantum" />
                        )}
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>{step.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Progress */}
          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">
                  {completedSteps.size}/{steps.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-quantum h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background opacity-80" />
          
          <div className="relative z-10 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;