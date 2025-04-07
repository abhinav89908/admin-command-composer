
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export const Settings: React.FC = () => {
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <form onSubmit={handleSaveSettings}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general behavior of the command composer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPythonEnv">Default Python Environment</Label>
                <Input id="defaultPythonEnv" defaultValue="/usr/local/bin/python3" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultOutputDir">Default Output Directory</Label>
                <Input id="defaultOutputDir" defaultValue="./output" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logLevel">Logging Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger id="logLevel">
                    <SelectValue placeholder="Select logging level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableAutoSave">Enable Auto Save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save flows when modified
                  </p>
                </div>
                <Switch id="enableAutoSave" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Database Connections</CardTitle>
              <CardDescription>
                Configure database connections for SQL commands
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prodDb">Production Database</Label>
                <Input id="prodDb" defaultValue="postgres://user:pass@prod-db:5432/main" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stagingDb">Staging Database</Label>
                <Input id="stagingDb" defaultValue="postgres://user:pass@staging-db:5432/main" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="devDb">Development Database</Label>
                <Input id="devDb" defaultValue="postgres://user:pass@dev-db:5432/main" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure notification settings for command executions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                <Input id="slackWebhook" placeholder="https://hooks.slack.com/services/..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailRecipients">Email Recipients</Label>
                <Textarea 
                  id="emailRecipients" 
                  placeholder="email@example.com, another@example.com" 
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple email addresses with commas
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnFailure">Notify on Failure</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications when command execution fails
                  </p>
                </div>
                <Switch id="notifyOnFailure" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnSuccess">Notify on Success</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications when command execution completes successfully
                  </p>
                </div>
                <Switch id="notifyOnSuccess" />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
