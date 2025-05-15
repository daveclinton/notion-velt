import { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/context/app-context";
import { Page } from "@/types";
import { useSetDocument } from "@veltdev/react";

interface PageHeaderProps {
  page: Page;
}

export function PageHeader({ page }: PageHeaderProps) {
  const { updatePageTitle } = useApp();
  const [title, setTitle] = useState(page.title);
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const documentId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  useSetDocument(documentId, { documentName: title });

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
      </div>
    </div>
  );
}
