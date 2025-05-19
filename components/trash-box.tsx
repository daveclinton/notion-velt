"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface StaticDocument {
  _id: string;
  title: string;
}

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState("");

  // Static dummy documents
  const [documents, setDocuments] = useState<StaticDocument[]>([
    { _id: "1", title: "Deleted Note 1" },
    { _id: "2", title: "Old Project Plan" },
    { _id: "3", title: "Trash Memo" },
  ]);

  const filteredDocuments = documents.filter((document) =>
    document.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    console.log(documentId);
    event.stopPropagation();
    toast.success("Note restored!");
  };

  const onRemove = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc._id !== documentId));
    toast.success("Note deleted!");

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No documents found.
        </p>
        {filteredDocuments.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 
              flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
