import { Bell, ChevronDown, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface CommentsSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommentsSidebar({
  open,
  onOpenChange,
}: CommentsSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 pt-12 bg-zinc-900 text-white border-l border-zinc-800"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Comments & suggestions</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <span className="sr-only">Filter</span>
                  <ListFilter />
                </Button>
              </div>

              <div className="mt-6">
                <p className="text-sm text-zinc-400">Notify me for</p>
                <div className="mt-2 relative">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-transparent border-zinc-700 text-white h-12 rounded-md">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-zinc-400" />
                        <SelectValue placeholder="All comments" />
                      </div>
                      <ChevronDown className="h-5 w-5 text-zinc-400" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="all">All comments</SelectItem>
                      <SelectItem value="mentions">Mentions only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-24 w-24 items-center justify-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 42H14C8.47715 42 4 37.5228 4 32V22C4 16.4772 8.47715 12 14 12H34C39.5228 12 44 16.4772 44 22V24M30 52H50C55.5228 52 60 47.5228 60 42V32C60 26.4772 55.5228 22 50 22H30C24.4772 22 20 26.4772 20 32V42C20 47.5228 24.4772 52 30 52Z"
                      stroke="#4B5563"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-lg text-zinc-400">
                  No open comments or suggestions
                </p>
                <Button className="mt-2 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white rounded-md px-6 py-2">
                  Add comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
