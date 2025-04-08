
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Command, Save, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCommands } from '../context/CommandsContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { commands, savedFlows, executions } = useCommands();
  
  const recentExecutions = executions.slice(0, 3);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Commands"
          value={commands.length}
          description="Available commands"
          icon={<Command className="h-8 w-8 text-adminAccent-500/50" />}
          onClick={() => navigate('/command-library')}
        />
        <StatsCard
          title="Saved Flows"
          value={savedFlows.length}
          description="Reusable command flows"
          icon={<Save className="h-8 w-8 text-adminAccent-500/50" />}
          onClick={() => navigate('/saved-flows')}
        />
        <StatsCard
          title="Executions"
          value={executions.length}
          description="Total executions"
          icon={<Play className="h-8 w-8 text-adminAccent-500/50" />}
          onClick={() => navigate('/executions')}
        />
        <StatsCard
          title="Today"
          value={getTodaysExecutions(executions)}
          description="Today's executions"
          icon={<Calendar className="h-8 w-8 text-adminAccent-500/50" />}
          onClick={() => navigate('/executions')}
        />
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button onClick={() => navigate('/composer')} className="w-full justify-start">
                <Command className="mr-2 h-4 w-4" />
                Create New Flow
              </Button>
              <Button variant="outline" onClick={() => navigate('/command-library')} className="w-full justify-start">
                <Play className="mr-2 h-4 w-4" />
                Manage Commands
              </Button>
              <Button variant="outline" onClick={() => navigate('/executions')} className="w-full justify-start">
                <Save className="mr-2 h-4 w-4" />
                View Execution History
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>Latest command executions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentExecutions.length > 0 ? (
              <div className="space-y-2">
                {recentExecutions.map(execution => (
                  <div key={execution.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="font-medium">Execution #{execution.id.substring(0, 8)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(execution.startTime).toLocaleString()}
                      </div>
                    </div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      execution.status === 'completed' 
                        ? 'bg-green-50 text-green-700' 
                        : execution.status === 'failed'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {execution.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No executions yet
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/executions')}>
              View All Executions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, description, icon, onClick }) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
            <div className="text-lg font-medium mt-1">{title}</div>
          </div>
          <div>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

function getTodaysExecutions(executions) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return executions.filter(execution => {
    const executionDate = new Date(execution.startTime);
    executionDate.setHours(0, 0, 0, 0);
    return executionDate.getTime() === today.getTime();
  }).length;
}
