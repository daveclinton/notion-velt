"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SidebarTrigger } from "../ui/sidebar";
import { PageHeader } from "./page-header";
import { useApp } from "@/lib/context/app-context";
import { Skeleton } from "../ui/skeleton";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  const { getCurrentPage, currentPageId } = useApp();

  const currentPage = getCurrentPage();

  if (!currentPageId || !currentPage) {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <SidebarTrigger className="-ml-1" />
      <div className="max-w-3xl mx-auto">
        <PageHeader page={currentPage} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
