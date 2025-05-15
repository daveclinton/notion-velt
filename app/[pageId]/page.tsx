import { Editor } from "@/components/editor/editor";
import { findPageById, pageTree } from "@/lib/mock-data";
import { PageTreeType } from "@/types";

type Params = Promise<{ pageId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { pageId } = await params;
  const currentPage = findPageById(pageId, pageTree);
  return (
    <Editor currentPage={currentPage as PageTreeType} currentPageId={pageId} />
  );
}
