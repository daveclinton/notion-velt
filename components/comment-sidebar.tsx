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
  ChevronLeft,
  ChevronRight,
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

  return (
    <>
      <div
        className={cn(
          "fixed right-0 top-20 bg-neutral-900 text-white border-l border-t border-b border-neutral-700 rounded-l-md p-2 cursor-pointer transition-all duration-300 z-40",
          isOpen && "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      >
        <div className="flex flex-col items-center gap-1">
          <MessageSquare size={20} />
          <span className="text-xs font-medium">Comments</span>
          <div className="flex items-center justify-center">
            <ChevronLeft size={16} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed right-0 top-0 h-screen w-80 bg-neutral-900 text-white border-l border-neutral-700 flex flex-col z-50 transition-all duration-300",
          !isOpen && "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="bg-neutral-800 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-sm">D</span>
            </div>
            <button className="flex items-center gap-2 hover:bg-neutral-800 px-2 py-1 rounded">
              <span>Share</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-neutral-800 rounded">
              <MessageSquare size={20} />
            </button>
            <button className="p-1 hover:bg-neutral-800 rounded">
              <Star size={20} />
            </button>
            <button
              className="p-1 hover:bg-neutral-800 rounded"
              onClick={toggleSidebar}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Comments header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <h2 className="font-medium">Comments & suggestions</h2>
          <button className="p-1 hover:bg-neutral-800 rounded">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Notification settings */}
        <div className="p-4 border-b border-neutral-700">
          <p className="text-sm text-neutral-400 mb-2">Notify me for</p>
          <button className="w-full flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700">
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

        {/* Comments area */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400">
              <div className="mb-4 p-3 border-2 border-neutral-700 rounded-lg">
                <MessageSquare size={32} />
              </div>
              <p className="text-center mb-6">
                No open comments or suggestions
              </p>
              <button
                className="px-4 py-2 border border-neutral-600 rounded-md hover:bg-neutral-800"
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
                <div key={comment.id} className="bg-neutral-800 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.user}</span>
                    <span className="text-xs text-neutral-400">
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

        <div className="p-4 border-t border-neutral-700">
          <div className="bg-neutral-800 rounded-lg flex items-center p-2">
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
                  ? "text-blue-400 hover:bg-neutral-700"
                  : "text-neutral-500"
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
