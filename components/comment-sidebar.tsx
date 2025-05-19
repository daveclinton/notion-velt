"use client";

import { useState, useRef, FC } from "react";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  MessageSquare,
  Send,
  Star,
  MoreHorizontal,
  MessageSquareText,
  ChevronsLeft,
} from "lucide-react";

interface Comment {
  id: number;
  text: string;
  user: string;
  timestamp: Date;
}

interface CommentSidebarProps {
  documentId: string;
}

export const CommentSidebar: FC<CommentSidebarProps> = ({ documentId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<
    "all" | "mentions" | "none"
  >("all");
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleAddComment = (): void => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: commentText,
          user: "You",
          timestamp: new Date(),
        },
      ]);
      setCommentText("");
      setNotifications("all");
      console.log(documentId);
    }
  };

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  const HeaderContent = () => (
    <div className="group flex items-center justify-between w-full">
      <div
        className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={toggleSidebar}
        role="button"
      >
        <ChevronsLeft className="h-6 w-6" />
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-[color:var(--color-sidebar-accent)] rounded-full h-8 w-8 flex items-center justify-center">
          <span className="text-sm">D</span>
        </div>
        <button className="flex items-center gap-2 hover:bg-[color:var(--color-sidebar-accent)] px-2 py-1 rounded cursor-pointer">
          <span>Share</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-[color:var(--color-sidebar-accent)] cursor-pointer rounded"
        >
          <MessageSquareText size={20} />
        </button>
        <button className="p-1 hover:bg-[color:var(--color-sidebar-accent)] cursor-pointer rounded">
          <Star size={20} />
        </button>
        <button className="p-1 hover:bg-[color:var(--color-sidebar-accent)] cursor-pointer rounded">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={cn(
          "fixed top-0 right-0 p-4 text-[color:var(--color-sidebar-foreground)] z-30 transition-all duration-300",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <HeaderContent />
      </div>

      <div
        ref={sidebarRef}
        className={cn(
          "fixed right-0 top-0 h-screen w-80 bg-[color:var(--color-sidebar)] text-[color:var(--color-sidebar-foreground)] border-l border-[color:var(--color-sidebar-border)] flex flex-col z-50 transition-all duration-300",
          !isOpen && "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[color:var(--color-sidebar-border)]">
          <HeaderContent />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-[color:var(--color-sidebar-border)]">
          <h2 className="font-medium">Comments & suggestions</h2>
          <button className="p-1 hover:bg-[color:var(--color-sidebar-accent)] rounded">
            <MoreHorizontal size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-[color:var(--color-sidebar-border)]">
          <p className="text-sm text-[color:var(--color-sidebar-muted-foreground)] mb-2">
            Notify me for
          </p>
          <button className="w-full flex items-center justify-between p-2 bg-[color:var(--color-sidebar-accent)] rounded hover:bg-[color:var(--color-sidebar-border)]">
            <div className="flex items-center gap-2">
              <Bell size={18} />
              <span>
                {notifications === "all" && "All comments"}
                {notifications === "mentions" && "Mentions only"}
                {notifications === "none" && "No notifications"}
              </span>
            </div>
            <ChevronDown size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[color:var(--color-sidebar-muted-foreground)]">
              <div className="mb-4 p-3 border-2 border-[color:var(--color-sidebar-border)] rounded-lg">
                <MessageSquare size={32} />
              </div>
              <p className="text-center mb-6">
                No open comments or suggestions
              </p>
              <button
                className="px-4 py-2 border border-[color:var(--color-sidebar-border)] rounded-md hover:bg-[color:var(--color-sidebar-accent)]"
                onClick={() =>
                  document.getElementById("comment-input")?.focus()
                }
              >
                Add comment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment: Comment) => (
                <div
                  key={comment.id}
                  className="bg-[color:var(--color-sidebar-accent)] p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-xs text-[color:var(--color-sidebar-muted-foreground)]">
                      {comment.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[color:var(--color-sidebar-border)]">
          <div className="bg-[color:var(--color-sidebar-accent)] rounded-lg flex items-center p-2">
            <input
              id="comment-input"
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent outline-none text-sm"
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCommentText(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <button
              className={cn(
                "p-1 rounded-full",
                commentText.trim()
                  ? "text-[color:var(--color-sidebar-primary)] hover:bg-[color:var(--color-sidebar-border)]"
                  : "text-[color:var(--color-sidebar-muted-foreground)]"
              )}
              disabled={!commentText.trim()}
              onClick={handleAddComment}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
