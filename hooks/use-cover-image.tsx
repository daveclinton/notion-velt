"use client";

import { useState } from "react";
import { useDocumentStore } from "./use-document";

export const useCoverImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { document, updateDocument } = useDocumentStore();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSelect = (imageUrl: string) => {
    updateDocument({
      initialData: {
        ...document?.initialData,
        title: document?.initialData.title || "Untitled",
        icon: document?.initialData.icon,
        coverImage: imageUrl,
      },
    });
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onSelect,
  };
};
