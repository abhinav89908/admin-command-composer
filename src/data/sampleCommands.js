
/**
 * Sample commands for demonstration
 * @type {import('../types/command').CommandDefinition[]}
 */
export const sampleCommands = [
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
      {
        id: "headers",
        name: "Headers",
        type: "object",
        description: "HTTP headers",
        required: false,
        default: '{}'
      }
    ],
    outputs: [
      {
        id: "response",
        name: "Response",
        type: "object",
        description: "API response"
      },
      {
        id: "status",
        name: "Status",
        type: "number",
        description: "HTTP status code"
      }
    ],
    command: "curl -X {method} {url} -H {headers}"
  },
  {
    id: "transform-data",
    name: "Transform Data",
    description: "Transform data using jq-like syntax",
    category: "Data",
    parameters: [
      {
        id: "input",
        name: "Input",
        type: "object",
        description: "Input data to transform",
        required: true,
        default: "{}"
      },
      {
        id: "transformation",
        name: "Transformation",
        type: "string",
        description: "jq-like transformation",
        required: true,
        default: ".[]"
      }
    ],
    outputs: [
      {
        id: "result",
        name: "Result",
        type: "object",
        description: "Transformed data"
      }
    ],
    command: "jq '{transformation}' <<< '{input}'"
  },
  {
    id: "adhoc-transformer",
    name: "Adhoc Transformer",
    description: "Run an adhoc transformer script",
    category: "Processing",
    parameters: [
      {
        id: "env_path",
        name: "Python Environment Path",
        type: "string",
        description: "Path to Python virtual environment",
        required: true,
        default: "/usr/local/venv"
      },
      {
        id: "script_path",
        name: "Script Path",
        type: "string",
        description: "Path to Python script",
        required: true,
        default: "/path/to/transformer.py"
      },
      {
        id: "arguments",
        name: "Arguments",
        type: "string",
        description: "Script arguments",
        required: false,
        default: "--debug"
      }
    ],
    outputs: [
      {
        id: "result",
        name: "Result",
        type: "string",
        description: "Script output"
      }
    ],
    command: "source {env_path}/bin/activate && python {script_path} {arguments}"
  },
  {
    id: "sql-query",
    name: "SQL Query",
    description: "Run SQL query against database",
    category: "Database",
    parameters: [
      {
        id: "connection",
        name: "Connection String",
        type: "string",
        description: "Database connection string",
        required: true,
        default: "postgresql://user:pass@localhost:5432/db"
      },
      {
        id: "query",
        name: "SQL Query",
        type: "string",
        description: "SQL query to execute",
        required: true,
        default: "SELECT * FROM users LIMIT 100"
      }
    ],
    outputs: [
      {
        id: "rows",
        name: "Rows",
        type: "array",
        description: "Result rows"
      },
      {
        id: "count",
        name: "Count",
        type: "number",
        description: "Row count"
      }
    ],
    command: "psql {connection} -c \"{query}\""
  },
  {
    id: "notify",
    name: "Send Notification",
    description: "Send notification to Slack or email",
    category: "Notifications",
    parameters: [
      {
        id: "type",
        name: "Type",
        type: "string",
        description: "Notification type",
        required: true,
        default: "slack",
        options: ["slack", "email"]
      },
      {
        id: "destination",
        name: "Destination",
        type: "string",
        description: "Slack channel or email address",
        required: true,
        default: "#general"
      },
      {
        id: "message",
        name: "Message",
        type: "string",
        description: "Notification message",
        required: true,
        default: "Task completed"
      }
    ],
    outputs: [
      {
        id: "success",
        name: "Success",
        type: "boolean",
        description: "Whether notification was successful"
      }
    ],
    command: "notify-send {type} {destination} \"{message}\""
  }
];
