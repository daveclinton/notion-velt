// lib/randomPageId.ts
export function generateRandomPageId() {
  return Math.random().toString(36).slice(2, 10); // e.g., 'a1b2c3d4'
}
