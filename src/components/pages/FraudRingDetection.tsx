import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Zap, 
  ArrowRight,
  Target,
  Clock
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface FraudRingDetectionProps {
  onNext: (page: string) => void;
  onStartAnalysis: () => void;
  isAutoPlaying?: boolean;
}

const FraudRingDetection: React.FC<FraudRingDetectionProps> = ({ 
  onNext, 
  onStartAnalysis, 
  isAutoPlaying 
}) => {
  const [showCluster, setShowCluster] = useState(false);
  const { fraudRing, suspiciousTransaction } = DEMO_DATA;

  useEffect(() => {
    const timer = setTimeout(() => setShowCluster(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance after showing the cluster
  useEffect(() => {
    if (isAutoPlaying && showCluster) {
      const timer = setTimeout(() => onNext('perturbation'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, showCluster, onNext]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">New Transaction Cluster Detected</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A coordinated cluster (suspected fraud ring) just appeared — we'll analyze it.
          </p>
        </motion.div>

        {/* Main Detection Card */}
        <AnimatePresence>
          {showCluster && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                damping: 15
              }}
            >
              <Card className="card-danger">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-danger animate-pulse" />
                    <span>Suspicious Transaction Cluster</span>
                    <Badge className="bg-danger/20 text-danger border-danger/50">
                      High Priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Primary Transaction */}
                  <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg">
                    <h3 className="font-semibold text-danger mb-3 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Primary Transaction
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">ID:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">From:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.from}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">To:</span>
                        <p className="font-mono font-semibold">{suspiciousTransaction.to}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-semibold text-danger">${suspiciousTransaction.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coordinated Cluster */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-warning flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Coordinated Ring Activity
                    </h3>
                    <div className="grid gap-3">
                      {fraudRing.map((tx, index) => (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                          className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Clock className="h-4 w-4 text-warning" />
                            <span className="text-sm text-muted-foreground">{tx.time}</span>
                            <span className="font-mono text-sm">{tx.from} → {tx.to}</span>
                          </div>
                          <span className="font-semibold text-warning">${tx.amount.toLocaleString()}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Analysis Trigger */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Ready for Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Pattern detected: Rapid sequential transfers with decreasing amounts
                        </p>
                      </div>
                      
                      {!isAutoPlaying && (
                        <Button
                          onClick={() => onNext('perturbation')}
                          className="bg-gradient-to-r from-quantum to-neural text-white hover:opacity-90"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Analyze
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-play indicator */}
        {isAutoPlaying && showCluster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Badge className="animate-pulse bg-quantum/20 text-quantum border-quantum/50">
              <Zap className="h-3 w-3 mr-1" />
              Auto-analyzing...
            </Badge>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FraudRingDetection;