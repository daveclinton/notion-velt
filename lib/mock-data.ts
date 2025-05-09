import { BlockType, Page, Block, User, CollaboratorInfo } from "@/types";

export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "user-3",
    name: "Sam Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
  },
];

export const collaborators: CollaboratorInfo[] = [
  {
    user: users[0],
    lastActive: new Date(),
  },
  {
    user: users[1],
    lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
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
