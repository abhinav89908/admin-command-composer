
# Admin Command Composer

A powerful tool for creating and managing administrative commands, building command flows, and executing them.

## Features

- Command Library: Create, edit and manage command definitions
- Command Composer: Build flows by combining commands
- Saved Flows: Save and reuse command flows
- Executions: Track execution history and results
- Backend API: RESTful API for commands, flows, and executions

## Project Structure

```
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── context/          # Context providers
│   ├── data/             # Sample data 
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # Types (with JSDoc)
│   └── App.js            # Main application
├── server/               # Backend code
│   ├── index.js          # Express server
│   └── package.json      # Server dependencies
└── package.json          # Frontend dependencies
```

## Getting Started

### Running the frontend:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running the backend:

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
npm run dev
```

## Tech Stack

- Frontend: React, JavaScript, Tailwind CSS, shadcn/ui
- Backend: Express, Node.js
- State Management: React Context API, React Query
- Routing: React Router

## API Endpoints

### Commands

- `GET /api/commands` - Get all commands
- `POST /api/commands` - Create a new command
- `GET /api/commands/:id` - Get a command by ID
- `PUT /api/commands/:id` - Update a command
- `DELETE /api/commands/:id` - Delete a command

### Flows

- `GET /api/flows` - Get all flows
- `POST /api/flows` - Create a new flow
- `GET /api/flows/:id` - Get a flow by ID
- `PUT /api/flows/:id` - Update a flow
- `DELETE /api/flows/:id` - Delete a flow

### Executions

- `GET /api/executions` - Get all executions
- `POST /api/execute` - Execute a flow
- `GET /api/executions/:id` - Get execution details
