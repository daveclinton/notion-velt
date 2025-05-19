"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const dummyDocument = {
  title: "Sample Document",
  content: JSON.stringify(
    [
      {
        id: "block1",
        type: "paragraph",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
        },
        content: [
          { type: "text", text: "Welcome to the sample document!", styles: {} },
        ],
        children: [],
      },
    ],
    null,
    2
  ),
};

const DocumentPage = () => {
  const EditorComponent = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const [document, setDocument] = useState(dummyDocument);
  const [isLoading] = useState(false);

  const onChange = (content: string) => {
    setDocument((prev) => ({ ...prev, content }));
    console.log("Updated content:", content);
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!document) {
    return <div className="p-4">Document not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
      <EditorComponent
        onChange={onChange}
        initialContent={document.content}
        editable={true}
      />
    </div>
  );
};

export default DocumentPage;
