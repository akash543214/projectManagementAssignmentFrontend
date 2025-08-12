import { 
  Home, 
} from "lucide-react"

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from "react";

export default function SideBarItems() {
  const navigate = useNavigate();
  const location = useLocation();
       
  const handleHomeClick = useCallback(() => {
    navigate('/home');
  }, [navigate]);
  
 
  
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
      action: handleHomeClick,
      path: '/home'
    }
  ]

  return (
    <SidebarGroupContent>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = item.path && location.pathname === item.path;
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <button 
                  onClick={item.action}
                  className={`
                    relative flex items-center gap-3 rounded-lg px-3 py-2.5 
                    text-sm font-medium transition-all duration-200 ease-in-out
                    hover:bg-accent hover:text-accent-foreground
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20
                    ${isActive 
                      ? 'bg-primary/10 text-primary before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:rounded-full before:bg-primary before:-translate-y-1/2' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <item.icon 
                    className={`
                      h-5 w-5 transition-transform duration-200 
                      ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    `} 
                  />
                  <span className="flex-1 text-left">{item.title}</span>
                  {isActive && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    </span>
                  )}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}