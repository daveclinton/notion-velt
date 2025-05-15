import { Editor } from "@/components/editor/editor";

export default function Home() {
  return (
    <Editor
      currentPage={{
        id: "page-1",
        title: "Getting Started",
        emoji: "👋",
        parentId: null,
        children: [
          {
            id: "page-2",
            title: "What is Notion?",
            parentId: "page-1",
            children: [],
          },
          {
            id: "page-3",
            title: "How to use this template",
            parentId: "page-1",
            children: [
              {
                id: "page-4",
                title: "Creating your first page",
                parentId: "page-3",
                children: [],
              },
            ],
          },
        ],
      }}
      currentPageId="dhbdhdb"
    />
  );
}
