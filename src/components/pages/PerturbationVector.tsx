import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { 
  Network, 
  BarChart3, 
  Zap,
  Target
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface PerturbationVectorProps {
  onNext: (page: string) => void;
  isAutoPlaying?: boolean;
}

const PerturbationVector: React.FC<PerturbationVectorProps> = ({ 
  onNext, 
  isAutoPlaying 
}) => {
  const [showVector, setShowVector] = useState(false);
  const { perturbationVector, networkGraph } = DEMO_DATA;

  // Prepare bar chart data
  const vectorData = perturbationVector.map((value, index) => ({
    index: index + 1,
    value: value,
    abs: Math.abs(value)
  }));

  useEffect(() => {
    const timer = setTimeout(() => setShowVector(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isAutoPlaying && showVector) {
      const timer = setTimeout(() => onNext('pca'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showVector, onNext]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">GNN Creates Perturbation Vector</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The perturbation vector summarizes how this account differs from normal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left: Network with Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-neural">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-neural" />
                  <span>GNN Isolated Suspicious Nodes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Network visualization placeholder */}
                  <div className="aspect-square bg-background-secondary rounded-lg p-6 flex items-center justify-center relative border border-border/50">
                    <div className="relative w-full h-full">
                      {/* Normal nodes (muted) */}
                      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-muted-foreground rounded-full opacity-50"></div>
                      
                      {/* Primary account */}
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-quantum rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                      
                      {/* Suspicious nodes (highlighted) */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="absolute top-1/2 right-1/4 w-4 h-4 bg-danger rounded-full animate-glow"
                      ></motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                        className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-danger rounded-full animate-glow"
                      ></motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4, type: "spring" }}
                        className="absolute bottom-1/4 right-1/2 w-4 h-4 bg-danger rounded-full animate-glow"
                      ></motion.div>

                      {/* Connection lines to suspicious nodes */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.line
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.6, duration: 0.5 }}
                          x1="50%" y1="50%"
                          x2="75%" y2="50%"
                          stroke="rgb(239, 68, 68)"
                          strokeWidth="2"
                          strokeDasharray="4,4"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>
                    
                    {/* Callout arrow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 }}
                      className="absolute top-4 right-4 flex items-center space-x-2"
                    >
                      <Target className="h-5 w-5 text-danger" />
                      <span className="text-sm text-danger font-semibold">GNN isolated these nodes as unusual</span>
                    </motion.div>
                  </div>

                  {/* Suspicious Accounts List */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Flagged Accounts:</h4>
                    {networkGraph.nodes.filter(n => n.type === 'suspicious').map((node, index) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.2 + index * 0.1 }}
                        className="flex items-center justify-between p-2 bg-danger/10 border border-danger/30 rounded text-sm"
                      >
                        <span className="font-mono">{node.id}</span>
                        <Badge className="bg-danger/20 text-danger text-xs">
                          Flagged
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Perturbation Vector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-quantum" />
                  <span>16D Perturbation Vector</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showVector ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  {/* Bar Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vectorData}>
                        <XAxis 
                          dataKey="index" 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#9CA3AF' }}
                          axisLine={{ stroke: '#374151' }}
                        />
                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                          {vectorData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.value > 0 ? '#0EA5E9' : '#EF4444'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Numeric Array Display */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Vector Values:</h4>
                    <div className="p-3 bg-background-secondary rounded-lg border border-border/50">
                      <code className="text-xs text-muted-foreground break-all">
                        [{perturbationVector.map(v => v.toFixed(2)).join(', ')}]
                      </code>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-3 bg-quantum/10 border border-quantum/30 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-quantum">Numerical fingerprint:</strong> This 16-dimensional vector 
                      captures how the suspicious account's embedding differs from the normal baseline. 
                      Positive values indicate stronger connections, negative values show unusual isolation.
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && showVector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Badge className="animate-pulse bg-quantum/20 text-quantum border-quantum/50">
              <Zap className="h-3 w-3 mr-1" />
              Proceeding to dimensionality reduction...
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PerturbationVector;