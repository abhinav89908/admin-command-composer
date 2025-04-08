
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { CommandsProvider } from "../context/CommandsContext";
import { Dashboard } from "../components/Dashboard";

const Index = () => {
  return (
    <CommandsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-grow p-6 overflow-y-auto">
            <SidebarTrigger />
            <Dashboard />
          </main>
        </div>
      </SidebarProvider>
    </CommandsProvider>
  );
};

export default Index;
