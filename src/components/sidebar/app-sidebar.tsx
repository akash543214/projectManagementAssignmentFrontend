import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

//import DropDownAction from "./DropDownAction";
import { useNavigate } from 'react-router-dom';
// Menu items.
//import { projectData } from "@/types/common";
//import { AddProject } from "./AddProject";
import { getProjects } from "@/BackendApi/projectApi";

import { AlertCircle, Folder, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import SideBarItems from "./SideBarItems";



export function AppSidebar() {
  const navigate = useNavigate();

  const [projects,setProjects] = useState([]);
  const  [error,setError] = useState(false);
  
const fetchProjects = async()=>{
    setError(false);
  try{
      const res = await getProjects();
       setProjects(res);
  }catch
  {
    setError(true);
  }
}

      useEffect(()=>{
          fetchProjects();
      },[]);


  return (
    <Sidebar className="h-screen border-r bg-gradient-to-b from-background to-muted/20">
      <SidebarContent className="pt-14">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            Application
          </SidebarGroupLabel>
                    <SideBarItems />

        </SidebarGroup>
        
        <SidebarGroup className="mt-6">
          <div className="flex items-center justify-between px-2 mb-2">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Projects
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add Project" className="hover:bg-primary/10 transition-colors">
              <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
          </div>
          
          <SidebarGroupContent>
             {error && (
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>Error loading projects</span>
              </div>
            )}
            
            <SidebarMenu>
              {projects?.map((project: any) => (
                <SidebarMenuItem key={project._id} className="group">
                  <SidebarMenuButton 
                    asChild 
                    className="w-full hover:bg-accent/50 transition-all duration-200 data-[state=open]:bg-accent"
                  >
                    <div 
                      className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md"
                      onClick={() => navigate(`/task/${project._id}`)}
                    >
                      <div className="flex-shrink-0">
                        <Folder className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:hidden" />
                        <FolderOpen className="h-4 w-4 text-primary hidden group-hover:block" />
                      </div>
                      <span className="flex-1 text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {project.title}
                      </span>
                    </div>
                  </SidebarMenuButton>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {projects && projects.length === 0 && (
              <div className="px-3 py-8 text-center">
                <Folder className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">No projects yet</p>
                <p className="text-xs text-muted-foreground mt-1">Create your first project to get started</p>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}