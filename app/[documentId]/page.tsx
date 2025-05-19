import DocumentPage from "@/components/editor/document";
import { findPageById, pageTree } from "@/lib/mock-data";

type Params = Promise<{ documentId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { documentId } = await params;
  const currentPage = findPageById(documentId, pageTree);
  console.log(currentPage);
  return (
    <div className="h-full">
      <DocumentPage />
    </div>
  );
}
