"use client";

import { create } from "zustand";

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
    set({
      document: {
        _id: documentId,
        isArchived: false,
        isPublished: false,
        initialData: {
          title: "Hello World",
          icon: "📄",
          coverImage: undefined,
        },
        preview: false,
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
                {
                  type: "text",
                  text: "Welcome to the sample document!",
                  styles: {},
                },
              ],
              children: [],
            },
          ],
          null,
          2
        ),
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
