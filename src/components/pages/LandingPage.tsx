import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  BarChart3, 
  BrainCircuit, 
  Zap, 
  Shield, 
  Network,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onNext: (page: string) => void;
  onStartAnalysis: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext, onStartAnalysis }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-quantum/20 blur-3xl rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <BrainCircuit className="h-20 w-20 mx-auto text-quantum relative z-10" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-quantum via-neural to-quantum bg-clip-text text-transparent">
            Project Foresight
          </h1>
          
          <h2 className="text-2xl text-muted-foreground">
            Hybrid Fraud Forecast
          </h2>
          
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Watch a transaction enter the system — we detect anomalies and forecast risk 
            using Graph Neural Networks enhanced with Quantum Computing.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <Card className="card-quantum border-quantum/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-quantum" />
                <CardTitle className="text-lg">GNN Detection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learns account relationships and spots unusual network structures
              </p>
            </CardContent>
          </Card>

          <Card className="card-neural border-neural/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-neural" />
                <CardTitle className="text-lg">Quantum Enhancement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Quantum circuits find hidden correlations classical methods miss
              </p>
            </CardContent>
          </Card>

          <Card className="card-danger border-danger/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-danger" />
                <CardTitle className="text-lg">Risk Forecast</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Produces clear probability forecasts for informed decisions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button
            size="lg"
            onClick={() => onNext('history')}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Show History
          </Button>
          
          <Button
            size="lg"
            onClick={onStartAnalysis}
            className="bg-gradient-to-r from-quantum to-neural text-white hover:opacity-90"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Demo
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 pt-8 border-t border-border/50"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="text-safe border-safe/50">
              Detects new fraud rings
            </Badge>
            <Badge variant="outline" className="text-quantum border-quantum/50">
              Produces clear probability
            </Badge>
            <Badge variant="outline" className="text-neural border-neural/50">
              Works without prior fraud examples
            </Badge>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;