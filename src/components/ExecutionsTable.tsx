
import React from 'react';
import { useCommands } from '@/context/CommandsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Play, CheckCircle, XCircle, Clock } from 'lucide-react';
import { CommandExecution } from '@/types/command';

export const ExecutionsTable: React.FC = () => {
  const { executions } = useCommands();

  if (executions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No executions yet</h3>
        <p className="text-muted-foreground">Run a command flow to see execution history</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {executions.map((execution) => (
        <ExecutionCard key={execution.id} execution={execution} />
      ))}
    </div>
  );
};

const ExecutionCard: React.FC<{ execution: CommandExecution }> = ({ execution }) => {
  const getStatusIcon = () => {
    switch (execution.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Play className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (execution.status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'running':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <Card className="overflow-hidden hover:border-adminAccent-500 transition-colors">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="mr-4">{getStatusIcon()}</div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Execution #{execution.id.substring(0, 8)}</h3>
              <Badge className={getStatusColor()}>
                {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(execution.startTime), { addSuffix: true })}
              {execution.endTime && ` • Duration: ${formatDuration(execution.startTime, execution.endTime)}`}
            </div>
          </div>
        </div>
        
        <div className="border-t px-4 py-2 bg-slate-50 dark:bg-slate-900">
          <h4 className="text-sm font-medium mb-1">Execution Log</h4>
          <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-xs font-mono h-32 overflow-y-auto">
            {execution.logs.length > 0 ? (
              execution.logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-slate-500">[{new Date(log.time).toLocaleTimeString()}]</span>{' '}
                  <span className={`font-semibold ${log.level === 'error' ? 'text-red-500' : log.level === 'warning' ? 'text-yellow-500' : ''}`}>
                    {log.level.toUpperCase()}
                  </span>:{' '}
                  <span>{log.message}</span>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">No logs available</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function formatDuration(start: Date, end: Date): string {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return `${seconds} sec`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes} min ${remainingSeconds} sec`;
}
