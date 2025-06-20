export interface PageTreeType {
  id: string;
  title: string;
  emoji?: string;
  parentId: string | null;
  children: PageTreeType[];
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean;
}

export enum BlockType {
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  HEADING_3 = "heading_3",
  BULLET_LIST = "bullet_list",
  NUMBERED_LIST = "numbered_list",
  TO_DO = "to_do",
  CODE = "code",
  QOUTE = "quote",
}
