'use client';

import { useState, useEffect } from 'react';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { AppState } from '@excalidraw/excalidraw/types/types';
import type { File } from '@prisma/client';
import { updateFileContent } from '@/lib/api/files';
import type { ExcalidrawContent } from '@/lib/types';

export function useExcalidraw(file: File | null) {
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    if (file?.content) {
      const content = file.content as ExcalidrawContent;
      setElements(content.elements || []);
      setAppState(content.appState || null);
    }
  }, [file]);

  const handleChange = async (
    elements: ExcalidrawElement[],
    appState: AppState
  ) => {
    setElements(elements);
    setAppState(appState);

    if (file?.id) {
      try {
        await updateFileContent(file.id, { elements, appState });
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

  return {
    elements,
    appState,
    onChange: handleChange,
  };
}