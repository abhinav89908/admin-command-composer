import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CommandDefinition, CommandParameter, CommandOutput } from '@/types/command';
import { Plus, Trash } from 'lucide-react';

type CommandFormProps = {
  command?: CommandDefinition;
  onSave: (command: CommandDefinition) => void;
};

export const CommandForm: React.FC<CommandFormProps> = ({ command, onSave }) => {
  const [name, setName] = useState(command?.name || '');
  const [description, setDescription] = useState(command?.description || '');
  const [category, setCategory] = useState(command?.category || '');
  const [commandString, setCommandString] = useState(command?.command || '');
  const [parameters, setParameters] = useState<CommandParameter[]>(command?.parameters || []);
  const [outputs, setOutputs] = useState<CommandOutput[]>(command?.outputs || []);

  const addParameter = () => {
    const newParam: CommandParameter = {
      id: `param-${Date.now()}`,
      name: '',
      type: 'string',
      description: '',
      required: false,
    };
    setParameters([...parameters, newParam]);
  };

  const updateParameter = (index: number, field: keyof CommandParameter, value: any) => {
    const updatedParams = [...parameters];
    updatedParams[index] = { ...updatedParams[index], [field]: value };
    setParameters(updatedParams);
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const addOutput = () => {
    const newOutput: CommandOutput = {
      id: `output-${Date.now()}`,
      name: '',
      type: 'string',
      description: '',
    };
    setOutputs([...outputs, newOutput]);
  };

  const updateOutput = (index: number, field: keyof CommandOutput, value: any) => {
    const updatedOutputs = [...outputs];
    updatedOutputs[index] = { ...updatedOutputs[index], [field]: value };
    setOutputs(updatedOutputs);
  };

  const removeOutput = (index: number) => {
    setOutputs(outputs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !commandString || !category) {
      alert('Please fill in all required fields.');
      return;
    }
    
    const newCommand: CommandDefinition = {
      id: command?.id || `cmd-${Date.now()}`,
      name,
      description,
      category,
      command: commandString,
      parameters,
      outputs,
    };
    
    onSave(newCommand);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Command Name*</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category*</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="command">Command String*</Label>
        <Textarea
          id="command"
          value={commandString}
          onChange={(e) => setCommandString(e.target.value)}
          placeholder="e.g., python {script_path} --arg={arg_value}"
          required
        />
        <p className="text-xs text-muted-foreground">
          Use {"{parameter_name}"} syntax to reference parameters.
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Parameters</Label>
          <Button type="button" variant="outline" size="sm" onClick={addParameter}>
            <Plus className="h-4 w-4 mr-1" /> Add Parameter
          </Button>
        </div>
        
        {parameters.map((param, index) => (
          <div key={param.id} className="grid grid-cols-12 gap-2 items-start p-2 border rounded-md">
            <div className="col-span-3">
              <Label className="text-xs">Name</Label>
              <Input
                value={param.name}
                onChange={(e) => updateParameter(index, 'name', e.target.value)}
                className="h-8"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Type</Label>
              <Select
                value={param.type}
                onValueChange={(value) => updateParameter(index, 'type', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label className="text-xs">Description</Label>
              <Input
                value={param.description}
                onChange={(e) => updateParameter(index, 'description', e.target.value)}
                className="h-8"
              />
            </div>
            <div className="col-span-2">
              <Label className="text-xs">Required</Label>
              <Select
                value={param.required ? 'yes' : 'no'}
                onValueChange={(value) => updateParameter(index, 'required', value === 'yes')}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 pt-6">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeParameter(index)}
                className="h-8 w-8 text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Outputs</Label>
          <Button type="button" variant="outline" size="sm" onClick={addOutput}>
            <Plus className="h-4 w-4 mr-1" /> Add Output
          </Button>
        </div>
        
        {outputs.map((output, index) => (
          <div key={output.id} className="grid grid-cols-12 gap-2 items-start p-2 border rounded-md">
            <div className="col-span-4">
              <Label className="text-xs">Name</Label>
              <Input
                value={output.name}
                onChange={(e) => updateOutput(index, 'name', e.target.value)}
                className="h-8"
              />
            </div>
            <div className="col-span-3">
              <Label className="text-xs">Type</Label>
              <Select
                value={output.type}
                onValueChange={(value: any) => updateOutput(index, 'type', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                  <SelectItem value="file">File</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-4">
              <Label className="text-xs">Description</Label>
              <Input
                value={output.description}
                onChange={(e) => updateOutput(index, 'description', e.target.value)}
                className="h-8"
              />
            </div>
            <div className="col-span-1 pt-6">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOutput(index)}
                className="h-8 w-8 text-red-500 hover:text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit">Save Command</Button>
      </div>
    </form>
  );
};
