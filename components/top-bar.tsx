"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Banner } from "./banner";
import { Title } from "./title";

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

export const TopNavbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document: StaticDocument = {
    _id: (params.documentId as string) || "1",
    title: "Sample Document",
    isArchived: false,
    isPublished: false,
    icon: "📄",
  };

  return (
    <>
      <nav className=" px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
