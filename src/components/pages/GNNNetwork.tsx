import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Network, 
  ChevronLeft, 
  Info,
  Users,
  ArrowRight
} from 'lucide-react';
import { DEMO_DATA } from '@/data/mockData';

interface GNNNetworkProps {
  onNext: (page: string) => void;
}

const GNNNetwork: React.FC<GNNNetworkProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { networkGraph } = DEMO_DATA;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Position nodes in a circular layout
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.3;

    const normalNodes = networkGraph.nodes.filter(n => n.type !== 'suspicious');
    const nodePositions: { [key: string]: { x: number, y: number } } = {};

    // Position normal nodes in a circle
    normalNodes.forEach((node, index) => {
      const angle = (index / normalNodes.length) * 2 * Math.PI;
      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      };
    });

    // Draw edges first
    networkGraph.edges.forEach(edge => {
      if (edge.suspicious) return; // Skip suspicious edges for now
      
      const sourcePos = nodePositions[edge.source];
      const targetPos = nodePositions[edge.target];
      
      if (sourcePos && targetPos) {
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.strokeStyle = '#4B5563';
        ctx.lineWidth = Math.sqrt(edge.value / 1000);
        ctx.stroke();
      }
    });

    // Draw nodes
    networkGraph.nodes.forEach(node => {
      if (node.type === 'suspicious') return; // Skip suspicious nodes for now
      
      const pos = nodePositions[node.id];
      if (!pos) return;

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, node.type === 'primary' ? 12 : 8, 0, 2 * Math.PI);
      ctx.fillStyle = node.type === 'primary' ? '#0EA5E9' : '#6B7280';
      ctx.fill();
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#F9FAFB';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(node.id, pos.x, pos.y + 25);
    });

  }, [networkGraph]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground">GNN: Learned Account Network</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GNN learns the structure of normal activity — relationships are the signal.
          </p>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="card-quantum">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-quantum" />
                <span>Account Relationship Graph</span>
                <Badge variant="outline" className="text-safe border-safe/50">
                  Normal Activity
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 rounded-lg bg-background-secondary border border-border/50"
                />
                
                {/* Interactive tooltip overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-quantum"></div>
                    <span className="text-muted-foreground">Primary Account</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                    <span className="text-muted-foreground">Regular Accounts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Network Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-card to-background-secondary">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-quantum mx-auto mb-2" />
              <h3 className="font-semibold text-lg">{networkGraph.nodes.filter(n => n.type !== 'suspicious').length}</h3>
              <p className="text-sm text-muted-foreground">Connected Accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-background-secondary">
            <CardContent className="p-6 text-center">
              <ArrowRight className="h-8 w-8 text-neural mx-auto mb-2" />
              <h3 className="font-semibold text-lg">{networkGraph.edges.filter(e => !e.suspicious).length}</h3>
              <p className="text-sm text-muted-foreground">Normal Transfers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-background-secondary">
            <CardContent className="p-6 text-center">
              <Network className="h-8 w-8 text-safe mx-auto mb-2" />
              <h3 className="font-semibold text-lg">Learned</h3>
              <p className="text-sm text-muted-foreground">Network Structure</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-quantum/10 to-neural/10 border-quantum/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-quantum mt-0.5" />
                <div>
                  <h3 className="font-semibold text-quantum mb-2">How GNN Works</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Graph Neural Network learns from transaction patterns to understand normal 
                    account relationships. Each node represents an account, and edges show transfer 
                    relationships. This learned structure becomes the baseline for detecting unusual activity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-between"
        >
          <Button
            variant="outline"
            onClick={() => onNext('history')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>

          <Button
            onClick={() => onNext('fraud-ring')}
            className="bg-gradient-to-r from-quantum to-neural text-white hover:opacity-90"
          >
            See Fraud Detection
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GNNNetwork;