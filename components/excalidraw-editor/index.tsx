'use client';

import dynamic from 'next/dynamic';
import { useExcalidraw } from './use-excalidraw';
import type { File } from '@prisma/client';

// Dynamically import Excalidraw to avoid SSR issues
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  }
);

interface ExcalidrawEditorProps {
  file: File | null;
}

export function ExcalidrawEditor({ file }: ExcalidrawEditorProps) {
  const { elements, appState, onChange } = useExcalidraw(file);

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a file to start editing</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Excalidraw
        initialData={{
          elements,
          appState: appState || undefined,
        }}
        onChange={onChange}
      />
    </div>
  );
}