import { useState } from "react";
import { Heading, List, ListOrdered, CheckSquare, Code } from "lucide-react";
import { BlockType } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  onBlockTypeChange: (type: BlockType) => void;
}

export function EditorToolbar({ onBlockTypeChange }: EditorToolbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-1 flex items-center transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <ToolbarButton
          tooltip="Heading 1"
          onClick={() => onBlockTypeChange(BlockType.HEADING_1)}
        >
          <Heading size={16} />
          <span className="ml-1">1</span>
        </ToolbarButton>

        <ToolbarButton
          tooltip="Heading 2"
          onClick={() => onBlockTypeChange(BlockType.HEADING_2)}
        >
          <Heading size={16} />
          <span className="ml-1">2</span>
        </ToolbarButton>

        <ToolbarButton
          tooltip="Heading 3"
          onClick={() => onBlockTypeChange(BlockType.HEADING_3)}
        >
          <Heading size={16} />
          <span className="ml-1">3</span>
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton
          tooltip="Bullet List"
          onClick={() => onBlockTypeChange(BlockType.BULLET_LIST)}
        >
          <List size={16} />
        </ToolbarButton>

        <ToolbarButton
          tooltip="Numbered List"
          onClick={() => onBlockTypeChange(BlockType.NUMBERED_LIST)}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <ToolbarButton
          tooltip="To-Do"
          onClick={() => onBlockTypeChange(BlockType.TO_DO)}
        >
          <CheckSquare size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton
          tooltip="Code"
          onClick={() => onBlockTypeChange(BlockType.CODE)}
        >
          <Code size={16} />
        </ToolbarButton>
      </div>
    </TooltipProvider>
  );
}

interface ToolbarButtonProps {
  tooltip: string;
  children: React.ReactNode;
  onClick: () => void;
}

function ToolbarButton({ tooltip, children, onClick }: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="p-1.5 rounded hover:bg-gray-100 flex items-center text-gray-700"
          onClick={onClick}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
