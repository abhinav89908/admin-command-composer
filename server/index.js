
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with database in production)
let commands = [];
let flows = [];
let executions = [];

// Load sample commands
const sampleCommands = [
  {
    id: "fetch-data",
    name: "Fetch Data",
    description: "Fetch data from an API endpoint",
    category: "Data",
    parameters: [
      {
        id: "url",
        name: "URL",
        type: "string",
        description: "API endpoint URL",
        required: true,
        default: "https://api.example.com/data"
      },
      {
        id: "method",
        name: "Method",
        type: "string",
        description: "HTTP method",
        required: true,
        default: "GET",
        options: ["GET", "POST", "PUT", "DELETE"]
      },
    ],
    outputs: [
      {
        id: "response",
        name: "Response",
        type: "object",
        description: "API response"
      },
    ],
    command: "curl -X {method} {url}"
  },
  // Add more sample commands here
];

commands = sampleCommands;

// Command routes
app.get('/api/commands', (req, res) => {
  res.json(commands);
});

app.post('/api/commands', (req, res) => {
  const newCommand = {
    ...req.body,
    id: req.body.id || uuidv4(),
  };
  
  commands.push(newCommand);
  res.status(201).json(newCommand);
});

app.get('/api/commands/:id', (req, res) => {
  const command = commands.find(cmd => cmd.id === req.params.id);
  
  if (!command) {
    return res.status(404).json({ error: 'Command not found' });
  }
  
  res.json(command);
});

app.put('/api/commands/:id', (req, res) => {
  const index = commands.findIndex(cmd => cmd.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Command not found' });
  }
  
  commands[index] = { ...commands[index], ...req.body };
  res.json(commands[index]);
});

app.delete('/api/commands/:id', (req, res) => {
  const index = commands.findIndex(cmd => cmd.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Command not found' });
  }
  
  commands.splice(index, 1);
  res.status(204).send();
});

// Flow routes
app.get('/api/flows', (req, res) => {
  res.json(flows);
});

app.post('/api/flows', (req, res) => {
  const newFlow = {
    ...req.body,
    id: req.body.id || uuidv4(),
  };
  
  flows.push(newFlow);
  res.status(201).json(newFlow);
});

app.get('/api/flows/:id', (req, res) => {
  const flow = flows.find(f => f.id === req.params.id);
  
  if (!flow) {
    return res.status(404).json({ error: 'Flow not found' });
  }
  
  res.json(flow);
});

app.put('/api/flows/:id', (req, res) => {
  const index = flows.findIndex(f => f.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Flow not found' });
  }
  
  flows[index] = { ...flows[index], ...req.body };
  res.json(flows[index]);
});

app.delete('/api/flows/:id', (req, res) => {
  const index = flows.findIndex(f => f.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Flow not found' });
  }
  
  flows.splice(index, 1);
  res.status(204).send();
});

// Execution routes
app.get('/api/executions', (req, res) => {
  res.json(executions);
});

app.post('/api/execute', (req, res) => {
  const { flowId } = req.body;
  const flow = flows.find(f => f.id === flowId);
  
  if (!flow) {
    return res.status(404).json({ error: 'Flow not found' });
  }
  
  // Create a new execution
  const execution = {
    id: uuidv4(),
    flowId,
    status: 'running',
    startTime: new Date(),
    logs: [],
    results: {},
  };
  
  executions.push(execution);
  
  // Simulate execution (would be async in real application)
  setTimeout(() => {
    const index = executions.findIndex(e => e.id === execution.id);
    
    if (index !== -1) {
      // Update execution with results
      flow.flow.nodes.forEach(node => {
        executions[index].logs.push({
          nodeId: node.id,
          time: new Date(),
          message: `Executing command: ${node.data.command.name}`,
          level: 'info',
        });
        
        executions[index].logs.push({
          nodeId: node.id,
          time: new Date(),
          message: `Command executed successfully`,
          level: 'info',
        });
        
        executions[index].results[node.id] = {
          output: `Sample output for ${node.data.command.name}`,
          status: 'success',
        };
      });
      
      executions[index].status = 'completed';
      executions[index].endTime = new Date();
    }
  }, 2000);
  
  res.status(202).json(execution);
});

app.get('/api/executions/:id', (req, res) => {
  const execution = executions.find(e => e.id === req.params.id);
  
  if (!execution) {
    return res.status(404).json({ error: 'Execution not found' });
  }
  
  res.json(execution);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
