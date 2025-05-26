import { createSuggestionsItems } from "@harshtalks/slash-tiptap";

export const suggestions = createSuggestionsItems([
  {
    title: "text",
    searchTerms: ["paragraph"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Heading 1",
    searchTerms: ["title", "big", "large", "h1"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    searchTerms: ["subtitle", "medium", "h2"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    searchTerms: ["subheading", "small", "h3"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    searchTerms: ["unordered", "point"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Ordered List",
    searchTerms: ["ordered", "point", "numbers"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Blockquote",
    searchTerms: ["quote", "citation", "indent"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code Block",
    searchTerms: ["code", "programming", "snippet", "pre"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Horizontal Rule",
    searchTerms: ["divider", "separator", "line", "hr"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    title: "Link",
    searchTerms: ["url", "hyperlink", "reference"],
    command: ({ editor, range }) => {
      const url = window.prompt("Enter URL:");
      if (url) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setLink({ href: url })
          .insertContent("Link text")
          .run();
      }
    },
  },
  {
    title: "Task List",
    searchTerms: ["todo", "checkbox", "checklist"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Bold Text",
    searchTerms: ["strong", "emphasis", "weight"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("**Bold text**")
        .run();
    },
  },
  {
    title: "Italic Text",
    searchTerms: ["emphasis", "slant", "em"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("*Italic text*")
        .run();
    },
  },
  {
    title: "Inline Code",
    searchTerms: ["monospace", "code", "snippet"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("`inline code`")
        .run();
    },
  },
  {
    title: "Strikethrough",
    searchTerms: ["cross out", "delete", "strike"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent("~~strikethrough text~~")
        .run();
    },
  },
]);
