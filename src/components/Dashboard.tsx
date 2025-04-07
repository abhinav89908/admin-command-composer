
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCommands } from '@/context/CommandsContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, FileCode, Play, Workflow, Plus, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { commands, savedFlows, executions } = useCommands();
  const navigate = useNavigate();
  
  // Get counts of executions by status
  const executionStats = {
    completed: executions.filter(e => e.status === 'completed').length,
    failed: executions.filter(e => e.status === 'failed').length,
    running: executions.filter(e => e.status === 'running').length,
    pending: executions.filter(e => e.status === 'pending').length,
  };
  
  // Count executions in the last 24 hours
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const recentExecutions = executions.filter(
    e => new Date(e.startTime) > oneDayAgo
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Command Composer</h1>
        <Button onClick={() => navigate('/composer')}>
          <Plus className="mr-2 h-4 w-4" />
          New Command Flow
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileCode className="h-8 w-8 text-adminPrimary-600" />
              <div className="ml-4">
                <div className="text-3xl font-semibold">{commands.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Available commands</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" onClick={() => navigate('/command-library')}>
              View Library
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Workflow className="h-8 w-8 text-adminAccent-600" />
              <div className="ml-4">
                <div className="text-3xl font-semibold">{savedFlows.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Reusable command flows</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" onClick={() => navigate('/saved-flows')}>
              View Flows
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Play className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-3xl font-semibold">{executions.length}</div>
                <p className="text-xs text-muted-foreground mt-1">{recentExecutions} in last 24 hours</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" onClick={() => navigate('/executions')}>
              View Executions
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/composer')}>
              <Plus className="mr-2 h-4 w-4" />
              New Flow
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/command-library')}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              View Commands
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>Summary of recent command executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    {executions.length > 0 && (
                      <>
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${(executionStats.completed / executions.length) * 100}%` }} 
                        />
                      </>
                    )}
                  </div>
                  <span className="text-sm font-medium">{executionStats.completed} completed</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    {executions.length > 0 && (
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{ width: `${(executionStats.failed / executions.length) * 100}%` }} 
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">{executionStats.failed} failed</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    {executions.length > 0 && (
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${((executionStats.running + executionStats.pending) / executions.length) * 100}%` }} 
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">{executionStats.running + executionStats.pending} in progress</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => navigate('/executions')}>
              View All
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Commands</CardTitle>
            <CardDescription>Most used command components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commands.slice(0, 5).map((command) => (
                <div key={command.id} className="flex items-center">
                  <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center mr-3">
                    {command.category.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-sm">{command.name}</div>
                    <div className="text-xs text-muted-foreground">{command.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => navigate('/command-library')}>
              View Library
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
