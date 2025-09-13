import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface VQEOptimizationStepProps {
  onComplete: () => void;
}

const VQEOptimizationStep: React.FC<VQEOptimizationStepProps> = ({ onComplete }) => {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">VQE Parameter Optimization</h1>
          <p className="text-muted-foreground">Finding optimal energy configuration</p>
        </div>
      </div>
      <Card className="card-quantum">
        <CardHeader>
          <CardTitle>Optimization Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>VQE Energy:</span>
              <span className="font-mono">{DEMO_DATA.vqeResults.energy}</span>
            </div>
            <div className="flex justify-between">
              <span>|01⟩ State:</span>
              <span className="font-mono">{(DEMO_DATA.vqeResults.probabilities["01"] * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>|00⟩ State:</span>
              <span className="font-mono">{(DEMO_DATA.vqeResults.probabilities["00"] * 100).toFixed(2)}%</span>
            </div>
          </div>
          <Button onClick={onComplete} className="w-full">
            Generate Risk Verdict
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VQEOptimizationStep;