import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface RiskVerdictStepProps {
  onComplete: () => void;
}

const RiskVerdictStep: React.FC<RiskVerdictStepProps> = ({ onComplete }) => {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-quantum/10 rounded-lg">
          <Shield className="h-6 w-6 text-quantum" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Final Risk Verdict</h1>
          <p className="text-muted-foreground">Probability distribution and recommended action</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Probability Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>High Risk (Account Takeover)</span>
                <Badge variant="destructive">{DEMO_DATA.vqeResults.confidence}</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-destructive h-3 rounded-full" 
                  style={{ width: `${DEMO_DATA.vqeResults.probabilities["01"] * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-quantum">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Recommendation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-warning">
                🚨 FRAUD DETECTED
              </div>
              <p className="text-lg font-semibold">
                {DEMO_DATA.vqeResults.verdict}
              </p>
              <p className="text-muted-foreground">
                {DEMO_DATA.vqeResults.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskVerdictStep;