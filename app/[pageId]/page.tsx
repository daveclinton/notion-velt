import { Editor } from "@/components/editor/editor";
import { findPageById, pageTree } from "@/lib/mock-data";
import { Page } from "@/types";

export default function Home({ params }: { params: { pageId: string } }) {
  const pageId = params.pageId;
  const currentPage = findPageById(pageId, pageTree);
  return <Editor currentPage={currentPage as Page} currentPageId={pageId} />;
}
