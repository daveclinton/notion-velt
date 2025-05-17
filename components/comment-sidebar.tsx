"use client";

import { useState } from "react";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommentsSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <aside
      className={`fixed right-0 top-12 bottom-0 w-80 border-l bg-white dark:bg-zinc-900 dark:border-zinc-800 p-4 transition-transform duration-300 z-10 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Comments & suggestions</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Toggle sidebar</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-xs text-zinc-500">Notify me for</p>
        <Select defaultValue="all">
          <SelectTrigger className="mt-1 h-8">
            <SelectValue placeholder="All comments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All comments</SelectItem>
            <SelectItem value="mentions">Mentions only</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border">
          <MessageSquare className="h-6 w-6 text-zinc-400" />
        </div>
        <p className="text-sm text-zinc-500">No open comments or suggestions</p>
        <Button variant="outline" size="sm" className="mt-2">
          Add comment
        </Button>
      </div>
    </aside>
  );
}
