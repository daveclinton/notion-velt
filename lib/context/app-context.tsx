/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

import { Page, Block } from "@/types";
import { pageTree, pageBlocks, findPageById } from "../mock-data";

interface AppContextType {
  pages: Page[];
  currentPageId: string | null;
  blocks: Record<string, Block[]>;
  expandedPageIds: Set<string>;
  isPageExpanded: (id: string) => boolean;
  togglePageExpanded: (id: string) => void;
  setCurrentPageId: (id: string | null) => void;
  getCurrentPage: () => Page | null;
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
  sidebar: {
    isOpen: boolean;
    toggle: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>(pageTree);
  const [currentPageId, setCurrentPageId] = useState<string | null>("page-1");
  const [blocks, setBlocks] = useState<Record<string, Block[]>>(pageBlocks);
  const [expandedPageIds, setExpandedPageIds] = useState<Set<string>>(
    new Set(["page-1", "page-3", "page-5"])
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isPageExpanded = (id: string) => expandedPageIds.has(id);

  const togglePageExpanded = (id: string) => {
    const newExpandedPageIds = new Set(expandedPageIds);
    if (newExpandedPageIds.has(id)) {
      newExpandedPageIds.delete(id);
    } else {
      newExpandedPageIds.add(id);
    }
    setExpandedPageIds(newExpandedPageIds);
  };

  const getCurrentPage = () => {
    if (!currentPageId) return null;
    return findPageById(currentPageId, pages);
  };

  const getCurrentPageBlocks = () => {
    if (!currentPageId) return [];
    return blocks[currentPageId] || [];
  };

  const updateBlock = (
    pageId: string,
    blockId: string,
    updates: Partial<Block>
  ) => {
    setBlocks((prevBlocks) => {
      const pageBlocks = prevBlocks[pageId] || [];
      const updatedPageBlocks = pageBlocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      );
      return { ...prevBlocks, [pageId]: updatedPageBlocks };
    });
  };

  const addBlock = (pageId: string, block: Block) => {
    setBlocks((prevBlocks) => {
      const pageBlocks = prevBlocks[pageId] || [];
      return { ...prevBlocks, [pageId]: [...pageBlocks, block] };
    });
  };

  const deleteBlock = (pageId: string, blockId: string) => {
    setBlocks((prevBlocks) => {
      const pageBlocks = prevBlocks[pageId] || [];
      const updatedPageBlocks = pageBlocks.filter(
        (block) => block.id !== blockId
      );
      return { ...prevBlocks, [pageId]: updatedPageBlocks };
    });
  };

  // Helper function to recursively update a page in the tree
  const updatePageInTree = (
    pages: Page[],
    id: string,
    updateFn: (page: Page) => Page
  ): Page[] => {
    return pages.map((page) => {
      if (page.id === id) {
        return updateFn(page);
      }
      if (page.children.length > 0) {
        return {
          ...page,
          children: updatePageInTree(page.children, id, updateFn),
        };
      }
      return page;
    });
  };

  // Helper function to delete a page from the tree
  const deletePageFromTree = (pages: Page[], id: string): Page[] => {
    return pages.filter((page) => {
      if (page.id === id) return false;
      if (page.children.length > 0) {
        page.children = deletePageFromTree(page.children, id);
      }
      return true;
    });
  };

  const createPage = (title: string, parentId: string | null) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title,
      parentId,
      children: [],
    };

    setBlocks(
      (prevBlocks) =>
        ({
          ...prevBlocks,
          [newPage.id]: [
            {
              id: `block-${Date.now()}-1`,
              type: "heading_1",
              content: title,
            },
            {
              id: `block-${Date.now()}-2`,
              type: "paragraph",
              content: "",
            },
          ],
        } as any)
    );

    if (parentId) {
      setPages((prevPages) => {
        return updatePageInTree(prevPages, parentId, (page) => ({
          ...page,
          children: [...page.children, newPage],
        }));
      });
    } else {
      setPages((prevPages) => [...prevPages, newPage]);
    }

    return newPage;
  };

  const deletePage = (id: string) => {
    setPages((prevPages) => deletePageFromTree(prevPages, id));
    setBlocks((prevBlocks) => {
      const newBlocks = { ...prevBlocks };
      delete newBlocks[id];
      return newBlocks;
    });
  };

  const updatePageTitle = (id: string, title: string) => {
    setPages((prevPages) => {
      return updatePageInTree(prevPages, id, (page) => ({
        ...page,
        title,
      }));
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const value = {
    pages,
    currentPageId,
    blocks,
    expandedPageIds,
    isPageExpanded,
    togglePageExpanded,
    setCurrentPageId,
    getCurrentPage,
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
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
