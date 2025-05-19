"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IconPicker } from "./icon-picker";
import { useDocumentStore } from "@/hooks/use-document";

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

interface ToolbarProps {
  initialData: StaticDocument;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { document, updateDocument } = useDocumentStore();

  const title =
    document?.initialData.title || initialData.initialData.title || "Untitled";
  const icon = document?.initialData.icon ?? initialData.initialData.icon;

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    updateDocument({
      initialData: {
        ...document?.initialData,
        title: value || "Untitled",
        icon: document?.initialData.icon,
        coverImage: document?.initialData.coverImage,
      },
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    updateDocument({
      initialData: {
        ...document?.initialData,
        title: document?.initialData.title || "Untitled",
        icon,
        coverImage: document?.initialData.coverImage,
      },
    });
  };

  const onRemoveIcon = () => {
    updateDocument({
      initialData: {
        ...document?.initialData,
        title: document?.initialData.title || "Untitled",
        icon: undefined,
        coverImage: document?.initialData.coverImage,
      },
    });
  };

  return (
    <div className="pl-[54px] group relative">
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs cursor-pointer"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground cursor-pointer"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-2 pt-6">
        {!!icon && !preview && (
          <div className="relative flex items-center group/icon">
            <IconPicker onChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition">{icon}</p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="absolute -top-2 -right-2 rounded-full cursor-pointer opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!icon && preview && <p className="text-6xl">{icon}</p>}

        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={title}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words
        outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
