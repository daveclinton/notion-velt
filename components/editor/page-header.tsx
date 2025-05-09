import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApp } from "@/lib/context/app-context";
import { Page } from "@/types";

interface PageHeaderProps {
  page: Page;
}

export function PageHeader({ page }: PageHeaderProps) {
  const { updatePageTitle, collaborators } = useApp();
  const [title, setTitle] = useState(page.title);
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(page.title);
  }, [page.title]);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (title.trim() === "") {
      setTitle(page.title);
    } else {
      updatePageTitle(page.id, title);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(page.title);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          {isEditing ? (
            <input
              ref={titleInputRef}
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="w-full text-3xl font-bold outline-none border-b border-gray-300 py-1 px-0"
            />
          ) : (
            <h1
              className="text-3xl font-bold cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {page.emoji && <span className="mr-2">{page.emoji}</span>}
              {title}
            </h1>
          )}
        </div>

        <div className="flex -space-x-2">
          {collaborators.map((collaborator) => (
            <div key={collaborator.user.id} className="relative">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={collaborator.user.avatar} />
                <AvatarFallback>
                  {collaborator.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500 flex items-center">
        <span>Edited {new Date().toLocaleDateString()} • Auto-saved</span>
      </div>
    </div>
  );
}
