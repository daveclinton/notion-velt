"use client";

import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "../toolbar";
import { Cover } from "../cover";
import { CommentSidebar } from "../comment-sidebar";

import { useParams } from "next/navigation";
import { useDocumentStore } from "@/hooks/use-document";
import { useCoverImage } from "@/hooks/use-cover-image";

const DocumentPage = () => {
  const EditorComponent = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const { document, setDocument, updateDocument } = useDocumentStore();
  const params = useParams();
  const coverImage = useCoverImage();

  const onCoverChange = () => {
    coverImage.onOpen();
  };

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

  useEffect(() => {
    const documentId = params.documentId as string;
    if (documentId) {
      setDocument(documentId);
    }
  }, [params.documentId, setDocument]);

  const onChange = (content: string) => {
    useDocumentStore.getState().updateDocument({ content });
    console.log("Updated content:", content);
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
        onChange={onCoverChange}
        onRemove={onCoverRemove}
      />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <EditorComponent
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
      <CommentSidebar documentId={document._id} />
    </div>
  );
};

export default DocumentPage;
