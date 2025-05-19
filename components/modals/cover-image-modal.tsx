"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const placeholderImages = [
  "https://picsum.photos/seed/1/800/200",
  "https://picsum.photos/seed/2/800/200",
  "https://picsum.photos/seed/3/800/200",
  "https://picsum.photos/seed/4/800/200",
  "https://picsum.photos/seed/5/800/200",
  "https://picsum.photos/seed/6/800/200",
];

export const CoverImageModal = () => {
  const { isOpen, onClose, onSelect } = useCoverImage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Cover Image</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {placeholderImages.map((url) => (
            <div
              key={url}
              className="relative w-full h-24 cursor-pointer hover:opacity-80"
              onClick={() => onSelect(url)}
            >
              <Image
                src={url}
                fill
                alt="Cover option"
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
