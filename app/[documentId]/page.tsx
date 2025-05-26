import { CommentSidebar } from "@/components/comment-sidebar";
import Editor from "@/components/editor/editor";
import { findPageById, pageTree } from "@/lib/mock-data";
import { JSONContent } from "@tiptap/react";

type Params = Promise<{ documentId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { documentId } = await params;
  const currentPage = findPageById(documentId, pageTree);
  console.debug(currentPage);
  const dummyEditorJson: JSONContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Welcome to the Editor" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is a sample paragraph with some dummy content. Feel free to edit this text in the Tiptap editor.",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "First item in the list" }],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Second item in the list" }],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="h-full">
      <Editor id={documentId} editorJson={dummyEditorJson} />
      <CommentSidebar documentId={documentId} />
    </div>
  );
}
