import type { Folder, File } from '@prisma/client';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import type { AppState } from '@excalidraw/excalidraw/types/types';

export interface FolderWithRelations extends Folder {
  files: File[];
  children: FolderWithRelations[];
}

export interface ExcalidrawContent {
  elements: ExcalidrawElement[];
  appState: AppState;
}

export interface CreateItemParams {
  name: string;
  parentId?: string;
  folderId?: string;
  content?: any;
}