import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApp } from "@/lib/context/app-context";
import { Page } from "@/types";
import { useIdentify, useSetDocument } from "@veltdev/react";

interface PageHeaderProps {
  page: Page;
}

const dummyUsers = [
  {
    id: "user1",
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "alice@gmail.com",
    organizationId: "org123",
    color: "#FF5733",
    textColor: "#FFFFFF",
  },
  {
    id: "user2",
    name: "Bob Jones",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "bob@gmail.com",
    organizationId: "org123",
    color: "#33B5FF",
    textColor: "#FFFFFF",
  },
];

export function PageHeader({ page }: PageHeaderProps) {
  const { updatePageTitle } = useApp();
  const [title, setTitle] = useState(page.title);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(dummyUsers[0]);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useIdentify(
    {
      userId: currentUser.id,
      organizationId: currentUser.organizationId,
      name: currentUser.name,
      email: currentUser.email,
      photoUrl: currentUser.avatar,
      color: currentUser.color,
      textColor: currentUser.textColor,
    },
    { forceReset: true }
  );

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

  const switchUser = () => {
    setCurrentUser((prev) =>
      prev.id === dummyUsers[0].id ? dummyUsers[1] : dummyUsers[0]
    );
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

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>
                {currentUser.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <button
            onClick={switchUser}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Switch to {currentUser.id === "user1" ? "Bob" : "Alice"}
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex items-center">
        <span>
          Edited by {currentUser.name} {new Date().toLocaleDateString()} •
          Auto-saved
        </span>
      </div>
    </div>
  );
}
