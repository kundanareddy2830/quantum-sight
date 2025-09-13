import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ArrowRight } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface PCAReductionStepProps {
  onComplete: () => void;
  onNext: (nextStep: string) => void;
  isCompleted: boolean;
}

const PCAReductionStep: React.FC<PCAReductionStepProps> = ({ onComplete }) => {
  const [showReduction, setShowReduction] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowReduction(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <BarChart3 className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">PCA Dimensionality Reduction</h1>
          <p className="text-muted-foreground">Compressing 16D perturbation vector to 4D for quantum processing</p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>16D Vector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-1">
              {DEMO_DATA.perturbationVector.map((value, index) => (
                <div key={index} className="bg-muted p-1 rounded text-center text-xs">
                  {value.toFixed(2)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <ArrowRight className="h-8 w-8 text-quantum" />

        {showReduction && (
          <Card className="w-64 card-quantum">
            <CardHeader>
              <CardTitle>4D Vector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_DATA.pcaVector.map((value, index) => (
                  <div key={index} className="bg-quantum/20 p-3 rounded text-center">
                    <div className="text-sm font-mono">{value.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <Button onClick={onComplete} className="w-full mt-4">
                Proceed to Quantum Circuit
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PCAReductionStep;