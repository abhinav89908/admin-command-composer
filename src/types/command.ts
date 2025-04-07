
export type CommandParameter = {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'file';
  description: string;
  required: boolean;
  default?: any;
  value?: any;
  options?: string[]; // For dropdown selections
};

export type CommandOutput = {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'file';
  description: string;
};

export type CommandDefinition = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  parameters: CommandParameter[];
  outputs: CommandOutput[];
  command: string; // The actual command to run
  // For composite commands:
  isComposite?: boolean;
  childCommands?: CommandFlow;
};

export type CommandNode = {
  id: string;
  type: 'command';
  data: {
    command: CommandDefinition;
    parameters: Record<string, any>;
  };
  position: {
    x: number;
    y: number;
  };
};

export type CommandConnection = {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
};

export type CommandFlow = {
  nodes: CommandNode[];
  connections: CommandConnection[];
};

export type CommandExecution = {
  id: string;
  flowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  logs: Array<{
    nodeId: string;
    time: Date;
    message: string;
    level: 'info' | 'warning' | 'error';
  }>;
  results: Record<string, any>;
};
