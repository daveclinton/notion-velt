import { CommentSidebar } from "@/components/comment-sidebar";
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
    // <div className="h-full">
    //   <Editor id={documentId} editorJson={dummyEditorJson} />
    //   <CommentSidebar documentId={documentId} />
    // </div>

    <ScrollArea className="h-[calc(100vh_-_48px)]" type="always">
      <main className="flex flex-col h-[inherit]">
        {/* {coverImage && <CoverImage coverImage={coverImage} id={documentId} />} */}

        <section className="flex flex-col flex-1 w-full">
          {/* <div
            className={cn(
              "group flex flex-col shrink-0 px-10 md:px-24 w-full max-w-[900px] mx-auto relative",
              iconImage && coverImage && "pt-[70px]",
              !iconImage && coverImage && "pt-[25px]",
              iconImage && !coverImage && "pt-16",
              !iconImage && !coverImage && "pt-10"
            )}
          >
            {iconImage && (
              <IconImage
                id={documentId}
                isCoverImage={!!coverImage}
                iconImage={iconImage}
              />
            )}

            {!(iconImage && coverImage) && (
              <div className="h-6 inline-flex gap-2 mt-5">
                {!iconImage && <IconImgUploadBtn id={documentId} />}
                {!coverImage && <CoverImgUploadBtn id={documentId} />}
              </div>
            )}

            <Title currentTitle={title} id={documentId} />
          </div> */}

          <Editor id={documentId} editorJson={dummyEditorJson} />
        </section>
      </main>
      <CommentSidebar documentId={documentId} />
    </ScrollArea>
  );
}
