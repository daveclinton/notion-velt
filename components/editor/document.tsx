"use client";

import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { CommentSidebar } from "@/components/comment-sidebar";

import { useParams } from "next/navigation";
import { useDocumentStore } from "@/hooks/use-document";
import { CoverImageModal } from "../modals/cover-image-modal";
import { useSetDocument } from "@veltdev/react";

const DocumentPage = () => {
  const EditorComponent = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const { document, setDocument, updateDocument } = useDocumentStore();
  const params = useParams();

  useEffect(() => {
    const documentId = params.documentId as string;
    if (documentId) {
      setDocument(documentId);
    }
  }, [params.documentId, setDocument]);

  const onChange = (content: string) => {
    updateDocument({ content });
    console.log("Updated content:", content);
  };

  useSetDocument(params.documentId as string, {
    documentName: document?.initialData.title || "Untitled",
  });
  const onCoverRemove = () => {
    updateDocument({
      initialData: {
        ...document?.initialData,
        title: document?.initialData.title || "Untitled",
        icon: document?.initialData.icon,
        coverImage: undefined,
      },
    });
  };

  if (!document) {
    return (
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <Cover
        url={document.initialData.coverImage}
        preview={document.preview}
        onRemove={onCoverRemove}
      />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} preview={document.preview} />
        <EditorComponent
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
      <CommentSidebar documentId={document._id} />
      <CoverImageModal />
    </div>
  );
};

export default DocumentPage;
