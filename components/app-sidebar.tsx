"use client";

import type * as React from "react";
import { useState } from "react";
import {
  ChevronDown,
  Search,
  FileText,
  Users,
  HelpCircle,
  Send,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { pageTree, dummyUsers } from "@/lib/mock-data";
import { useIdentify } from "@veltdev/react";

const PageMenuItem: React.FC<{
  page: (typeof pageTree)[0];
  depth?: number;
}> = ({ page, depth = 0 }) => {
  const indent = depth * 12;

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="gap-2 hover:bg-accent"
          style={{ paddingLeft: `${16 + indent}px` }}
        >
          <Link href={`/${page.id}`}>
            {page.emoji ? (
              <span className="text-base">{page.emoji}</span>
            ) : (
              <FileText className="h-4 w-4" />
            )}
            <span className="truncate">{page.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {page.children.map((child) => (
        <PageMenuItem key={child.id} page={child} depth={depth + 1} />
      ))}
    </>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState(dummyUsers[0]);

  useIdentify(
    {
      userId: currentUser.id,
      organizationId: currentUser.organizationId,
      name: currentUser.name,
      email: currentUser.email,
      photoUrl: currentUser.avatar,
      color: currentUser.color,
      textColor: currentUser.textColor,
    },
    { forceReset: true }
  );

  const handleUserSwitch = (user: (typeof dummyUsers)[0]) => {
    setCurrentUser(user);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="w-full justify-start gap-2 bg-transparent hover:bg-accent">
                <div className="relative">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>
                      {currentUser.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="font-medium truncate">{currentUser.name}</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {dummyUsers.map((user) => (
                <DropdownMenuItem
                  key={user.id}
                  onSelect={() => handleUserSwitch(user)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pageTree.map((page) => (
                <PageMenuItem key={page.id} page={page} />
              ))}
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
