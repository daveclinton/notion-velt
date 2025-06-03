import { CommentSidebar } from "@/components/comment-sidebar";
import { Cover } from "@/components/cover";
import Editor from "@/components/editor/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea type="always">
      <main className="flex flex-col h-[inherit]">
        <Cover url="https://picsum.photos/id/11/200/300" />
        <section className="flex flex-col flex-1 w-full">
          <Editor id={documentId} editorJson={dummyEditorJson} />
        </section>
      </main>
      <CommentSidebar documentId={documentId} />
    </ScrollArea>
  );
}
