/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCmd } from "@harshtalks/slash-tiptap";
import { Editor } from "@tiptap/react";
import { suggestions } from "./custom-extensions/suggestions-items";
import { JSX } from "react";

interface CommandMenuProps {
  editor: Editor | null;
}

export function CommandMenu({ editor }: CommandMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <SlashCmd.Root editor={editor}>
      <SlashCmd.Cmd className="slash-cmd-root">
        <SlashCmd.Empty className="slash-cmd-empty">
          <div className="empty-state">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span>No commands found</span>
          </div>
        </SlashCmd.Empty>
        <SlashCmd.List className="slash-cmd-list">
          {suggestions.map((item) => (
            <SlashCmd.Item
              value={item.title}
              onCommand={(val) => item.command(val)}
              key={item.title}
              className="slash-cmd-item"
            >
              <div className="command-item-content">
                <div className="command-icon">{getCommandIcon(item.title)}</div>
                <div className="command-text">
                  <span className="command-title">{item.title}</span>
                  <span className="command-description">
                    {getCommandDescription(item.title)}
                  </span>
                </div>
                <div className="command-shortcut">
                  {getCommandShortcut(item.title)}
                </div>
              </div>
            </SlashCmd.Item>
          ))}
        </SlashCmd.List>
      </SlashCmd.Cmd>

      <style jsx>{`
        .slash-cmd-root {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          max-width: 320px;
          max-height: 400px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
          z-index: 1000;
        }

        .slash-cmd-empty {
          padding: 32px 24px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #6b7280;
          text-align: center;
        }

        .empty-state svg {
          opacity: 0.5;
        }

        .empty-state span {
          font-size: 14px;
          font-weight: 500;
        }

        .slash-cmd-list {
          padding: 8px;
          max-height: 360px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        .slash-cmd-list::-webkit-scrollbar {
          width: 6px;
        }

        .slash-cmd-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .slash-cmd-list::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 3px;
        }

        .slash-cmd-list::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }

        .slash-cmd-item {
          border-radius: 8px;
          padding: 0;
          margin-bottom: 2px;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
          background: transparent;
        }

        .slash-cmd-item:hover,
        .slash-cmd-item[data-selected="true"] {
          background: #f3f4f6;
          transform: translateY(-1px);
        }

        .slash-cmd-item:active {
          transform: translateY(0);
        }

        .command-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          width: 100%;
        }

        .command-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .slash-cmd-item:hover .command-icon,
        .slash-cmd-item[data-selected="true"] .command-icon {
          background: #e0e7ff;
          border-color: #c7d2fe;
        }

        .command-icon svg {
          width: 16px;
          height: 16px;
          color: #64748b;
          transition: color 0.15s ease;
        }

        .slash-cmd-item:hover .command-icon svg,
        .slash-cmd-item[data-selected="true"] .command-icon svg {
          color: #4f46e5;
        }

        .command-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }

        .command-title {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          line-height: 1.2;
        }

        .command-description {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.2;
        }

        .command-shortcut {
          font-size: 11px;
          color: #9ca3af;
          background: #f9fafb;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          font-family: "SF Mono", Monaco, "Cascadia Code", monospace;
          flex-shrink: 0;
        }

        .slash-cmd-item:hover .command-shortcut,
        .slash-cmd-item[data-selected="true"] .command-shortcut {
          background: #eef2ff;
          border-color: #c7d2fe;
          color: #6366f1;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .slash-cmd-root {
            background: #1f2937;
            border-color: #374151;
          }

          .slash-cmd-item:hover,
          .slash-cmd-item[data-selected="true"] {
            background: #374151;
          }

          .command-icon {
            background: #374151;
            border-color: #4b5563;
          }

          .slash-cmd-item:hover .command-icon,
          .slash-cmd-item[data-selected="true"] .command-icon {
            background: #4338ca;
            border-color: #6366f1;
          }

          .command-title {
            color: #f9fafb;
          }

          .command-description {
            color: #9ca3af;
          }

          .command-shortcut {
            background: #374151;
            border-color: #4b5563;
            color: #9ca3af;
          }

          .slash-cmd-item:hover .command-shortcut,
          .slash-cmd-item[data-selected="true"] .command-shortcut {
            background: #4338ca;
            border-color: #6366f1;
            color: #c7d2fe;
          }

          .empty-state {
            color: #9ca3af;
          }
        }
      `}</style>
    </SlashCmd.Root>
  );
}

// Helper function to get command icons
function getCommandIcon(title: string) {
  const icons: Record<string, JSX.Element> = {
    text: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    ),
    "Heading 1": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 12h12M6 4v16M18 4v16" />
        <text x="20" y="16" fontSize="8" fill="currentColor">
          1
        </text>
      </svg>
    ),
    "Heading 2": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 12h12M6 4v16M18 4v16" />
        <text x="20" y="16" fontSize="8" fill="currentColor">
          2
        </text>
      </svg>
    ),
    "Heading 3": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 12h12M6 4v16M18 4v16" />
        <text x="20" y="16" fontSize="8" fill="currentColor">
          3
        </text>
      </svg>
    ),
    "Bullet List": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    "Ordered List": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="10" y1="6" x2="21" y2="6" />
        <line x1="10" y1="12" x2="21" y2="12" />
        <line x1="10" y1="18" x2="21" y2="18" />
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    ),
    Blockquote: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
    "Code Block": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16,18 22,12 16,6" />
        <polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    "Horizontal Rule": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),
    Link: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    "Task List": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3l8-8" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c2.12 0 4.07.74 5.61 1.98" />
      </svg>
    ),
    "Bold Text": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </svg>
    ),
    "Italic Text": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </svg>
    ),
    "Inline Code": (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16,18 22,12 16,6" />
        <polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    Strikethrough: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4H9a3 3 0 0 0-2.83 4" />
        <path d="M14 12a4 4 0 0 1 0 8H6" />
        <line x1="4" y1="12" x2="20" y2="12" />
      </svg>
    ),
  };

  return (
    icons[title] || (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  );
}

// Helper function to get command descriptions
function getCommandDescription(title: string) {
  const descriptions: Record<string, string> = {
    text: "Insert plain text paragraph",
    "Heading 1": "Large section heading",
    "Heading 2": "Medium section heading",
    "Heading 3": "Small section heading",
    "Bullet List": "Create bulleted list",
    "Ordered List": "Create numbered list",
    Blockquote: "Insert quote block",
    "Code Block": "Insert code snippet",
    "Horizontal Rule": "Add divider line",
    Link: "Insert hyperlink",
    "Task List": "Create checklist",
    "Bold Text": "Make text bold",
    "Italic Text": "Make text italic",
    "Inline Code": "Inline code format",
    Strikethrough: "Cross out text",
  };

  return descriptions[title] || "Format text";
}

// Helper function to get command shortcuts
function getCommandShortcut(title: string) {
  const shortcuts: Record<string, string> = {
    text: "⌘T",
    "Heading 1": "⌘1",
    "Heading 2": "⌘2",
    "Heading 3": "⌘3",
    "Bullet List": "⌘L",
    "Ordered List": "⌘O",
    Blockquote: "⌘Q",
    "Code Block": "⌘C",
    Link: "⌘K",
    "Bold Text": "⌘B",
    "Italic Text": "⌘I",
  };

  return shortcuts[title] || "";
}
