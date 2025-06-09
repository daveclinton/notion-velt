"use client";

import { useState, useRef, FC } from "react";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  MessageSquare,
  Star,
  MoreHorizontal,
  MessageSquareText,
  ChevronsLeft,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { VeltPresence } from "@veltdev/react";

interface CommentSidebarProps {
  documentId: string;
}

export const CommentSidebar: FC<CommentSidebarProps> = ({ documentId }) => {
  const { setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications] = useState<"all" | "mentions" | "none">("all");
  console.log(documentId);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  const HeaderContent = () => (
    <div className="group flex items-center justify-between w-full">
      <div
        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={toggleSidebar}
        role="button"
      >
        <ChevronsLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </div>
      <div className="flex items-center gap-3">
        <VeltPresence />
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 transition-colors">
          <span>Share</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <MessageSquareText size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
          <Star size={18} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Header */}
      <div
        className={cn(
          "fixed top-0 right-0 p-4 text-[color:var(--color-sidebar-foreground)] z-30 transition-all duration-300",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <HeaderContent />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed right-0 top-0 h-screen w-80 bg-white dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col z-50 transition-all duration-300 shadow-xl",
          !isOpen && "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <HeaderContent />
        </div>

        {/* Comments & Suggestions Title */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-black dark:text-gray-100">
            Comments & suggestions
          </h2>
          <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Notification Settings */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/25">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">
            Notify me for
          </p>
          <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-black dark:text-gray-100">
                {notifications === "all" && "All comments"}
                {notifications === "mentions" && "Mentions only"}
                {notifications === "none" && "No notifications"}
              </span>
            </div>
            <ChevronDown
              size={16}
              className="text-gray-500 dark:text-gray-400"
            />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Replace the local comments state with Velt Comments component */}
          <div className="h-full">
            {/* This will be replaced by VeltComments component in your app */}
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto w-fit">
                <MessageSquare
                  size={32}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <h3 className="text-lg font-medium text-black dark:text-gray-100 mb-2">
                Comments will appear here
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                Select text in the editor and click &quot;Comment&quot; to start
                a conversation
              </p>
            </div>
          </div>
        </div>

        {/* Comment Input - Remove this since Velt handles comment input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/25">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Use the &quot;Comment&quot; button in the editor toolbar to add
              comments to selected text
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
