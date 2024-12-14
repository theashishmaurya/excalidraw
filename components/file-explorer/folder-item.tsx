'use client';

import { FolderIcon, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileItem } from './file-item';
import type { FolderWithRelations } from '@/lib/types';
import type { File } from '@prisma/client';

interface FolderItemProps {
  folder: FolderWithRelations;
  isExpanded: boolean;
  onToggle: (folderId: string) => void;
  onFileSelect: (file: File) => void;
  onCreateClick: (folderId: string, type: 'file' | 'folder') => void;
  expandedFolders: Set<string>;
}

export function FolderItem({
  folder,
  isExpanded,
  onToggle,
  onFileSelect,
  onCreateClick,
  expandedFolders,
}: FolderItemProps) {
  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1">
        <button
          onClick={() => onToggle(folder.id)}
          className="p-1 hover:bg-accent rounded-sm"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <FolderIcon size={16} className="text-blue-500" />
        <span>{folder.name}</span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-6 w-6"
          onClick={() => onCreateClick(folder.id, 'file')}
        >
          <Plus size={16} />
        </Button>
      </div>

      {isExpanded && (
        <div className="ml-4">
          {folder.files.map((file) => (
            <FileItem key={file.id} file={file} onSelect={onFileSelect} />
          ))}
          {folder.children.map((childFolder) => (
            <FolderItem
              key={childFolder.id}
              folder={childFolder}
              isExpanded={expandedFolders.has(childFolder.id)}
              onToggle={onToggle}
              onFileSelect={onFileSelect}
              onCreateClick={onCreateClick}
              expandedFolders={expandedFolders}
            />
          ))}
        </div>
      )}
    </div>
  );
}