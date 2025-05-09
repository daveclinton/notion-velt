import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Block, BlockType } from "@/types";
import { useApp } from "@/lib/context/app-context";
import { Checkbox } from "@/components/ui/checkbox";

interface EditorBlockProps {
  block: Block;
  pageId: string;
  isFocused?: boolean;
  onFocus: () => void;
  onEnter: () => void;
  onBackspace: () => void;
  onTab: () => void;
}

export function EditorBlock({
  block,
  pageId,
  isFocused = false,
  onFocus,
  onEnter,
  onBackspace,
  onTab,
}: EditorBlockProps) {
  const { updateBlock } = useApp();
  const [content, setContent] = useState(block.content);
  const [checked, setChecked] = useState(block.checked || false);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && contentEditableRef.current) {
      contentEditableRef.current.focus();
      // Place cursor at the end
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(contentEditableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isFocused]);

  useEffect(() => {
    setContent(block.content);
    setChecked(block.checked || false);
  }, [block]);

  const handleContentChange = () => {
    const newContent = contentEditableRef.current?.textContent || "";
    setContent(newContent);
    updateBlock(pageId, block.id, { content: newContent });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    } else if (e.key === "Backspace" && content === "") {
      e.preventDefault();
      onBackspace();
    } else if (e.key === "Tab") {
      e.preventDefault();
      onTab();
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
    updateBlock(pageId, block.id, { checked });
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case BlockType.HEADING_1:
        return (
          <div
            ref={contentEditableRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none text-2xl font-bold"
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case BlockType.HEADING_2:
        return (
          <div
            ref={contentEditableRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none text-xl font-bold"
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case BlockType.HEADING_3:
        return (
          <div
            ref={contentEditableRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none text-lg font-bold"
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case BlockType.BULLET_LIST:
        return (
          <div className="flex">
            <div className="mr-2 mt-1.5">•</div>
            <div
              ref={contentEditableRef}
              contentEditable
              suppressContentEditableWarning
              className="outline-none flex-1"
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      case BlockType.NUMBERED_LIST:
        return (
          <div className="flex">
            <div className="mr-2 text-gray-500">1.</div>
            <div
              ref={contentEditableRef}
              contentEditable
              suppressContentEditableWarning
              className="outline-none flex-1"
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      case BlockType.TO_DO:
        return (
          <div className="flex items-start">
            <Checkbox
              checked={checked}
              onCheckedChange={handleCheckboxChange}
              className="mr-2 mt-1"
            />
            <div
              ref={contentEditableRef}
              contentEditable
              suppressContentEditableWarning
              className={cn(
                "outline-none flex-1",
                checked && "line-through text-gray-400"
              )}
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      case BlockType.CODE:
        return (
          <div className="bg-gray-100 rounded p-2 font-mono text-sm">
            <div
              ref={contentEditableRef}
              contentEditable
              suppressContentEditableWarning
              className="outline-none whitespace-pre-wrap"
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
      case BlockType.PARAGRAPH:
      default:
        return (
          <div
            ref={contentEditableRef}
            contentEditable
            suppressContentEditableWarning
            className="outline-none"
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "p-1 my-1 rounded hover:bg-gray-100/50",
        isFocused && "bg-gray-100/80"
      )}
    >
      {renderBlockContent()}
    </div>
  );
}
