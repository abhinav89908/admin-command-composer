
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

export const Settings = () => {
  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Simulating a save operation
    toast.success('Settings saved successfully');
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <form onSubmit={handleSaveSettings}>
        <div className="space-y-6">
          <GeneralSettings />
          <DatabaseSettings />
          <NotificationSettings />
          <ExecutionSettings />
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-adminAccent-500">
              Save Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="app-name">Application Name</Label>
            <Input id="app-name" defaultValue="Admin Command Composer" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select defaultValue="dark">
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="dev-mode" defaultChecked={true} />
          <Label htmlFor="dev-mode">Developer Mode</Label>
        </div>
      </CardContent>
    </Card>
  );
};

const DatabaseSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="db-host">Database Host</Label>
            <Input id="db-host" defaultValue="localhost" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="db-port">Database Port</Label>
            <Input id="db-port" defaultValue="5432" type="number" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="db-name">Database Name</Label>
            <Input id="db-name" defaultValue="admin_commands" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="db-user">Database User</Label>
            <Input id="db-user" defaultValue="postgres" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="db-password">Database Password</Label>
            <Input id="db-password" type="password" defaultValue="********" />
          </div>
        </div>
        
        <Button variant="outline" type="button">
          Test Connection
        </Button>
      </CardContent>
    </Card>
  );
};

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" defaultChecked={true} />
          <Label htmlFor="email-notifications">Email Notifications</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="slack-notifications" defaultChecked={true} />
          <Label htmlFor="slack-notifications">Slack Notifications</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
          <Input id="slack-webhook" defaultValue="https://hooks.slack.com/services/..." />
        </div>
      </CardContent>
    </Card>
  );
};

const ExecutionSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="execution-timeout">Execution Timeout (seconds)</Label>
            <Input id="execution-timeout" type="number" defaultValue="300" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-concurrent">Max Concurrent Executions</Label>
            <Input id="max-concurrent" type="number" defaultValue="5" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="auto-retry" defaultChecked={false} />
          <Label htmlFor="auto-retry">Auto-retry Failed Commands</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
          <Input id="retry-attempts" type="number" defaultValue="3" disabled={true} />
        </div>
      </CardContent>
    </Card>
  );
};
