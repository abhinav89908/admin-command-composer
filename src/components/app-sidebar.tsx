
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Database, Settings, LayoutDashboard, Play, List, Plus } from 'lucide-react';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-4">
        <h2 className="text-xl font-bold text-white">Admin Command Composer</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/')}
                  className={isActive('/') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/composer')}
                  className={isActive('/composer') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Command Composer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/saved-flows')}
                  className={isActive('/saved-flows') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <List className="w-4 h-4 mr-2" />
                  <span>Saved Flows</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/executions')}
                  className={isActive('/executions') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span>Executions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/command-library')}
                  className={isActive('/command-library') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <Database className="w-4 h-4 mr-2" />
                  <span>Command Library</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/settings')}
                  className={isActive('/settings') ? 'bg-sidebar-accent text-white' : ''}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
