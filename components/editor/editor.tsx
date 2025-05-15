"use client";
import { useState } from "react";
import { pageBlocks } from "@/lib/mock-data";
import { Block, BlockType, PageTreeType } from "@/types";
import { TipTapEditor } from "./tiptap-editor";
import { EditorToolbar } from "./editor-toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "./page-header";
import { VeltSidebarButton } from "@veltdev/react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export function Editor({
  currentPageId,
  currentPage,
}: {
  currentPageId: string;
  currentPage: PageTreeType;
}) {
  const [blocks, setBlocks] = useState<Block[]>(
    pageBlocks[currentPageId] || []
  );
  const { state, toggleSidebar } = useSidebar();
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  if (!currentPageId || !currentPage) {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4 bg-gray-800" />
          <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
          <Skeleton className="h-4 w-5/6 mb-2 bg-gray-800" />
          <Skeleton className="h-4 w-4/6 bg-gray-800" />
        </div>
      </div>
    );
  }

  const handleBlockAdd = (
    index: number,
    type: BlockType = BlockType.PARAGRAPH
  ) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      content: "",
      ...(type === BlockType.TO_DO ? { checked: false } : {}),
    };

    setBlocks((prev) => [
      ...prev.slice(0, index),
      newBlock,
      ...prev.slice(index),
    ]);
    setFocusedBlockId(newBlock.id);
  };

  const handleBlockDelete = (blockId: string) => {
    const blockIndex = blocks.findIndex((b) => b.id === blockId);
    if (blockIndex < 0) return;

    setBlocks((prev) => prev.filter((b) => b.id !== blockId));

    if (blocks.length > 1) {
      const prevBlockIndex = Math.max(0, blockIndex - 1);
      if (blocks[prevBlockIndex]) {
        setFocusedBlockId(blocks[prevBlockIndex].id);
      }
    }
  };

  const handleBlockUpdate = (blockId: string, updates: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-accent relative">
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        className={cn("size-9")}
        onClick={() => {
          toggleSidebar();
        }}
      >
        {state === "expanded" ? (
          <ChevronsLeft size={40} />
        ) : (
          <ChevronsRight size={40} />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      <div className="absolute top-6 right-6 -mr-1">
        <div className="toolbar">
          <VeltSidebarButton />
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <PageHeader page={currentPage} />
        {blocks.map((block, index) => (
          <TipTapEditor
            key={block.id}
            block={block}
            pageId={currentPageId}
            isFocused={focusedBlockId === block.id}
            onFocus={() => setFocusedBlockId(block.id)}
            onEnter={() => handleBlockAdd(index + 1)}
            onBackspace={() => {
              if (blocks.length > 1 && !block.content) {
                handleBlockDelete(block.id);
              }
            }}
            index={index}
            updateBlock={handleBlockUpdate}
          />
        ))}
        {blocks.length === 0 && (
          <button
            className="mt-4 text-gray-400 hover:text-gray-600"
            onClick={() => handleBlockAdd(0)}
          >
            Click to add content...
          </button>
        )}
        {focusedBlockId && (
          <EditorToolbar
            onBlockTypeChange={(type) => {
              if (focusedBlockId) {
                const blockIndex = blocks.findIndex(
                  (b) => b.id === focusedBlockId
                );
                if (blockIndex >= 0) {
                  const currentBlock = blocks[blockIndex];
                  const newBlock: Block = {
                    id: `block-${Date.now()}-${Math.floor(
                      Math.random() * 1000
                    )}`,
                    type,
                    content: currentBlock.content,
                    ...(type === BlockType.TO_DO ? { checked: false } : {}),
                  };
                  setBlocks((prev) => [
                    ...prev.slice(0, blockIndex),
                    newBlock,
                    ...prev.slice(blockIndex + 1),
                  ]);
                  setFocusedBlockId(newBlock.id);
                }
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
