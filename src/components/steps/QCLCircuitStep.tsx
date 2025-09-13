import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from 'lucide-react';

interface QCLCircuitStepProps {
  onComplete: () => void;
}

const QCLCircuitStep: React.FC<QCLCircuitStepProps> = ({ onComplete }) => {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <Zap className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quantum Convolutional Layer</h1>
          <p className="text-muted-foreground">Processing 4D vector through quantum circuit</p>
        </div>
      </div>
      <Card className="card-quantum">
        <CardContent className="p-8">
          <div className="text-center">
            <p className="mb-4">Quantum circuit processing...</p>
            <Button onClick={onComplete}>Continue to Quantum Vector</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCLCircuitStep;