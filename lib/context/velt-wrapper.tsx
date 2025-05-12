"use client";
import React, { ReactNode } from "react";
import { VeltProvider, VeltComments } from "@veltdev/react";

export function VeltWrapper({ children }: { children: ReactNode }) {
  return (
    <VeltProvider apiKey="Mmgfd08nQbBbVR7XhO6o">
      <VeltComments textMode={false} />
      {children}
    </VeltProvider>
  );
}
