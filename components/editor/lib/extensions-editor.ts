/* eslint-disable @typescript-eslint/no-explicit-any */

import HorizontalRule from "@tiptap/extension-horizontal-rule";

import Dropcursor from "@tiptap/extension-dropcursor";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import { TiptapExtensions } from "./extensions";
import { Slash } from "@harshtalks/slash-tiptap";
import { suggestions } from "../custom-extensions/suggestions-items";

export const TipTapEditorExtensions = [
  ...TiptapExtensions,
  History.configure({
    depth: 20,
  }),
  Dropcursor.configure({
    color: "#7dd3fc",
    width: 2,
  }),
  HorizontalRule,
  Placeholder.configure({
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }

      return "Press '/' for commands, or enter some text...";
    },
  }),
  Slash.configure({
    suggestion: {
      items: () => suggestions,
    },
  }),
];
