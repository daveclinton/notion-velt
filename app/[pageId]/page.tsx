import { Editor } from "@/components/editor/editor";
import { findPageById, pageTree } from "@/lib/mock-data";
import { Page } from "@/types";

export default async function Home({ params }: { params: { pageId: string } }) {
  const { pageId } = await params;
  const currentPage = findPageById(pageId, pageTree);
  return <Editor currentPage={currentPage as Page} currentPageId={pageId} />;
}
