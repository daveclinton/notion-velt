"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { useEffect } from "react";
import { useDocumentStore } from "@/hooks/use-document";
import { Title } from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const TopNavbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const { document, setDocument } = useDocumentStore();

  useEffect(() => {
    const documentId = params.documentId as string;
    if (documentId) {
      setDocument(documentId);
    }
  }, [params.documentId, setDocument]);

  if (!document) {
    return <nav className="px-3 py-2">No document</nav>;
  }

  return (
    <nav className="px-3 py-2 flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="button"
          onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground"
        />
      )}
      <div className="flex items-center justify-between">
        <Title initialData={document} />
      </div>
    </nav>
  );
};
