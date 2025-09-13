import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface HamiltonianStepProps {
  onComplete: () => void;
}

const HamiltonianStep: React.FC<HamiltonianStepProps> = ({ onComplete }) => {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <Settings className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hamiltonian Construction</h1>
          <p className="text-muted-foreground">Building risk map from quantum-enhanced vector</p>
        </div>
      </div>
      <Card className="card-quantum">
        <CardHeader>
          <CardTitle>Risk Map Hamiltonian</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center font-mono text-lg">
            {DEMO_DATA.hamiltonian}
          </div>
          <Button onClick={onComplete} className="w-full">
            Run VQE Optimization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HamiltonianStep;