import {
  Sparkles,
  Home,
  Inbox,
  FileText,
  Plus,
  Twitter,
  Rocket,
  HomeIcon,
  CheckSquare,
  Book,
} from "lucide-react";

export const sidebarData = {
  user: {
    name: "David Clinton",
    initial: "D",
  },
  mainMenu: [
    { id: "notion-ai", label: "Notion AI", icon: Sparkles },
    { id: "home", label: "Home", icon: Home },
    { id: "inbox", label: "Inbox", icon: Inbox },
  ],
  workspace: {
    label: "Workspace",
    items: [
      {
        id: "agile-project",
        label: "Agile Project Plan: Octavia",
        icon: FileText,
      },
      { id: "dragons-jobs", label: "Dragon's jobs board", icon: FileText },
      { id: "nebius-studio", label: "Nebius x Studio1", icon: FileText },
    ],
  },
  favorites: {
    label: "Favorites",
    items: [
      {
        id: "ai-powered-fi",
        label: "Building an AI-powered Fi...",
        icon: FileText,
      },
    ],
  },
  shared: {
    label: "Shared",
    items: [
      {
        id: "ai-powered-fi-shared",
        label: "Building an AI-powered Fi...",
        icon: FileText,
      },
      {
        id: "agile-project-shared",
        label: "4-Week Agile Project Plan...",
        icon: FileText,
      },
      {
        id: "code-completion",
        label: "Code completion showdo...",
        icon: FileText,
      },
    ],
  },
  private: {
    label: "Private",
    items: [
      {
        id: "ai-powered-fi-private",
        label: "Building an AI-powered Fi...",
        icon: FileText,
      },
      { id: "notion-projects", label: "Notion Projects", icon: Plus },
      { id: "tweets", label: "Tweets", icon: Twitter },
      {
        id: "getting-started",
        label: "Getting Started on Mobile",
        icon: FileText,
      },
      { id: "aws-ec2", label: "Amazon AWS EC2", icon: Rocket },
      { id: "personal-home", label: "Personal Home", icon: HomeIcon },
      { id: "task-list", label: "Task List", icon: CheckSquare },
      { id: "journal", label: "Journal", icon: Book },
      { id: "reading-list", label: "Reading List", icon: Book },
    ],
  },
};
