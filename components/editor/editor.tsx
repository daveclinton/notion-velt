"use client";
import { useState } from "react";
import { useApp } from "@/lib/context/app-context";
import { Block, BlockType } from "@/types";
import { EditorBlock } from "./editor-block";
import { EditorToolbar } from "./editor-toolbar";

import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "./page-header";
import { SidebarTrigger } from "../ui/sidebar";

export function Editor() {
  const {
    currentPageId,
    getCurrentPage,
    getCurrentPageBlocks,
    addBlock,
    deleteBlock,
  } = useApp();
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  const currentPage = getCurrentPage();
  const blocks = getCurrentPageBlocks();

  if (!currentPageId || !currentPage) {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  const handleBlockAdd = (
    index: number,
    type: BlockType = BlockType.PARAGRAPH
  ) => {
    if (!currentPageId) return;

    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      content: "",
      ...(type === BlockType.TO_DO ? { checked: false } : {}),
    };

    addBlock(currentPageId, newBlock);
    setFocusedBlockId(newBlock.id);
  };

  const handleBlockDelete = (blockId: string) => {
    if (!currentPageId) return;
    deleteBlock(currentPageId, blockId);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <SidebarTrigger className="-ml-1" />
      <div className="max-w-3xl mx-auto">
        <PageHeader page={currentPage} />

        {blocks.map((block, index) => (
          <EditorBlock
            key={block.id}
            block={block}
            pageId={currentPageId}
            isFocused={focusedBlockId === block.id}
            onFocus={() => setFocusedBlockId(block.id)}
            onEnter={() => handleBlockAdd(index + 1)}
            onBackspace={() => {
              if (blocks.length > 1) {
                handleBlockDelete(block.id);
                const prevBlockIndex = Math.max(0, index - 1);
                setFocusedBlockId(blocks[prevBlockIndex].id);
              }
            }}
            onTab={() => {
              // Handle tab (convert block type)
            }}
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
              if (currentPageId && focusedBlockId) {
                // Find the block
                const blockIndex = blocks.findIndex(
                  (b) => b.id === focusedBlockId
                );
                if (blockIndex >= 0) {
                  deleteBlock(currentPageId, focusedBlockId);

                  const newBlock: Block = {
                    id: `block-${Date.now()}-${Math.floor(
                      Math.random() * 1000
                    )}`,
                    type,
                    content: blocks[blockIndex].content,
                    ...(type === BlockType.TO_DO ? { checked: false } : {}),
                  };

                  addBlock(currentPageId, newBlock);
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
