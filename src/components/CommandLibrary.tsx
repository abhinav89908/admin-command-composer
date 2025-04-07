
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CommandDefinition } from '@/types/command';
import { useCommands } from '@/context/CommandsContext';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CommandForm } from './CommandForm';

export const CommandLibrary: React.FC = () => {
  const { commands, addCommand } = useCommands();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(commands.map(cmd => cmd.category)))];
  
  const filteredCommands = commands.filter(command => {
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          command.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || command.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Command Library</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Command
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Command</DialogTitle>
            </DialogHeader>
            <CommandForm onSave={(command) => {
              addCommand(command);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <Badge 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {filteredCommands.map(command => (
          <CommandCard key={command.id} command={command} />
        ))}
        
        {filteredCommands.length === 0 && (
          <div className="col-span-full flex items-center justify-center h-40 text-muted-foreground">
            No commands found
          </div>
        )}
      </div>
    </div>
  );
};

const CommandCard: React.FC<{ command: CommandDefinition }> = ({ command }) => {
  return (
    <Card className="hover:border-adminAccent-500 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{command.name}</h3>
          <Badge variant="outline">{command.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{command.description}</p>
        
        <div className="text-xs">
          <div className="flex flex-wrap gap-1 mt-2">
            {command.parameters.map(param => (
              <Badge key={param.id} variant="secondary" className="text-xs">
                {param.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
