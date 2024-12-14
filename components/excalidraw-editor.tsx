'use client';

import { useEffect, useState } from 'react';
import { Excalidraw, exportToBlob } from '@excalidraw/excalidraw';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { AppState } from '@excalidraw/excalidraw/types/types';
import { File } from '@prisma/client';

interface ExcalidrawEditorProps {
  file: File | null;
}

export function ExcalidrawEditor({ file }: ExcalidrawEditorProps) {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    if (file?.content) {
      const content = file.content as {
        elements: ExcalidrawElement[];
        appState: AppState;
      };
      setElements(content.elements || []);
      setAppState(content.appState || null);
    }
  }, [file]);

  const onChange = async (
    elements: ExcalidrawElement[],
    appState: AppState,
    files: any
  ) => {
    setElements(elements);
    setAppState(appState);

    if (file?.id) {
      try {
        await fetch(`/api/files`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: file.id,
            content: { elements, appState },
          }),
        });
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

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
          elements: elements,
          appState: appState || undefined,
        }}
        onChange={onChange}
      />
    </div>
  );
}
