"use client";
import { useState } from "react";
import {
  Heading,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  Type,
} from "lucide-react";
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
  const [activeType, setActiveType] = useState<BlockType | null>(null);

  const handleBlockTypeChange = (type: BlockType) => {
    setActiveType(type);
    onBlockTypeChange(type);
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2 border rounded-lg shadow-lg p-1 flex items-center transition-opacity duration-200 z-10"
        )}
      >
        <ToolbarButton
          tooltip="Paragraph"
          onClick={() => handleBlockTypeChange(BlockType.PARAGRAPH)}
          isActive={activeType === BlockType.PARAGRAPH}
        >
          <Type size={16} className="text-white" />
        </ToolbarButton>

        <ToolbarButton
          tooltip="Heading 1"
          onClick={() => handleBlockTypeChange(BlockType.HEADING_1)}
          isActive={activeType === BlockType.HEADING_1}
        >
          <Heading size={16} className="text-white" />
          <span className="ml-1 text-white">1</span>
        </ToolbarButton>

        <ToolbarButton
          tooltip="Heading 2"
          onClick={() => handleBlockTypeChange(BlockType.HEADING_2)}
          isActive={activeType === BlockType.HEADING_2}
        >
          <Heading size={16} className="text-white" />
          <span className="ml-1 text-white">2</span>
        </ToolbarButton>

        <ToolbarButton
          tooltip="Heading 3"
          onClick={() => handleBlockTypeChange(BlockType.HEADING_3)}
          isActive={activeType === BlockType.HEADING_3}
        >
          <Heading size={16} className="text-white" />
          <span className="ml-1 text-white">3</span>
        </ToolbarButton>

        <div className="w-px h-6 mx-1" />

        <ToolbarButton
          tooltip="Bullet List"
          onClick={() => handleBlockTypeChange(BlockType.BULLET_LIST)}
          isActive={activeType === BlockType.BULLET_LIST}
        >
          <List size={16} className="text-white" />
        </ToolbarButton>

        <ToolbarButton
          tooltip="Numbered List"
          onClick={() => handleBlockTypeChange(BlockType.NUMBERED_LIST)}
          isActive={activeType === BlockType.NUMBERED_LIST}
        >
          <ListOrdered size={16} className="text-white" />
        </ToolbarButton>

        <ToolbarButton
          tooltip="To-Do"
          onClick={() => handleBlockTypeChange(BlockType.TO_DO)}
          isActive={activeType === BlockType.TO_DO}
        >
          <CheckSquare size={16} className="text-white" />
        </ToolbarButton>

        <div className="w-px h-6 mx-1" />

        <ToolbarButton
          tooltip="Code"
          onClick={() => handleBlockTypeChange(BlockType.CODE)}
          isActive={activeType === BlockType.CODE}
        >
          <Code size={16} className="text-white" />
        </ToolbarButton>
      </div>
    </TooltipProvider>
  );
}

interface ToolbarButtonProps {
  tooltip: string;
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

function ToolbarButton({
  tooltip,
  children,
  onClick,
  isActive = false,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "p-1.5 rounded flex items-center",
            isActive ? "text-gray-900" : "text-gray-700"
          )}
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
