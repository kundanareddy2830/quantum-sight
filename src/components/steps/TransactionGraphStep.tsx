import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Zap, Users } from 'lucide-react';
import { mockNetworkData } from '@/data/mockData';

interface TransactionGraphStepProps {
  onComplete: () => void;
  onNext: (nextStep: string) => void;
  isCompleted: boolean;
}

const TransactionGraphStep: React.FC<TransactionGraphStepProps> = ({ onComplete, onNext, isCompleted }) => {
  const [animationState, setAnimationState] = useState<'loading' | 'normal' | 'anomaly'>('loading');

  useEffect(() => {
    // Simulate loading then show normal network
    const timer1 = setTimeout(() => setAnimationState('normal'), 1000);
    const timer2 = setTimeout(() => setAnimationState('anomaly'), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleProceed = () => {
    onComplete();
  };

  return (
    <div className="h-full p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-quantum/10 rounded-lg">
            <Network className="h-6 w-6 text-quantum" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Network Graph</h1>
            <p className="text-muted-foreground">Interactive visualization of account connections and transaction flows</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Network Visualization */}
        <div className="lg:col-span-3">
          <Card className="card-gradient h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Network Visualization</span>
                <Badge variant={animationState === 'anomaly' ? 'destructive' : 'secondary'}>
                  {animationState === 'loading' ? 'Loading...' : 
                   animationState === 'normal' ? 'Normal Activity' : 'Anomaly Detected'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-6">
              <div className="relative w-full h-full bg-background-secondary rounded-lg overflow-hidden">
                {/* Simulated Network Graph */}
                <svg className="w-full h-full" viewBox="0 0 800 500">
                  {/* Normal connections (edges) */}
                  {mockNetworkData.edges.map((edge, index) => (
                    <line
                      key={`edge-${index}`}
                      x1={edge.source.x}
                      y1={edge.source.y}
                      x2={edge.target.x}
                      y2={edge.target.y}
                      stroke={edge.suspicious ? "#ef4444" : "#64748b"}
                      strokeWidth={edge.suspicious ? "3" : "1"}
                      opacity={animationState === 'loading' ? 0.3 : 
                              edge.suspicious && animationState === 'anomaly' ? 1 : 0.6}
                      className={edge.suspicious && animationState === 'anomaly' ? 'animate-pulse' : ''}
                    />
                  ))}
                  
                  {/* Account nodes */}
                  {mockNetworkData.nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.suspicious ? 12 : 8}
                        fill={node.suspicious ? "#ef4444" : 
                              node.important ? "#06b6d4" : "#64748b"}
                        opacity={animationState === 'loading' ? 0.5 : 1}
                        className={node.suspicious && animationState === 'anomaly' ? 'animate-pulse' : ''}
                      />
                      <text
                        x={node.x}
                        y={node.y + 25}
                        textAnchor="middle"
                        className="fill-foreground text-xs font-mono"
                        opacity={0.8}
                      >
                        {node.id}
                      </text>
                    </g>
                  ))}
                  
                  {/* Highlight suspicious cluster when anomaly detected */}
                  {animationState === 'anomaly' && (
                    <circle
                      cx="650"
                      cy="150"
                      r="60"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                  )}
                </svg>

                {/* Loading overlay */}
                {animationState === 'loading' && (
                  <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-quantum mx-auto"></div>
                      <p className="text-sm text-muted-foreground">Building network graph...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Network Statistics */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Network Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Accounts:</span>
                  <span className="font-semibold">{mockNetworkData.nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Connections:</span>
                  <span className="font-semibold">{mockNetworkData.edges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suspicious:</span>
                  <span className="font-semibold text-destructive">
                    {mockNetworkData.nodes.filter(n => n.suspicious).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graph Analysis */}
          {animationState === 'anomaly' && (
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Anomaly Detected</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm">
                    <strong>Fraud Ring Detected:</strong> Coordinated cluster of 4 accounts 
                    showing rapid, circular transaction patterns.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Level:</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cluster Size:</span>
                    <span>4 accounts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pattern:</span>
                    <span>Circular</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceed}
                  className="w-full"
                >
                  Analyze with GNN
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Graph Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-muted"></div>
                  <span>Normal Account</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-quantum"></div>
                  <span>Important Hub</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Suspicious Account</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-px bg-destructive"></div>
                  <span>Fraud Connection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionGraphStep;