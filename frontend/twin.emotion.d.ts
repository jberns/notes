// twin.d.ts
import { css as cssImport } from '@emotion/react';
import styledImport from '@emotion/styled';
import 'twin.macro';

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

// Used to import images
declare module '*.jpg' {
  const content: any;
  export default content;
}
