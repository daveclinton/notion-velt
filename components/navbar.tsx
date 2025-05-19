"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Banner } from "./banner";
import { Menu } from "./menu";
import { Title } from "./title";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

interface StaticDocument {
  _id: string;
  title: string;
  isArchived: boolean;
  isPublished: boolean;
  icon?: string;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  // Static dummy document for UI rendering
  const document: StaticDocument = {
    _id: (params.documentId as string) || "1",
    title: "Sample Document",
    isArchived: false,
    isPublished: false,
    icon: "📄",
  };

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
