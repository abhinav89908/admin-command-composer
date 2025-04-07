
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandsProvider } from "@/context/CommandsContext";
import { ExecutionsTable } from "@/components/ExecutionsTable";

const ExecutionsPage = () => {
  return (
    <CommandsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-grow p-6 overflow-y-auto">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold mb-6">Executions</h1>
            <ExecutionsTable />
          </main>
        </div>
      </SidebarProvider>
    </CommandsProvider>
  );
};

export default ExecutionsPage;
