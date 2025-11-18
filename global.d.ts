// global.d.ts (or types.d.ts)

// This tells TypeScript that when it encounters an import ending in '.png', 
// the imported value should be treated as a 'string' (the image URL).
declare module '*.png' {
  const content: string;
  export default content;
}