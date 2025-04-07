
import { CommandDefinition } from '@/types/command';

export const sampleCommands: CommandDefinition[] = [
  {
    id: 'adhoc_transformer',
    name: 'Adhoc Transformer',
    description: 'Runs a Python transformer script with the specified parameters',
    category: 'Data Processing',
    parameters: [
      {
        id: 'python_env',
        name: 'Python Environment',
        type: 'string',
        description: 'Path to the Python environment',
        required: true,
        default: '/usr/local/bin/python3',
      },
      {
        id: 'script_path',
        name: 'Script Path',
        type: 'file',
        description: 'Path to the Python script',
        required: true,
      },
      {
        id: 'args',
        name: 'Arguments',
        type: 'string',
        description: 'Command line arguments to pass to the script',
        required: false,
      },
    ],
    outputs: [
      {
        id: 'output',
        name: 'Output',
        type: 'string',
        description: 'Output from the script execution',
      },
      {
        id: 'exit_code',
        name: 'Exit Code',
        type: 'number',
        description: 'Exit code of the script execution',
      },
    ],
    command: '{python_env} {script_path} {args}',
  },
  {
    id: 'run_sql_query',
    name: 'SQL Query',
    description: 'Runs a SQL query and returns the results',
    category: 'Database',
    parameters: [
      {
        id: 'connection',
        name: 'Connection',
        type: 'string',
        description: 'Database connection string or identifier',
        required: true,
        options: ['prod_db', 'staging_db', 'dev_db'],
      },
      {
        id: 'query',
        name: 'SQL Query',
        type: 'string',
        description: 'SQL query to execute',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'results',
        name: 'Query Results',
        type: 'array',
        description: 'Results of the SQL query',
      },
    ],
    command: 'run_sql -c {connection} -q "{query}"',
  },
  {
    id: 'send_notification',
    name: 'Send Notification',
    description: 'Sends a notification through various channels',
    category: 'Notifications',
    parameters: [
      {
        id: 'channel',
        name: 'Channel',
        type: 'string',
        description: 'Notification channel',
        required: true,
        options: ['email', 'slack', 'sms'],
      },
      {
        id: 'recipients',
        name: 'Recipients',
        type: 'string',
        description: 'Comma-separated list of recipients',
        required: true,
      },
      {
        id: 'message',
        name: 'Message',
        type: 'string',
        description: 'Message content',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'success',
        name: 'Success',
        type: 'boolean',
        description: 'Whether the notification was sent successfully',
      },
    ],
    command: 'notify --channel={channel} --to="{recipients}" --message="{message}"',
  },
  {
    id: 'process_data',
    name: 'Process Data',
    description: 'Processes data from input file and outputs to a destination',
    category: 'Data Processing',
    parameters: [
      {
        id: 'input_file',
        name: 'Input File',
        type: 'file',
        description: 'Path to input file',
        required: true,
      },
      {
        id: 'output_file',
        name: 'Output File',
        type: 'string',
        description: 'Path to output file',
        required: true,
      },
      {
        id: 'options',
        name: 'Processing Options',
        type: 'string',
        description: 'Options for processing',
        required: false,
      },
    ],
    outputs: [
      {
        id: 'records_processed',
        name: 'Records Processed',
        type: 'number',
        description: 'Number of records processed',
      },
    ],
    command: 'process_data -i {input_file} -o {output_file} {options}',
  },
  {
    id: 'export_data',
    name: 'Export Data',
    description: 'Exports data to various formats',
    category: 'Data Processing',
    parameters: [
      {
        id: 'data',
        name: 'Input Data',
        type: 'array',
        description: 'Data to export',
        required: true,
      },
      {
        id: 'format',
        name: 'Format',
        type: 'string',
        description: 'Output format',
        required: true,
        options: ['csv', 'json', 'xml', 'excel'],
      },
      {
        id: 'output_file',
        name: 'Output File',
        type: 'string',
        description: 'Path to output file',
        required: true,
      },
    ],
    outputs: [
      {
        id: 'file_path',
        name: 'File Path',
        type: 'string',
        description: 'Path to the exported file',
      },
    ],
    command: 'export_data --format={format} --output="{output_file}"',
  },
];
