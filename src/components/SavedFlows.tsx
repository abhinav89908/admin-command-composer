
import React from 'react';
import { useCommands } from '@/context/CommandsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Eye, Play, Trash } from 'lucide-react';
import { CommandNode } from './CommandNode';
import { toast } from 'sonner';

export const SavedFlows: React.FC = () => {
  const { savedFlows, loadFlow, executeFlow, deleteFlow } = useCommands();

  if (savedFlows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="mb-4 p-4 rounded-full bg-slate-100 dark:bg-slate-800">
          <Eye className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No saved flows</h3>
        <p className="text-muted-foreground max-w-md">
          Create and save flows in the Command Composer to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedFlows.map((flow) => (
        <Card key={flow.id}>
          <CardContent className="p-4">
            <div className="mb-3">
              <h3 className="font-medium text-lg">{flow.name}</h3>
              <p className="text-sm text-muted-foreground">
                {flow.flow.nodes.length} command{flow.flow.nodes.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {flow.flow.nodes.map((node) => (
                <div key={node.id} className="border p-3 rounded-md">
                  <div className="font-medium">{node.data.command.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {node.data.command.description}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2 pb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                loadFlow(flow.id);
                toast.info('Flow loaded in composer');
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              Load
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                executeFlow();
                toast.info('Executing flow');
              }}
            >
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => deleteFlow(flow.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
