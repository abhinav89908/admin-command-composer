
import React, { createContext, useContext, useState } from 'react';
import { sampleCommands } from '../data/sampleCommands';
import { toast } from 'sonner';

const CommandsContext = createContext(undefined);

export const CommandsProvider = ({ children }) => {
  const [commands, setCommands] = useState(sampleCommands);
  const [currentFlow, setCurrentFlow] = useState({ nodes: [], connections: [] });
  const [savedFlows, setSavedFlows] = useState([]);
  const [executions, setExecutions] = useState([]);
  const [currentExecutionId, setCurrentExecutionId] = useState(null);

  const addCommand = (command) => {
    setCommands((prev) => [...prev, command]);
  };

  const updateFlow = (flow) => {
    setCurrentFlow(flow);
  };

  const saveFlow = (name) => {
    const id = Date.now().toString();
    const newFlow = { id, name, flow: currentFlow };
    setSavedFlows((prev) => [...prev, newFlow]);
    toast.success('Flow saved successfully');
    return id;
  };

  const loadFlow = (id) => {
    const flow = savedFlows.find(f => f.id === id);
    if (flow) {
      setCurrentFlow(flow.flow);
      toast.info(`Loaded flow: ${flow.name}`);
    }
  };

  const createNewFlow = () => {
    setCurrentFlow({ nodes: [], connections: [] });
  };

  const deleteFlow = (id) => {
    setSavedFlows(prev => prev.filter(flow => flow.id !== id));
    toast.info('Flow deleted');
  };

  // Mock execution that will just log steps and simulate running the commands
  const executeFlow = () => {
    const executionId = `exec-${Date.now()}`;
    const execution = {
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

  const getExecutionById = (id) => {
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
