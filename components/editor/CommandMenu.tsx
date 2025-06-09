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

  const essentialCommands = suggestions.filter((item) =>
    [
      "Heading 1",
      "Heading 2",
      "Bullet List",
      "Ordered List",
      "Code Block",
      "Link",
      "Bold Text",
      "Italic Text",
    ].includes(item.title)
  );

  return (
    <SlashCmd.Root editor={editor}>
      <SlashCmd.Cmd className="slash-cmd-root">
        <SlashCmd.Empty className="slash-cmd-empty">
          <div className="empty-state">
            <svg
              width="20"
              height="20"
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
          {essentialCommands.map((item) => (
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
        .slash-cmd-empty {
          padding: 16px 12px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-align: center;
        }

        .empty-state svg {
          opacity: 0.5;
        }

        .empty-state span {
          font-size: 13px;
          font-weight: 500;
        }

        .slash-cmd-list {
          padding: 6px;
          max-height: 288px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        .slash-cmd-list::-webkit-scrollbar {
          width: 4px;
        }

        .slash-cmd-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .slash-cmd-list::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 2px;
        }

        .slash-cmd-item:hover,
        .slash-cmd-item[data-selected="true"] {
          background: #f3f4f6;
        }

        .command-item-content {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          width: 100%;
        }

        .command-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 5px;
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
          width: 14px;
          height: 14px;
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
          font-size: 13px;
          font-weight: 500;
          color: #111827;
          line-height: 1.2;
        }

        .command-description {
          font-size: 11px;
          color: #6b7280;
          line-height: 1.2;
        }

        .command-shortcut {
          font-size: 10px;
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

        .dark .slash-cmd-root {
          background: #1f2937;
          border-color: #374151;
        }

        .dark .slash-cmd-item:hover,
        .dark .slash-cmd-item[data-selected="true"] {
          background: #374151;
        }

        .dark .command-icon {
          background: #374151;
          border-color: #4b5563;
        }

        .dark .slash-cmd-item:hover .command-icon,
        .dark .slash-cmd-item[data-selected="true"] .command-icon {
          background: #4338ca;
          border-color: #6366f1;
        }

        .dark .command-title {
          color: #f9fafb;
        }

        .dark .command-description {
          color: #9ca3af;
        }

        .dark .command-shortcut {
          background: #374151;
          border-color: #4b5563;
          color: #9ca3af;
        }

        .dark .slash-cmd-item:hover .command-shortcut,
        .dark .slash-cmd-item[data-selected="true"] .command-shortcut {
          background: #4338ca;
          border-color: #6366f1;
          color: #c7d2fe;
        }

        .dark .empty-state {
          color: #9ca3af;
        }

        .dark .slash-cmd-list::-webkit-scrollbar-thumb {
          background-color: #4b5563;
        }
      `}</style>
    </SlashCmd.Root>
  );
}

function getCommandIcon(title: string) {
  const icons: Record<string, JSX.Element> = {
    "Heading 1": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <text x="2" y="18" fontSize="14" fontWeight="bold" fill="currentColor">
          H1
        </text>
      </svg>
    ),
    "Heading 2": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <text x="2" y="18" fontSize="14" fontWeight="bold" fill="currentColor">
          H2
        </text>
      </svg>
    ),
    "Bullet List": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="5" cy="7" r="1.5" />
        <circle cx="5" cy="12" r="1.5" />
        <circle cx="5" cy="17" r="1.5" />
        <line x1="9" y1="7" x2="19" y2="7" />
        <line x1="9" y1="12" x2="19" y2="12" />
        <line x1="9" y1="17" x2="19" y2="17" />
      </svg>
    ),
    "Ordered List": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        <line x1="10" y1="6" x2="19" y2="6" />
        <line x1="10" y1="12" x2="19" y2="12" />
        <line x1="10" y1="18" x2="19" y2="18" />
      </svg>
    ),
    "Code Block": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8l4 4-4 4m8 0l-4-4 4-4" />
      </svg>
    ),
    Link: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    "Bold Text": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </svg>
    ),
    "Italic Text": (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
      </svg>
    ),
  };

  return (
    icons[title] || (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  );
}

function getCommandDescription(title: string) {
  const descriptions: Record<string, string> = {
    "Heading 1": "Large section heading",
    "Heading 2": "Medium section heading",
    "Bullet List": "Create bulleted list",
    "Ordered List": "Create numbered list",
    "Code Block": "Insert code snippet",
    Link: "Insert hyperlink",
    "Bold Text": "Make text bold",
    "Italic Text": "Make text italic",
  };

  return descriptions[title] || "Format text";
}

function getCommandShortcut(title: string) {
  const shortcuts: Record<string, string> = {
    "Heading 1": "⌘1",
    "Heading 2": "⌘2",
    "Bullet List": "⌘L",
    "Ordered List": "⌘O",
    "Code Block": "⌘C",
    Link: "⌘K",
    "Bold Text": "⌘B",
    "Italic Text": "⌘I",
  };

  return shortcuts[title] || "";
}
