'use client';

import { useState, useEffect, useRef } from 'react';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import type { File } from '@prisma/client';
import { updateFileContent } from '@/lib/api/files';

export function useExcalidraw(file: File | null,) {
  const [elements, setElements] = useState<readonly ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<AppState | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const saveContent = async (elements: readonly ExcalidrawElement[], appState: AppState) => {
    if (file?.id) {
      try {
        await updateFileContent(file.id, { elements, appState });
        console.log('Changes saved successfully');
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
    }
  };

  const handleChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    setElements(elements);
    setAppState(appState);

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout for 5 seconds
    debounceTimeout.current = setTimeout(() => {
      saveContent(elements, appState);
    }, 4000);
  };

  return {
    elements,
    appState,
    onChange: handleChange,
    setElements,
    setAppState,
  };
}