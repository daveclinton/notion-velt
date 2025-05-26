"use client";

import { create } from "zustand";
import { BlockType } from "@/types";
import { findPageById, pageBlocks } from "@/lib/mock-data";

interface StaticDocument {
  _id: string;
  isArchived: boolean;
  isPublished: boolean;
  initialData: {
    title: string;
    icon?: string;
    coverImage?: string;
  };
  preview?: boolean;
  content?: string;
}

interface DocumentStore {
  document: StaticDocument | null;
  setDocument: (documentId: string) => void;
  updateDocument: (updates: Partial<StaticDocument>) => void;
  reset: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  document: null,

  setDocument: (documentId: string) => {
    const page = findPageById(documentId);
    if (!page) {
      console.error(`Page with id ${documentId} not found`);
      return;
    }

    // Map pageBlocks to the expected content format
    const blocks = pageBlocks[documentId] || [];
    const content = JSON.stringify(
      blocks.map((block) => ({
        id: block.id,
        type: block.type.toLowerCase(), // Convert BlockType to lowercase (e.g., HEADING_1 -> heading_1)
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
        },
        content: [
          {
            type: "text",
            text: block.content,
            styles:
              block.type === BlockType.TO_DO
                ? { checked: block.checked || false }
                : {},
          },
        ],
        children: [],
      })),
      null,
      2
    );

    set({
      document: {
        _id: documentId,
        isArchived: false,
        isPublished: false,
        initialData: {
          title: page.title,
          icon: page.emoji,
          coverImage: undefined,
        },
        preview: false,
        content,
      },
    });
  },

  updateDocument: (updates: Partial<StaticDocument>) => {
    set((state) => ({
      document: state.document
        ? { ...state.document, ...updates }
        : state.document,
    }));
  },

  reset: () => {
    set({ document: null });
  },
}));
