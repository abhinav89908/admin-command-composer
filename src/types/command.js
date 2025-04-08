
// JavaScript doesn't have types, but we can use JSDoc to provide documentation
// and better IDE support

/**
 * @typedef {Object} CommandParameter
 * @property {string} id - Unique identifier
 * @property {string} name - Parameter name
 * @property {('string'|'number'|'boolean'|'array'|'object'|'file')} type - Parameter type
 * @property {string} description - Parameter description
 * @property {boolean} required - Whether parameter is required
 * @property {*} [default] - Default value
 * @property {*} [value] - Current value
 * @property {string[]} [options] - Dropdown options
 */

/**
 * @typedef {Object} CommandOutput
 * @property {string} id - Unique identifier
 * @property {string} name - Output name
 * @property {('string'|'number'|'boolean'|'array'|'object'|'file')} type - Output type
 * @property {string} description - Output description
 */

/**
 * @typedef {Object} CommandDefinition
 * @property {string} id - Unique identifier
 * @property {string} name - Command name
 * @property {string} description - Command description
 * @property {string} category - Command category
 * @property {string} [icon] - Icon name
 * @property {CommandParameter[]} parameters - Command parameters
 * @property {CommandOutput[]} outputs - Command outputs
 * @property {string} command - The actual command to run
 * @property {boolean} [isComposite] - Whether this is a composite command
 * @property {CommandFlow} [childCommands] - Child commands for composite commands
 */

/**
 * @typedef {Object} CommandNode
 * @property {string} id - Node id
 * @property {'command'} type - Node type
 * @property {Object} data - Node data
 * @property {CommandDefinition} data.command - Command definition
 * @property {Object.<string, any>} data.parameters - Command parameters
 * @property {Object} position - Node position
 * @property {number} position.x - X position
 * @property {number} position.y - Y position
 */

/**
 * @typedef {Object} CommandConnection
 * @property {string} id - Connection id
 * @property {string} source - Source node id
 * @property {string} sourceHandle - Source port id
 * @property {string} target - Target node id
 * @property {string} targetHandle - Target port id
 */

/**
 * @typedef {Object} CommandFlow
 * @property {CommandNode[]} nodes - Flow nodes
 * @property {CommandConnection[]} connections - Flow connections
 */

/**
 * @typedef {Object} CommandExecution
 * @property {string} id - Execution id
 * @property {string} flowId - Flow id
 * @property {('pending'|'running'|'completed'|'failed')} status - Execution status
 * @property {Date} startTime - Start time
 * @property {Date} [endTime] - End time
 * @property {Array<{nodeId: string, time: Date, message: string, level: ('info'|'warning'|'error')}>} logs - Execution logs
 * @property {Object.<string, any>} results - Execution results
 */

// Export empty object to make this a valid module
export default {};
