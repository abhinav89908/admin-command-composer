
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CommandDefinition, CommandFlow, CommandExecution } from '@/types/command';
import { sampleCommands } from '@/data/sampleCommands';
import { toast } from '@/components/ui/sonner';

interface CommandsContextType {
  commands: CommandDefinition[];
  currentFlow: CommandFlow;
  savedFlows: { id: string; name: string; flow: CommandFlow }[];
  executions: CommandExecution[];
  currentExecutionId: string | null;
  
  addCommand: (command: CommandDefinition) => void;
  updateFlow: (flow: CommandFlow) => void;
  saveFlow: (name: string) => string;
  loadFlow: (id: string) => void;
  createNewFlow: () => void;
  executeFlow: () => string;
  getExecutionById: (id: string) => CommandExecution | undefined;
  deleteFlow: (id: string) => void;
}

const CommandsContext = createContext<CommandsContextType | undefined>(undefined);

export const CommandsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commands, setCommands] = useState<CommandDefinition[]>(sampleCommands);
  const [currentFlow, setCurrentFlow] = useState<CommandFlow>({ nodes: [], connections: [] });
  const [savedFlows, setSavedFlows] = useState<{ id: string; name: string; flow: CommandFlow }[]>([]);
  const [executions, setExecutions] = useState<CommandExecution[]>([]);
  const [currentExecutionId, setCurrentExecutionId] = useState<string | null>(null);

  const addCommand = (command: CommandDefinition) => {
    setCommands((prev) => [...prev, command]);
  };

  const updateFlow = (flow: CommandFlow) => {
    setCurrentFlow(flow);
  };

  const saveFlow = (name: string) => {
    const id = Date.now().toString();
    const newFlow = { id, name, flow: currentFlow };
    setSavedFlows((prev) => [...prev, newFlow]);
    toast.success('Flow saved successfully');
    return id;
  };

  const loadFlow = (id: string) => {
    const flow = savedFlows.find(f => f.id === id);
    if (flow) {
      setCurrentFlow(flow.flow);
      toast.info(`Loaded flow: ${flow.name}`);
    }
  };

  const createNewFlow = () => {
    setCurrentFlow({ nodes: [], connections: [] });
  };

  const deleteFlow = (id: string) => {
    setSavedFlows(prev => prev.filter(flow => flow.id !== id));
    toast.info('Flow deleted');
  };

  // Mock execution that will just log steps and simulate running the commands
  const executeFlow = () => {
    const executionId = `exec-${Date.now()}`;
    const execution: CommandExecution = {
      id: executionId,
      flowId: 'current',
      status: 'running',
      startTime: new Date(),
      logs: [],
      results: {},
    };

    setExecutions(prev => [...prev, execution]);
    setCurrentExecutionId(executionId);

    // Simulate execution
    setTimeout(() => {
      const updatedExecution = { ...execution };
      
      currentFlow.nodes.forEach(node => {
        updatedExecution.logs.push({
          nodeId: node.id,
          time: new Date(),
          message: `Executing command: ${node.data.command.name}`,
          level: 'info',
        });
        
        // Simulate some processing time
        updatedExecution.logs.push({
          nodeId: node.id,
          time: new Date(),
          message: `Command executed successfully`,
          level: 'info',
        });
        
        updatedExecution.results[node.id] = {
          output: `Sample output for ${node.data.command.name}`,
          status: 'success',
        };
      });
      
      updatedExecution.status = 'completed';
      updatedExecution.endTime = new Date();
      
      setExecutions(prev => 
        prev.map(e => e.id === executionId ? updatedExecution : e)
      );
      
      toast.success('Flow execution completed');
    }, 2000);

    return executionId;
  };

  const getExecutionById = (id: string) => {
    return executions.find(e => e.id === id);
  };

  const value = {
    commands,
    currentFlow,
    savedFlows,
    executions,
    currentExecutionId,
    addCommand,
    updateFlow,
    saveFlow,
    loadFlow,
    createNewFlow,
    executeFlow,
    getExecutionById,
    deleteFlow,
  };

  return (
    <CommandsContext.Provider value={value}>
      {children}
    </CommandsContext.Provider>
  );
};

export const useCommands = () => {
  const context = useContext(CommandsContext);
  if (context === undefined) {
    throw new Error('useCommands must be used within a CommandsProvider');
  }
  return context;
};
