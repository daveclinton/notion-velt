import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Block, BlockType } from "@/types";
import { useApp } from "@/lib/context/app-context";
import { Checkbox } from "@/components/ui/checkbox";
import DOMPurify from "dompurify";

interface EditorBlockProps {
  block: Block;
  pageId: string;
  isFocused?: boolean;
  onFocus: () => void;
  onEnter: () => void;
  onBackspace: () => void;
  onTab: () => void;
  index?: number;
}

export function EditorBlock({
  block,
  pageId,
  isFocused = false,
  onFocus,
  onEnter,
  onBackspace,
  onTab,
  index = 0,
}: EditorBlockProps) {
  const { updateBlock } = useApp();
  const [content, setContent] = useState(block.content || "");
  const [checked, setChecked] = useState(!!block.checked);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Add refs to track selection and cursor position
  const selectionStateRef = useRef<{
    startOffset: number;
    endOffset: number;
    startContainer: Node | null;
    endContainer: Node | null;
  }>({
    startOffset: 0,
    endOffset: 0,
    startContainer: null,
    endContainer: null,
  });

  const isEditingRef = useRef(false);

  useEffect(() => {
    if (isFocused && contentEditableRef.current) {
      contentEditableRef.current.focus();

      // Only set cursor position on initial focus or when not editing
      if (!isEditingRef.current) {
        try {
          const selection = window.getSelection();
          if (selection) {
            const range = document.createRange();
            const contentNode = contentEditableRef.current;

            if (contentNode.childNodes.length === 0) {
              contentNode.innerHTML = "<br>";
            }

            range.selectNodeContents(contentNode);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        } catch (e) {
          console.error("Error setting cursor position:", e);
        }
      }
    }
  }, [isFocused]);

  // Sync component state with prop changes
  useEffect(() => {
    // Only update content from props if we're not currently editing
    // This prevents cursor jumps during collaborative editing
    if (!isEditingRef.current && block.content !== content) {
      setContent(block.content || "");
    }

    setChecked(!!block.checked);
  }, [block.content, block.checked]);

  // Helper function to save current selection state
  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && contentEditableRef.current) {
        const range = sel.getRangeAt(0);

        // Only save if the selection is within our contentEditable
        if (
          contentEditableRef.current.contains(range.commonAncestorContainer)
        ) {
          selectionStateRef.current = {
            startOffset: range.startOffset,
            endOffset: range.endOffset,
            startContainer: range.startContainer,
            endContainer: range.endContainer,
          };
        }
      }
    }
  };

  // Helper function to restore selection
  const restoreSelection = () => {
    if (
      window.getSelection &&
      contentEditableRef.current &&
      selectionStateRef.current.startContainer &&
      document.contains(selectionStateRef.current.startContainer) &&
      document.contains(selectionStateRef.current.endContainer)
    ) {
      try {
        const sel = window.getSelection();
        if (sel) {
          const range = document.createRange();
          range.setStart(
            selectionStateRef.current.startContainer,
            selectionStateRef.current.startOffset
          );
          range.setEnd(
            selectionStateRef.current.endContainer as Node,
            selectionStateRef.current.endOffset
          );
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } catch (e) {
        console.error("Error restoring selection:", e);
      }
    }
  };

  // Handle content changes without using dangerouslySetInnerHTML
  const handleContentChange = () => {
    if (!contentEditableRef.current) return;

    isEditingRef.current = true;
    saveSelection();

    const rawContent = contentEditableRef.current.innerHTML;
    const sanitizedContent = DOMPurify.sanitize(rawContent);

    // Only update if content actually changed
    if (sanitizedContent !== content) {
      setContent(sanitizedContent);
      updateBlock(pageId, block.id, { content: sanitizedContent });
    }

    // Use a short timeout to restore selection after React updates
    setTimeout(() => {
      if (
        contentEditableRef.current &&
        document.activeElement === contentEditableRef.current
      ) {
        restoreSelection();
      }
      // Reset editing flag after a brief delay to allow for focus events
      setTimeout(() => {
        isEditingRef.current = false;
      }, 100);
    }, 0);
  };

  // Handle key events
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    } else if (e.key === "Backspace" && isContentEmpty()) {
      e.preventDefault();
      onBackspace();
    } else if (e.key === "Tab") {
      e.preventDefault();
      onTab();
    }
  };

  // Check if content is empty
  const isContentEmpty = (): boolean => {
    if (!contentEditableRef.current) return true;

    const text = contentEditableRef.current.textContent || "";
    const innerHTML = contentEditableRef.current.innerHTML;
    return (
      text.trim() === "" &&
      (innerHTML === "" || innerHTML === "<br>" || innerHTML === "&nbsp;")
    );
  };

  // Handler for when focus leaves the contentEditable
  const handleBlur = () => {
    handleContentChange();
    isEditingRef.current = false;
  };

  // Handler for when the contentEditable gets focus
  const handleFocusIn = () => {
    onFocus();
    isEditingRef.current = true;
  };

  // Handle checkbox state
  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
    updateBlock(pageId, block.id, { checked });
  };

  // Render content based on block type - now without dangerouslySetInnerHTML
  const renderBlockContent = () => {
    // Setup the contentEditable element after rendering
    const setupContentEditable = (element: HTMLDivElement | null) => {
      if (element) {
        contentEditableRef.current = element;

        // Initialize content only once when the ref is set
        if (element.innerHTML === "" && content) {
          element.innerHTML = content;
        }
      }
    };

    // Common props for all contentEditable elements
    const contentEditableProps = {
      ref: setupContentEditable,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onInput: handleContentChange,
      onKeyDown: handleKeyDown,
      onFocus: handleFocusIn,
      onBlur: handleBlur,
      "data-placeholder": isContentEmpty() ? "Type here..." : undefined,
    };

    switch (block.type) {
      case BlockType.HEADING_1:
        return (
          <div
            {...contentEditableProps}
            className="outline-none text-2xl font-bold min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
          />
        );
      case BlockType.HEADING_2:
        return (
          <div
            {...contentEditableProps}
            className="outline-none text-xl font-bold min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
          />
        );
      case BlockType.HEADING_3:
        return (
          <div
            {...contentEditableProps}
            className="outline-none text-lg font-bold min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
          />
        );
      case BlockType.BULLET_LIST:
        return (
          <div className="flex">
            <div className="mr-2 mt-1.5 text-gray-500 select-none">•</div>
            <div
              {...contentEditableProps}
              className="outline-none flex-1 min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
            />
          </div>
        );
      case BlockType.NUMBERED_LIST:
        return (
          <div className="flex">
            <div className="mr-2 text-gray-500 select-none whitespace-nowrap">
              {index + 1}.
            </div>
            <div
              {...contentEditableProps}
              className="outline-none flex-1 min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
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
              aria-label="Toggle task completion"
            />
            <div
              {...contentEditableProps}
              aria-checked={checked}
              className={cn(
                "outline-none flex-1 min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400",
                checked && "line-through text-gray-400"
              )}
            />
          </div>
        );
      case BlockType.CODE:
        return (
          <div className="bg-gray-100 rounded p-2 font-mono text-sm">
            <div
              {...contentEditableProps}
              className="outline-none whitespace-pre-wrap min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
              data-placeholder="Code..."
            />
          </div>
        );
      case BlockType.PARAGRAPH:
      default:
        return (
          <div
            {...contentEditableProps}
            className="outline-none min-h-[1.5em] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "p-1 my-1 rounded hover:bg-gray-100/50 transition-colors",
        isFocused && "bg-gray-100/80"
      )}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {renderBlockContent()}
    </div>
  );
}
