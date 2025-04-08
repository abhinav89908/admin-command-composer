
import React, { useState } from 'react';
import { useCommands } from '../context/CommandsContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { CommandForm } from './CommandForm';
import { CommandNode } from './CommandNode';
import { Search, Plus, Save, Trash } from 'lucide-react';
import { toast } from 'sonner';

export const CommandBuilder = () => {
  const { commands, currentFlow, updateFlow, saveFlow } = useCommands();
  const [searchTerm, setSearchTerm] = useState('');
  const [flowName, setFlowName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const addNodeToFlow = (command) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'command', // Ensure this is a string literal 'command'
      data: {
        command,
        parameters: command.parameters.reduce((acc, param) => ({
          ...acc,
          [param.id]: param.default || ''
        }), {})
      },
      position: { x: 100, y: 100 + (currentFlow.nodes.length * 100) }
    };
    
    updateFlow({
      ...currentFlow,
      nodes: [...currentFlow.nodes, newNode]
    });
    
    toast.success(`Added ${command.name} to flow`);
  };
  
  const removeNodeFromFlow = (nodeId) => {
    // Remove node and any connections that involve this node
    updateFlow({
      nodes: currentFlow.nodes.filter(node => node.id !== nodeId),
      connections: currentFlow.connections.filter(
        conn => conn.source !== nodeId && conn.target !== nodeId
      )
    });
    
    toast.info("Node removed from flow");
  };
  
  const handleSaveFlow = () => {
    if (flowName.trim() === '') {
      toast.error('Please enter a flow name');
      return;
    }
    
    if (currentFlow.nodes.length === 0) {
      toast.error('Cannot save empty flow');
      return;
    }
    
    saveFlow(flowName);
    setShowSaveDialog(false);
    setFlowName('');
  };
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Command Palette */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Command Palette</h2>
          
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search commands..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-250px)] space-y-2">
            {filteredCommands.map(command => (
              <Card 
                key={command.id}
                className="cursor-pointer hover:border-adminAccent-500"
                onClick={() => addNodeToFlow(command)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{command.name}</h3>
                      <p className="text-xs text-muted-foreground">{command.description}</p>
                    </div>
                    <Plus className="h-4 w-4 text-adminAccent-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Command
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Command</DialogTitle>
                </DialogHeader>
                <CommandForm onSave={(newCommand) => {
                  addNodeToFlow(newCommand);
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Flow Builder */}
        <div className="col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold">Flow Builder</h2>
            
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <Button variant="default" disabled={currentFlow.nodes.length === 0}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Flow
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Flow</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input 
                    placeholder="Flow name" 
                    value={flowName} 
                    onChange={(e) => setFlowName(e.target.value)} 
                  />
                  <Button onClick={handleSaveFlow} className="w-full">Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="min-h-[500px] border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
            {currentFlow.nodes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-muted-foreground mb-2">Add commands from the palette to build your flow</p>
                <p className="text-xs text-muted-foreground">Drag and drop commands to arrange them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentFlow.nodes.map(node => (
                  <div key={node.id} className="flex items-start gap-2">
                    <div className="min-w-max">
                      <CommandNode 
                        command={node.data.command} 
                        parameters={node.data.parameters}
                        onDelete={() => removeNodeFromFlow(node.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
