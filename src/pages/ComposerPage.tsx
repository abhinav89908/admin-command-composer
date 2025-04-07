
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandsProvider } from "@/context/CommandsContext";
import { CommandBuilder } from "@/components/CommandBuilder";

const ComposerPage = () => {
  return (
    <CommandsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-grow p-6 overflow-y-auto">
            <SidebarTrigger />
            <CommandBuilder />
          </main>
        </div>
      </SidebarProvider>
    </CommandsProvider>
  );
};

export default ComposerPage;
