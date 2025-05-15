"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Page, Block } from "@/types";
import { pageTree, pageBlocks } from "../mock-data";

// Define types
interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

interface AppContextType {
  pages: Page[];
  blocks: Record<string, Block[]>;
  expandedPageIds: Set<string>;
  isPageExpanded: (id: string) => boolean;
  togglePageExpanded: (id: string) => void;
  getCurrentPageBlocks: () => Block[];
  updateBlock: (
    pageId: string,
    blockId: string,
    updates: Partial<Block>
  ) => void;
  addBlock: (pageId: string, block: Block) => void;
  deleteBlock: (pageId: string, blockId: string) => void;
  createPage: (title: string, parentId: string | null) => Page;
  deletePage: (id: string) => void;
  updatePageTitle: (id: string, title: string) => void;
  sidebar: SidebarState;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // State
  const [pages, setPages] = useState<Page[]>(pageTree);
  const [blocks, setBlocks] = useState<Record<string, Block[]>>(pageBlocks);
  const [expandedPageIds, setExpandedPageIds] = useState<Set<string>>(
    new Set(["page-1", "page-3", "page-5"])
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Page expansion handlers
  const isPageExpanded = (id: string) => expandedPageIds.has(id);

  const togglePageExpanded = (id: string) => {
    setExpandedPageIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Block handlers
  const getCurrentPageBlocks = () => blocks[pages[0]?.id] || [];

  const updateBlock = (
    pageId: string,
    blockId: string,
    updates: Partial<Block>
  ) => {
    setBlocks((prev) => ({
      ...prev,
      [pageId]: (prev[pageId] || []).map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      ),
    }));
  };

  const addBlock = (pageId: string, block: Block) => {
    setBlocks((prev) => ({
      ...prev,
      [pageId]: [...(prev[pageId] || []), block],
    }));
  };

  const deleteBlock = (pageId: string, blockId: string) => {
    setBlocks((prev) => ({
      ...prev,
      [pageId]: (prev[pageId] || []).filter((block) => block.id !== blockId),
    }));
  };

  // Page tree helpers
  const updatePageInTree = (
    pages: Page[],
    id: string,
    updateFn: (page: Page) => Page
  ): Page[] => {
    return pages.map((page) => {
      if (page.id === id) return updateFn(page);
      if (page.children.length) {
        return {
          ...page,
          children: updatePageInTree(page.children, id, updateFn),
        };
      }
      return page;
    });
  };

  const deletePageFromTree = (pages: Page[], id: string): Page[] => {
    return pages.filter((page) => {
      if (page.id === id) return false;
      if (page.children.length) {
        page.children = deletePageFromTree(page.children, id);
      }
      return true;
    });
  };

  // Page handlers
  const createPage = (title: string, parentId: string | null) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title,
      parentId,
      children: [],
    };

    setBlocks((prev) => ({
      ...prev,
      [newPage.id]: [
        {
          id: `block-${Date.now()}-1`,
          type: "heading_1",
          content: title,
        } as Block,
        {
          id: `block-${Date.now()}-2`,
          type: "paragraph",
          content: "",
        } as Block,
      ],
    }));

    setPages((prev) =>
      parentId
        ? updatePageInTree(prev, parentId, (page) => ({
            ...page,
            children: [...page.children, newPage],
          }))
        : [...prev, newPage]
    );

    return newPage;
  };

  const deletePage = (id: string) => {
    setPages((prev) => deletePageFromTree(prev, id));
    setBlocks((prev) => {
      const newBlocks = { ...prev };
      delete newBlocks[id];
      return newBlocks;
    });
  };

  const updatePageTitle = (id: string, title: string) => {
    setPages((prev) =>
      updatePageInTree(prev, id, (page) => ({ ...page, title }))
    );
  };

  // Sidebar handlers
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Context value
  const value: AppContextType = {
    pages,
    blocks,
    expandedPageIds,
    isPageExpanded,
    togglePageExpanded,
    getCurrentPageBlocks,
    updateBlock,
    addBlock,
    deleteBlock,
    createPage,
    deletePage,
    updatePageTitle,
    sidebar: {
      isOpen: isSidebarOpen,
      toggle: toggleSidebar,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
