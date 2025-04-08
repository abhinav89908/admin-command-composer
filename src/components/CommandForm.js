
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Plus, Trash, Save } from 'lucide-react';
import { Label } from './ui/label';

export const CommandForm = ({ command = null, onSave }) => {
  const [name, setName] = useState(command?.name || '');
  const [description, setDescription] = useState(command?.description || '');
  const [category, setCategory] = useState(command?.category || '');
  const [commandString, setCommandString] = useState(command?.command || '');
  const [parameters, setParameters] = useState(command?.parameters || []);
  const [outputs, setOutputs] = useState(command?.outputs || []);
  
  const addParameter = () => {
    const newParam = {
      id: `param-${Date.now()}`,
      name: '',
      type: 'string',
      description: '',
      required: false,
      default: '',
    };
    
    setParameters([...parameters, newParam]);
  };
  
  const updateParameter = (index, field, value) => {
    const updatedParams = [...parameters];
    updatedParams[index] = { ...updatedParams[index], [field]: value };
    setParameters(updatedParams);
  };
  
  const removeParameter = (index) => {
    const updatedParams = [...parameters];
    updatedParams.splice(index, 1);
    setParameters(updatedParams);
  };
  
  const addOutput = () => {
    const newOutput = {
      id: `output-${Date.now()}`,
      name: '',
      type: 'string',
      description: '',
    };
    
    setOutputs([...outputs, newOutput]);
  };
  
  const updateOutput = (index, field, value) => {
    const updatedOutputs = [...outputs];
    updatedOutputs[index] = { ...updatedOutputs[index], [field]: value };
    setOutputs(updatedOutputs);
  };
  
  const removeOutput = (index) => {
    const updatedOutputs = [...outputs];
    updatedOutputs.splice(index, 1);
    setOutputs(updatedOutputs);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !commandString || !category) {
      alert('Please fill in all required fields.');
      return;
    }
    
    const newCommand = {
      id: command?.id || `cmd-${Date.now()}`,
      name,
      description,
      category,
      parameters,
      outputs,
      command: commandString
    };
    
    onSave(newCommand);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Command Name</Label>
          <Input 
            id="name"
            placeholder="Enter command name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category"
            placeholder="Enter category" 
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
          placeholder="Enter command description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="command">Command String</Label>
        <Input 
          id="command"
          placeholder="Enter command string" 
          value={commandString} 
          onChange={(e) => setCommandString(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Use {"{parameter_name}"} syntax to reference parameters.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Parameters</h3>
          <Button type="button" variant="outline" size="sm" onClick={addParameter}>
            <Plus className="h-4 w-4 mr-1" />
            Add Parameter
          </Button>
        </div>
        
        {parameters.map((param, index) => (
          <Card key={param.id} className="overflow-hidden">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Parameter Name" 
                value={param.name} 
                onChange={(e) => updateParameter(index, 'name', e.target.value)}
              />
              
              <Select 
                value={param.type} 
                onValueChange={(value) => updateParameter(index, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Parameter Type" />
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
              
              <div className="md:col-span-2">
                <Input 
                  placeholder="Description" 
                  value={param.description} 
                  onChange={(e) => updateParameter(index, 'description', e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={param.required}
                    onChange={(e) => updateParameter(index, 'required', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Required
                </label>
                
                <Input 
                  placeholder="Default Value" 
                  value={param.default || ''} 
                  onChange={(e) => updateParameter(index, 'default', e.target.value)}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeParameter(index)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Outputs</h3>
          <Button type="button" variant="outline" size="sm" onClick={addOutput}>
            <Plus className="h-4 w-4 mr-1" />
            Add Output
          </Button>
        </div>
        
        {outputs.map((output, index) => (
          <Card key={output.id} className="overflow-hidden">
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Output Name" 
                value={output.name} 
                onChange={(e) => updateOutput(index, 'name', e.target.value)}
              />
              
              <Select 
                value={output.type} 
                onValueChange={(value) => updateOutput(index, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Output Type" />
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
              
              <div className="md:col-span-2">
                <Input 
                  placeholder="Description" 
                  value={output.description} 
                  onChange={(e) => updateOutput(index, 'description', e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeOutput(index)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-adminAccent-500">
          <Save className="h-4 w-4 mr-2" />
          Save Command
        </Button>
      </div>
    </form>
  );
};
