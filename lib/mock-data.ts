import { BlockType, PageTreeType, Block } from "@/types";

export const pageTree: PageTreeType[] = [
  {
    id: "page-1",
    title: "Onboarding Guide",
    emoji: "🚀",
    parentId: null,
    children: [
      {
        id: "page-2",
        title: "Company Overview",
        parentId: "page-1",
        children: [],
      },
      {
        id: "page-3",
        title: "Tech Stack Breakdown",
        parentId: "page-1",
        children: [
          {
            id: "page-4",
            title: "Frontend Setup",
            parentId: "page-3",
            children: [],
          },
          {
            id: "page-9",
            title: "Backend APIs",
            parentId: "page-3",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "page-5",
    title: "Random Ideas Dump",
    emoji: "🧠",
    parentId: null,
    children: [
      {
        id: "page-6",
        title: "Feature Requests",
        parentId: "page-5",
        children: [],
      },
      {
        id: "page-7",
        title: "UI Experiments",
        parentId: "page-5",
        children: [],
      },
    ],
  },
  {
    id: "page-8",
    title: "Meeting Notes",
    emoji: "📓",
    parentId: null,
    children: [],
  },
  {
    id: "page-10",
    title: "2025 Roadmap",
    emoji: "📅",
    parentId: null,
    children: [],
  },
];

export const pageBlocks: Record<string, Block[]> = {
  "page-1": [
    {
      id: "block-1-1",
      type: BlockType.HEADING_1,
      content: "Welcome to the Team!",
    },
    {
      id: "block-1-2",
      type: BlockType.PARAGRAPH,
      content:
        "We're excited to have you on board. Here's everything you need to get started fast.",
    },
    {
      id: "block-1-3",
      type: BlockType.QOUTE,
      content: "Move fast, but don't break the build.",
    },
  ],
  "page-2": [
    {
      id: "block-2-1",
      type: BlockType.HEADING_2,
      content: "Mission & Vision",
    },
    {
      id: "block-2-2",
      type: BlockType.PARAGRAPH,
      content:
        "We build tools that empower small businesses to scale with confidence.",
    },
  ],
  "page-3": [
    {
      id: "block-3-1",
      type: BlockType.HEADING_1,
      content: "Current Tech Stack",
    },
    {
      id: "block-3-2",
      type: BlockType.BULLET_LIST,
      content: "React + Vite",
    },
    {
      id: "block-3-3",
      type: BlockType.BULLET_LIST,
      content: "Node.js + tRPC",
    },
    {
      id: "block-3-4",
      type: BlockType.BULLET_LIST,
      content: "PostgreSQL + Prisma",
    },
  ],
  "page-4": [
    {
      id: "block-4-1",
      type: BlockType.CODE,
      content: "npx create-react-app my-app --template typescript",
    },
    {
      id: "block-4-2",
      type: BlockType.PARAGRAPH,
      content: "Run the command above to spin up a TypeScript-based frontend.",
    },
  ],
  "page-5": [
    {
      id: "block-5-1",
      type: BlockType.HEADING_2,
      content: "Brain Dump",
    },
    {
      id: "block-5-2",
      type: BlockType.TO_DO,
      content: "Build a dark mode toggle",
      checked: false,
    },
    {
      id: "block-5-3",
      type: BlockType.TO_DO,
      content: "Add AI-powered search",
      checked: false,
    },
  ],
  "page-6": [
    {
      id: "block-6-1",
      type: BlockType.PARAGRAPH,
      content: "Users want to archive projects instead of deleting them.",
    },
    {
      id: "block-6-2",
      type: BlockType.BULLET_LIST,
      content: "Implement project archiving",
    },
    {
      id: "block-6-3",
      type: BlockType.BULLET_LIST,
      content: "Show archived projects on a separate tab",
    },
  ],
  "page-8": [
    {
      id: "block-8-1",
      type: BlockType.HEADING_3,
      content: "April 5th, 2025 — Product Sync",
    },
    {
      id: "block-8-2",
      type: BlockType.PARAGRAPH,
      content:
        "Discussed launching beta for the new dashboard redesign in June.",
    },
  ],
  "page-10": [
    {
      id: "block-10-1",
      type: BlockType.HEADING_1,
      content: "Q1 Goals",
    },
    {
      id: "block-10-2",
      type: BlockType.BULLET_LIST,
      content: "Launch mobile app",
    },
    {
      id: "block-10-3",
      type: BlockType.BULLET_LIST,
      content: "Reach 5K MAUs",
    },
  ],
};

export function findPageById(
  id: string,
  pages: PageTreeType[] = pageTree
): PageTreeType | null {
  for (const page of pages) {
    if (page.id === id) return page;

    if (page.children.length > 0) {
      const foundPage = findPageById(id, page.children);
      if (foundPage) return foundPage;
    }
  }

  return null;
}
