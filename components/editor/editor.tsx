/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSetDocument } from "@veltdev/react";
import Skeleton from "./components/Skeleton";
import TextMenu from "./BubbleMenu/TextMenu";
import { useSaving } from "@/store/use-saving";
import { toast } from "sonner";
import { UpdateDocumentPayload } from "@/lib/validators/Document";
import { TipTapEditorExtensions } from "./lib/extensions-editor";
import { TipTapEditorProps } from "./lib/props";
import { SlashCmdProvider } from "@harshtalks/slash-tiptap";
import { CommandMenu } from "./CommandMenu";

interface EditorProps {
  editorJson: any;
  id: string;
  documentName?: string;
  organizationId?: string;
}

export default function Editor({
  editorJson,
  id,
  documentName,
  organizationId,
}: EditorProps) {
  const router = useRouter();

  const [_, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [content, setContent] = useState<JSONContent | null>(null);

  const { setIsSaving } = useSaving();

  // Initialize Velt document for collaboration
  // Use organizationId if provided for cross-organization access
  const documentMetadata = organizationId
    ? {
        documentName: documentName || `Document ${id}`,
        organizationId,
      }
    : {
        documentName: documentName || `Document ${id}`,
      };

  useSetDocument(id, documentMetadata);

  const updateEditorJson = useCallback(
    async (editorJson: JSONContent) => {
      try {
        setIsSaving(true);
        const payload: UpdateDocumentPayload = { id, editorJson };
        console.log(payload);
        startTransition(() => {
          router.refresh();
        });
      } catch (error) {
        console.log(error);
        toast("Error updating document");
      } finally {
        startTransition(() => {
          setIsSaving(false);
        });
      }
    },
    [id, router, setIsSaving]
  );

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON() as JSONContent;
    setContent(json);
    await updateEditorJson(json);
  }, 1000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => debouncedUpdates(e),
    content,
  });

  useEffect(() => {
    const handleCtrlS = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s" && editor) {
        event.preventDefault();
        setIsSaving(true);

        const json = editor.getJSON() as JSONContent;
        updateEditorJson(json);
      }
    };

    window.addEventListener("keydown", handleCtrlS);
    return () => {
      window.removeEventListener("keydown", handleCtrlS);
    };
  }, [setIsSaving, updateEditorJson, editor]);

  // Hydrate the editor with the content from the database.
  useEffect(() => {
    if (editor && !hydrated) {
      editor.commands.setContent(editorJson);
      setHydrated(true);
    }
  }, [editor, hydrated, editorJson]);

  return (
    <SlashCmdProvider>
      <div
        id="editor-container"
        className="relative w-full cursor-text flex-1 px-10 md:px-24 pb-16 selection:text-[unset] selection:bg-sky-200 dark:selection:bg-sky-600/50"
      >
        {hydrated ? (
          <div id="menu-two" className="w-full max-w-[708px] mx-auto h-full">
            <TextMenu editor={editor} />
            <EditorContent editor={editor} />
            <CommandMenu editor={editor} />
          </div>
        ) : (
          <div className="w-full max-w-[708px] mx-auto h-full">
            <Skeleton />
          </div>
        )}
      </div>
    </SlashCmdProvider>
  );
}
