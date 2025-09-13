import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface QuantumVectorStepProps {
  onComplete: () => void;
}

const QuantumVectorStep: React.FC<QuantumVectorStepProps> = ({ onComplete }) => {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <Cpu className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quantum-Enhanced Vector</h1>
          <p className="text-muted-foreground">2D vector with hidden correlations discovered by QCL</p>
        </div>
      </div>
      <Card className="card-quantum">
        <CardHeader>
          <CardTitle>2D Quantum Vector</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-mono">
              [{DEMO_DATA.quantumVectorDisplay.join(', ')}]
            </div>
          </div>
          <Button onClick={onComplete} className="w-full">
            Build Hamiltonian
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantumVectorStep;