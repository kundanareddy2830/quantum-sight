import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Database, AlertCircle } from 'lucide-react';
import { mockTransactions } from '@/data/mockData';

interface DataInputStepProps {
  onComplete: () => void;
  onNext: (nextStep: string) => void;
  isCompleted: boolean;
}

const DataInputStep: React.FC<DataInputStepProps> = ({ onComplete, onNext, isCompleted }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const handleTransactionSelect = (txId: string) => {
    setSelectedTransaction(txId);
  };

  const handleSimulateNew = () => {
    setSelectedTransaction('TX-1001');
  };

  const handleProceed = () => {
    onComplete();
  };

  return (
    <div className="h-full p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-quantum/10 rounded-lg">
            <Database className="h-6 w-6 text-quantum" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Data Input</h1>
            <p className="text-muted-foreground">Select a transaction to analyze for fraud detection</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction Table */}
        <div className="lg:col-span-2">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Recent Transactions</span>
                <Badge variant="outline" className="text-quantum border-quantum/50">
                  {mockTransactions.length} transactions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.slice(0, 8).map((tx) => (
                      <TableRow 
                        key={tx.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedTransaction === tx.id ? 'bg-quantum/10 border-quantum' : ''
                        }`}
                        onClick={() => handleTransactionSelect(tx.id)}
                      >
                        <TableCell className="font-mono text-sm">{tx.time}</TableCell>
                        <TableCell className="font-mono">{tx.from}</TableCell>
                        <TableCell className="font-mono">{tx.to}</TableCell>
                        <TableCell className="font-semibold">${tx.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tx.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={tx.status === 'Normal' ? 'secondary' : 'destructive'}>
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Simulate New Transaction */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Simulate New Transaction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-warning">Suspicious Activity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A new transaction cluster has been detected showing signs of coordinated activity.
                </p>
              </div>
              <Button 
                onClick={handleSimulateNew}
                className="w-full"
                variant="outline"
              >
                <Play className="h-4 w-4 mr-2" />
                Simulate New Transaction
              </Button>
            </CardContent>
          </Card>

          {/* Selected Transaction Details */}
          {selectedTransaction && (
            <Card className="card-quantum">
              <CardHeader>
                <CardTitle className="text-lg">Selected Transaction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono">{selectedTransaction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold">$5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="destructive">Suspicious</Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceed}
                  className="w-full"
                >
                  Analyze Transaction
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click on any transaction to select it</li>
                <li>• Use "Simulate New" to create a suspicious transaction</li>
                <li>• Selected transactions will be analyzed through the pipeline</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataInputStep;