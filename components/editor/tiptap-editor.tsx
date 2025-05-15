/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  Editor as TiptapEditorType,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Extension } from "@tiptap/core";
import { Block, BlockType } from "@/types";
import { cn } from "@/lib/utils";
import {
  highlightComments,
  TiptapVeltComments,
  triggerAddComment,
} from "@veltdev/tiptap-velt-comments";
import { useCommentAnnotations } from "@veltdev/react";

interface TipTapEditorProps {
  block: Block;
  pageId: string;
  isFocused?: boolean;
  onFocus: () => void;
  onEnter: () => void;
  onBackspace: () => void;
  index?: number;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
}

interface EditorConfig {
  extensions: any[];
  content: string | JSONContent;
  immediatelyRender: boolean;
  editorProps: {
    attributes: {
      class: string;
    };
  };
  onUpdate: ({ editor }: { editor: TiptapEditorType }) => void;
}

const CustomKeyboardShortcuts = ({
  onEnter,
  onBackspace,
}: {
  onEnter: () => void;
  onBackspace: () => void;
}): Extension => {
  return Extension.create({
    name: "customKeyboardShortcuts",
    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (!editor.isActive("codeBlock")) {
            onEnter();
            return true;
          }
          return false;
        },
        Backspace: ({ editor }) => {
          if (editor.isEmpty) {
            onBackspace();
            return true;
          }
          return false;
        },
      };
    },
  });
};

const CommentShortcut = Extension.create({
  name: "commentShortcut",
  addOptions() {
    return {
      config: {},
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-c": () => {
        triggerAddComment(this.editor, this.options.config);
        return true;
      },
    };
  },
});

export function TipTapEditor({
  block,
  pageId,
  isFocused = false,
  onFocus,
  onEnter,
  onBackspace,
  index = 0,
  updateBlock,
}: TipTapEditorProps) {
  const tiptapVeltCommentConfig = {
    context: {
      pageId: pageId,
      blockId: block.id,
    },
  };

  const getEditorConfig = useCallback(
    (blockType: BlockType): EditorConfig => {
      const baseConfig: EditorConfig = {
        extensions: [
          TiptapVeltComments,
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3],
            },
          }),
          Placeholder.configure({
            placeholder: "Type here...",
          }),
          TaskList.configure({
            HTMLAttributes: {
              class: "task-list",
            },
          }),
          TaskItem.configure({
            HTMLAttributes: {
              class: "task-item",
            },
            nested: false,
          }),
          CustomKeyboardShortcuts({
            onEnter,
            onBackspace,
          }),
          CommentShortcut.configure({
            config: tiptapVeltCommentConfig,
          }),
        ],
        immediatelyRender: false,
        content: block.content || "",
        editorProps: {
          attributes: {
            class: "outline-none min-h-[1.5em] text-gray-200",
          },
        },
        onUpdate: ({ editor }: { editor: TiptapEditorType }) => {
          const content = editor.getHTML();
          updateBlock(block.id, { content });
        },
      };

      switch (blockType) {
        case BlockType.HEADING_1:
          return { ...baseConfig, content: `<h1>${block.content || ""}</h1>` };
        case BlockType.HEADING_2:
          return { ...baseConfig, content: `<h2>${block.content || ""}</h2>` };
        case BlockType.HEADING_3:
          return { ...baseConfig, content: `<h3>${block.content || ""}</h3>` };
        case BlockType.BULLET_LIST:
          return {
            ...baseConfig,
            content: block.content || "<ul><li></li></ul>",
          };
        case BlockType.NUMBERED_LIST:
          return {
            ...baseConfig,
            content: block.content || "<ol><li></li></ol>",
          };
        case BlockType.TO_DO:
          return {
            ...baseConfig,
            content:
              block.content ||
              '<ul data-type="taskList"><li data-type="taskItem" data-checked="false"></li></ul>',
          };
        case BlockType.CODE:
          return {
            ...baseConfig,
            content: block.content || "<pre><code></code></pre>",
          };
        default:
          return baseConfig;
      }
    },
    [
      onEnter,
      onBackspace,
      tiptapVeltCommentConfig,
      block.content,
      block.id,
      updateBlock,
      pageId,
    ]
  );

  const editorConfig = useMemo(
    () => getEditorConfig(block.type),
    [block.type, getEditorConfig]
  );
  const editor = useEditor(editorConfig, [block.id]);
  const [hasComments, setHasComments] = useState(false);
  const commentAnnotations = useCommentAnnotations();

  useEffect(() => {
    if (isFocused && editor && !editor.isFocused) {
      editor.commands.focus("end");
    }
  }, [isFocused, editor]);

  useEffect(() => {
    if (editor && !editor.isFocused && block.content !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== block.content) {
        editor.commands.setContent(block.content || "");
      }
    }
  }, [block.content, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  useEffect(() => {
    if (editor && commentAnnotations?.length) {
      highlightComments(editor, commentAnnotations);
    }
  }, [editor, commentAnnotations]);

  useEffect(() => {
    if (editor) {
      const checkComments = () => {
        const editorDom = editor.view.dom;
        const hasComments = editorDom.querySelector(".velt-comment") !== null;
        setHasComments(hasComments);
      };
      checkComments();
      editor.on("update", checkComments);
      return () => {
        editor.off("update", checkComments);
      };
    }
  }, [editor, commentAnnotations]);

  const getBlockClassName = useCallback((): string => {
    switch (block.type) {
      case BlockType.HEADING_1:
        return "text-2xl font-bold text-gray-100";
      case BlockType.HEADING_2:
        return "text-xl font-bold text-gray-100";
      case BlockType.HEADING_3:
        return "text-lg font-bold text-gray-100";
      case BlockType.CODE:
        return "rounded p-2 font-mono text-sm text-gray-200 whitespace-pre-wrap";
      case BlockType.TO_DO:
        return block.checked ? "line-through text-gray-500" : "text-gray-200";
      default:
        return "text-gray-200";
    }
  }, [block.type, block.checked]);

  const renderPrefix = useCallback(() => {
    if (block.type === BlockType.NUMBERED_LIST) {
      return (
        <div className="mr-2 text-gray-400 select-none whitespace-nowrap">
          {index + 1}.
        </div>
      );
    } else if (block.type === BlockType.BULLET_LIST) {
      return <div className="mr-2 mt-1.5 text-gray-400 select-none">•</div>;
    }
    return null;
  }, [block.type, index]);

  if (!editor) {
    return (
      <div
        className={cn(
          "p-1 my-1 rounded animate-pulse",
          block.type === BlockType.HEADING_1 && "h-10",
          block.type === BlockType.HEADING_2 && "h-8",
          block.type === BlockType.HEADING_3 && "h-6",
          block.type === BlockType.CODE && "h-16",
          (block.type === BlockType.BULLET_LIST ||
            block.type === BlockType.NUMBERED_LIST) &&
            "h-6",
          block.type === BlockType.TO_DO && "h-6",
          block.type === BlockType.PARAGRAPH && "h-6"
        )}
      >
        <div className="flex">
          {(block.type === BlockType.NUMBERED_LIST ||
            block.type === BlockType.BULLET_LIST) && (
            <div className="mr-2 w-4 h-4 rounded-full" />
          )}
          <div className="flex-1 rounded h-4" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("p-1 my-1 rounded transition-colors", isFocused && "")}
      data-block-id={block.id}
      data-block-type={block.type}
      onClick={onFocus}
    >
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="border rounded shadow-md p-1 flex gap-1"
        >
          <button
            onClick={() => {
              if (!editor.state.selection.empty) {
                triggerAddComment(editor, tiptapVeltCommentConfig);
              }
            }}
            disabled={editor.state.selection.empty}
            className={cn(
              "px-2 py-1 text-sm rounded",
              editor.state.selection.empty
                ? "text-gray-400 cursor-not-allowed"
                : "text-white hover:"
            )}
            title="Add comment"
          >
            Comment
          </button>
        </BubbleMenu>
      )}
      <div
        className={cn("flex", block.type === BlockType.TO_DO && "items-start")}
      >
        {hasComments && <span className="mr-2 text-blue-400">💬</span>}
        {renderPrefix()}
        <div className={cn("flex-1", getBlockClassName())}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
