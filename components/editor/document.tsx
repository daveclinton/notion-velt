"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "../toolbar";
import { Cover } from "../cover";

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
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h4 w-[50%]" />
            <Skeleton className="h4 w-[80%]" />
            <Skeleton className="h4 w-[40%]" />
            <Skeleton className="h4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return <div className="p-4">Document not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url="https://picsum.photos/200/300" />
      <div className="md:max-w-3xl lg: max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <EditorComponent
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentPage;
