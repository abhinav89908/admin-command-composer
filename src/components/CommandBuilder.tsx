
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommandLibrary } from '@/components/CommandLibrary';
import { CommandForm } from '@/components/CommandForm';
import { CommandNode } from '@/components/CommandNode';
import { useCommands } from '@/context/CommandsContext';
import { CommandDefinition } from '@/types/command';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Play, Save, X, Settings } from 'lucide-react';

export const CommandBuilder: React.FC = () => {
  const { commands, currentFlow, updateFlow, saveFlow, executeFlow } = useCommands();
  const [flowName, setFlowName] = useState('New Flow');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addNodeToFlow = (command: CommandDefinition) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'command',
      data: {
        command,
        parameters: command.parameters.reduce((acc, param) => ({
          ...acc,
          [param.id]: param.default || ''
        }), {})
      },
      position: {
        x: 250,
        y: currentFlow.nodes.length * 150
      }
    };
    
    updateFlow({
      ...currentFlow,
      nodes: [...currentFlow.nodes, newNode]
    });
    
    setSidebarOpen(false);
  };

  const updateNodeParameters = (nodeId: string, parameters: Record<string, any>) => {
    updateFlow({
      ...currentFlow,
      nodes: currentFlow.nodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, parameters } } 
          : node
      )
    });
    setSelectedNode(null);
  };

  const removeNode = (nodeId: string) => {
    updateFlow({
      ...currentFlow,
      nodes: currentFlow.nodes.filter(node => node.id !== nodeId),
      connections: currentFlow.connections.filter(
        conn => conn.source !== nodeId && conn.target !== nodeId
      )
    });
  };

  const handleSave = () => {
    saveFlow(flowName);
  };

  const handleExecute = () => {
    executeFlow();
  };

  // Selected node data for editing
  const selectedNodeData = currentFlow.nodes.find(node => node.id === selectedNode);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Command Composer</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {flowName}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Flow Name</h4>
                <Input
                  value={flowName}
                  onChange={(e) => setFlowName(e.target.value)}
                  placeholder="Enter flow name"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex space-x-2">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Add Command
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[600px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Command Library</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100vh-100px)] overflow-y-auto py-4">
                <div className="grid grid-cols-2 gap-4">
                  {commands.map((command) => (
                    <Card 
                      key={command.id}
                      className="p-4 hover:border-adminAccent-500 cursor-pointer transition-colors"
                      onClick={() => addNodeToFlow(command)}
                    >
                      <h3 className="font-medium text-sm">{command.name}</h3>
                      <p className="text-xs text-muted-foreground">{command.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
          <Button size="sm" onClick={handleExecute}>
            <Play className="mr-1 h-4 w-4" />
            Execute
          </Button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto bg-slate-50 dark:bg-slate-900 rounded-lg border p-4">
        <div className="min-h-full">
          {currentFlow.nodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="mb-4 p-4 rounded-full bg-slate-100 dark:bg-slate-800">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Add Commands to Your Flow</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Click the "Add Command" button to start building your command flow.
              </p>
              <Button onClick={() => setSidebarOpen(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add Command
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentFlow.nodes.map((node) => (
                <div key={node.id} className="flex items-center space-x-4">
                  <CommandNode 
                    command={node.data.command}
                    parameters={node.data.parameters}
                    onEdit={() => setSelectedNode(node.id)}
                    onDelete={() => removeNode(node.id)}
                  />
                  <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Command Parameters</DialogTitle>
          </DialogHeader>
          {selectedNodeData && (
            <div className="space-y-4">
              <h3 className="font-medium">{selectedNodeData.data.command.name}</h3>
              <div className="space-y-3">
                {selectedNodeData.data.command.parameters.map((param) => (
                  <div key={param.id} className="space-y-1">
                    <Label htmlFor={param.id}>
                      {param.name} {param.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id={param.id}
                      value={selectedNodeData.data.parameters[param.id] || ''}
                      onChange={(e) => {
                        const updatedParams = {
                          ...selectedNodeData.data.parameters,
                          [param.id]: e.target.value
                        };
                        updateNodeParameters(selectedNodeData.id, updatedParams);
                      }}
                      placeholder={param.description}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setSelectedNode(null)}>
                  Save Parameters
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
