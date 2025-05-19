import DocumentPage from "@/components/editor/document";
import { findPageById, pageTree } from "@/lib/mock-data";

type Params = Promise<{ pageId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { pageId } = await params;
  const currentPage = findPageById(pageId, pageTree);
  console.log(currentPage);
  return <DocumentPage />;
}
