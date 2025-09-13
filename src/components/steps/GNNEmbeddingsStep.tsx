import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, BarChart3, Minus } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface GNNEmbeddingsStepProps {
  onComplete: () => void;
  onNext: (nextStep: string) => void;
  isCompleted: boolean;
}

const GNNEmbeddingsStep: React.FC<GNNEmbeddingsStepProps> = ({ onComplete, onNext, isCompleted }) => {
  const [progress, setProgress] = useState(0);
  const [showEmbeddings, setShowEmbeddings] = useState(false);
  const [showPerturbation, setShowPerturbation] = useState(false);

  // Mock embeddings for visualization
  const normalEmbedding = [0.25, 0.18, 0.32, 0.45, 0.12, 0.28, 0.35, 0.22, 0.19, 0.41, 0.15, 0.33, 0.28, 0.39, 0.24, 0.17];
  const anomalousEmbedding = [0.37, 0.11, 0.36, 0.65, 0.11, 0.33, 0.44, 0.20, 0.22, 0.52, 0.09, 0.35, 0.28, 0.47, 0.30, 0.14];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setShowEmbeddings(true);
          setTimeout(() => setShowPerturbation(true), 2000);
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    onComplete();
  };

  return (
    <div className="h-full p-8 space-y-8 overflow-y-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-quantum/10 rounded-lg">
            <BrainCircuit className="h-6 w-6 text-quantum" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">GNN Embeddings & Perturbation Vector</h1>
            <p className="text-muted-foreground">Creating numerical fingerprints and computing the difference to identify anomalies</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Progress */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>GNN Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Creating embeddings...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            {progress < 100 && (
              <p className="text-sm text-muted-foreground">
                GNN is learning the structural patterns of normal vs suspicious accounts
              </p>
            )}
          </CardContent>
        </Card>

        {/* Embeddings Comparison */}
        {showEmbeddings && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Normal Embedding */}
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-success" />
                  <span>Normal Account Embedding</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-8 gap-1">
                    {normalEmbedding.map((value, index) => (
                      <div
                        key={index}
                        className="bg-success/20 rounded px-2 py-1 text-center"
                      >
                        <div className="text-xs text-muted-foreground">{index + 1}</div>
                        <div className="text-sm font-mono">{value.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Represents the learned features of a typical, well-connected account
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Anomalous Embedding */}
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-destructive" />
                  <span>Suspicious Account Embedding</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-8 gap-1">
                    {anomalousEmbedding.map((value, index) => (
                      <div
                        key={index}
                        className="bg-destructive/20 rounded px-2 py-1 text-center"
                      >
                        <div className="text-xs text-muted-foreground">{index + 1}</div>
                        <div className="text-sm font-mono">{value.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shows unusual patterns - different connection behavior
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Perturbation Vector */}
        {showPerturbation && (
          <Card className="card-quantum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minus className="h-5 w-5" />
                <span>Perturbation Vector (Difference)</span>
                <Badge variant="outline" className="text-quantum border-quantum/50">
                  16D → Anomaly Fingerprint
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mathematical Operation */}
              <div className="flex items-center justify-center space-x-4 p-4 bg-background-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Suspicious</span>
                <Minus className="h-4 w-4 text-quantum" />
                <span className="text-sm text-muted-foreground">Normal</span>
                <span className="text-sm text-quantum">=</span>
                <span className="text-sm font-semibold text-quantum">Perturbation Vector</span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="space-y-4">
                <h4 className="font-semibold">Perturbation Vector Components</h4>
                <div className="grid grid-cols-8 gap-2">
                  {DEMO_DATA.perturbationVector.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{index + 1}</div>
                      <div className="relative h-16 bg-muted rounded flex items-end justify-center">
                        <div 
                          className={`w-full rounded ${value >= 0 ? 'bg-quantum' : 'bg-destructive'}`}
                          style={{ 
                            height: `${Math.abs(value) * 200}%`,
                            minHeight: '2px'
                          }}
                        />
                      </div>
                      <div className="text-xs font-mono mt-1">
                        {value.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Numerical Array */}
              <div className="p-4 bg-background-secondary rounded-lg">
                <h4 className="font-semibold mb-2">Raw Vector Values</h4>
                <div className="font-mono text-sm break-all">
                  [{DEMO_DATA.perturbationVector.map(v => v.toFixed(2)).join(', ')}]
                </div>
              </div>

              {/* Explanation */}
              <div className="p-4 bg-quantum/10 border border-quantum/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-quantum">What This Means</h4>
                <p className="text-sm text-muted-foreground">
                  This 16-dimensional vector captures exactly how the suspicious account differs 
                  from normal patterns. Positive values show where it's higher than normal, 
                  negative values show where it's lower. This becomes our "anomaly fingerprint."
                </p>
              </div>

              <Button 
                onClick={handleProceed}
                className="w-full"
              >
                Proceed to PCA Reduction
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GNNEmbeddingsStep;