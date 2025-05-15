"use client";
import React, { ReactNode } from "react";
import { VeltProvider, VeltComments } from "@veltdev/react";

export function VeltWrapper({ children }: { children: ReactNode }) {
  return (
    <VeltProvider apiKey="hnbXx3OVUnYwsPsmATqe">
      <VeltComments textMode={false} />
      {children}
    </VeltProvider>
  );
}
