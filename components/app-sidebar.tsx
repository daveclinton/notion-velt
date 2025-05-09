"use client";

import type * as React from "react";
import {
  ChevronDown,
  Search,
  Home,
  Inbox,
  FileText,
  Plus,
  Twitter,
  Rocket,
  HomeIcon,
  CheckSquare,
  Book,
  Users,
  HelpCircle,
  Send,
  Sparkles,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between mb-2">
          <SidebarMenuButton className="w-full justify-start gap-2 bg-transparent hover:bg-accent">
            <div className="flex items-center justify-center w-6 h-6 rounded-md">
              D
            </div>
            <span className="font-medium">David clinto...</span>
            <ChevronDown className="ml-auto h-4 w-4" />
          </SidebarMenuButton>
          <button className="p-1 rounded-md hover:bg-accent">
            <Settings className="h-5 w-5" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search"
            className="pl-9 bg-accent border-none h-8 text-sm focus-visible:ring-0"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-2 hover:bg-accent">
              <Sparkles className="h-4 w-4" />
              <span>Notion AI</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-2 hover:bg-accent">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-2 hover:bg-accent">
              <Inbox className="h-4 w-4" />
              <span>Inbox</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">
                    Agile Project Plan: Octavia...
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Dragon&apos;s jobs board</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Nebius x Studio1</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium">
            Favorites
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Building an AI-powered Fi...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium">Shared</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Building an AI-powered Fi...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">4-Week Agile Project Plan...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Code completion showdo...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium">Private</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">Building an AI-powered Fi...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <Plus className="h-4 w-4" />
                  <span>Notion Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <Twitter className="h-4 w-4" />
                  <span>Tweets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <FileText className="h-4 w-4" />
                  <span>Getting Started on Mobile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <Rocket className="h-4 w-4" />
                  <span>Amazon AWS EC2</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <HomeIcon className="h-4 w-4" />
                  <span>Personal Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <CheckSquare className="h-4 w-4" />
                  <span>Task List</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <Book className="h-4 w-4" />
                  <span>Journal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 hover:bg-accent">
                  <Book className="h-4 w-4" />
                  <span>Reading List</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-2 hover:bg-accent">
              <Users className="h-4 w-4" />
              <span>Invite members</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex justify-between mt-2">
          <button className="p-2 rounded-md hover:bg-accent">
            <FileText className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent">
            <Send className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent">
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
