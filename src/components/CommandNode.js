
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

export const CommandNode = ({ 
  command, 
  parameters,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="command-node w-72 bg-white dark:bg-slate-800">
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{command.name}</CardTitle>
          <Badge variant="outline" className="text-xs">{command.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-xs">
        <p className="text-muted-foreground mb-2">{command.description}</p>
        
        {command.parameters.length > 0 && (
          <div className="mt-2">
            <h4 className="font-medium text-xs mb-1">Parameters</h4>
            <div className="space-y-1">
              {command.parameters.map(param => {
                const value = parameters[param.id] || param.default || 'Not set';
                return (
                  <div key={param.id} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{param.name}:</span>
                    <span className="font-mono text-xs truncate max-w-[120px]">{String(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-end space-x-2">
        {onEdit && (
          <button 
            onClick={onEdit}
            className="text-xs px-2 py-1 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-xs px-2 py-1 bg-transparent hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded"
          >
            Delete
          </button>
        )}
      </CardFooter>
    </Card>
  );
};
