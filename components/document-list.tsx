"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface StaticDocument {
  _id: string;
  title: string;
  icon?: string;
  parentDocumentId?: string;
}

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Static dummy documents
  const documents: StaticDocument[] = [
    { _id: "1", title: "Project Plan", icon: "📑" },
    { _id: "2", title: "Meeting Notes", icon: "📝", parentDocumentId: "1" },
    { _id: "3", title: "Task List", icon: "✅", parentDocumentId: "1" },
    { _id: "4", title: "Personal Notes", icon: "📓" },
    { _id: "5", title: "Ideas", icon: "💡", parentDocumentId: "4" },
  ];

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // Filter documents by parentDocumentId to simulate hierarchy
  const filteredDocuments = documents.filter(
    (document) => document.parentDocumentId === parentDocumentId
  );

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          filteredDocuments.length === 0 && "block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {filteredDocuments.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
