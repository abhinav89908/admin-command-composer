
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandsProvider } from "@/context/CommandsContext";
import { SavedFlows } from "@/components/SavedFlows";

const SavedFlowsPage = () => {
  return (
    <CommandsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-grow p-6 overflow-y-auto">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold mb-6">Saved Flows</h1>
            <SavedFlows />
          </main>
        </div>
      </SidebarProvider>
    </CommandsProvider>
  );
};

export default SavedFlowsPage;
