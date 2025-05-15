import { BlockType, Page, Block } from "@/types";

export const dummyUsers = [
  {
    id: "user1",
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "alice@gmail.com",
    organizationId: "org123",
    color: "#FF5733",
    textColor: "#FFFFFF",
  },
  {
    id: "user2",
    name: "Bob Jones",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "bob@gmail.com",
    organizationId: "org123",
    color: "#33B5FF",
    textColor: "#FFFFFF",
  },
];

export const pageTree: Page[] = [
  {
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
  },
  {
    id: "page-5",
    title: "Projects",
    emoji: "📚",
    parentId: null,
    children: [
      {
        id: "page-6",
        title: "Project A",
        parentId: "page-5",
        children: [],
      },
      {
        id: "page-7",
        title: "Project B",
        parentId: "page-5",
        children: [],
      },
    ],
  },
  {
    id: "page-8",
    title: "Meeting Notes",
    emoji: "📝",
    parentId: null,
    children: [],
  },
];

export const pageBlocks: Record<string, Block[]> = {
  "page-1": [
    {
      id: "block-1-1",
      type: BlockType.HEADING_1,
      content: "Getting Started",
    },
    {
      id: "block-1-2",
      type: BlockType.PARAGRAPH,
      content:
        "Welcome to your new Notion workspace! Here are some tips to help you get started.",
    },
    {
      id: "block-1-3",
      type: BlockType.HEADING_2,
      content: "What is Notion?",
    },
    {
      id: "block-1-4",
      type: BlockType.PARAGRAPH,
      content:
        "Notion is an all-in-one workspace for notes, tasks, wikis, and databases.",
    },
  ],
  "page-2": [
    {
      id: "block-2-1",
      type: BlockType.HEADING_1,
      content: "What is Notion?",
    },
    {
      id: "block-2-2",
      type: BlockType.PARAGRAPH,
      content:
        "Notion is a workspace that adapts to your needs. It's as minimal or as powerful as you need it to be.",
    },
    {
      id: "block-2-3",
      type: BlockType.BULLET_LIST,
      content: "Take notes",
    },
    {
      id: "block-2-4",
      type: BlockType.BULLET_LIST,
      content: "Manage projects",
    },
    {
      id: "block-2-5",
      type: BlockType.BULLET_LIST,
      content: "Create wikis",
    },
  ],
  "page-3": [
    {
      id: "block-3-1",
      type: BlockType.HEADING_1,
      content: "How to use this template",
    },
    {
      id: "block-3-2",
      type: BlockType.PARAGRAPH,
      content:
        "This template provides a starting point for your Notion workspace.",
    },
    {
      id: "block-3-3",
      type: BlockType.TO_DO,
      content: "Create your first page",
      checked: true,
    },
    {
      id: "block-3-4",
      type: BlockType.TO_DO,
      content: "Add some content",
      checked: false,
    },
    {
      id: "block-3-5",
      type: BlockType.TO_DO,
      content: "Share with your team",
      checked: false,
    },
  ],
};

// Helper function to find a page by ID in the page tree
export function findPageById(
  id: string,
  pages: Page[] = pageTree
): Page | null {
  for (const page of pages) {
    if (page.id === id) return page;

    if (page.children.length > 0) {
      const foundPage = findPageById(id, page.children);
      if (foundPage) return foundPage;
    }
  }

  return null;
}
