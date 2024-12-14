'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FolderItem } from './folder-item';
import { CreateItemForm } from './create-item-form';
import { createFolder, getFolders } from '@/lib/api/folders';
import { createFile } from '@/lib/api/files';
import type { FolderWithRelations } from '@/lib/types';
import type { File } from '@prisma/client';

interface FileExplorerProps {
  initialFolders: FolderWithRelations[];
  onFileSelect: (file: File) => void;
}

export function FileExplorer({ initialFolders, onFileSelect }: FileExplorerProps) {
  const [folders, setFolders] = useState(initialFolders);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newItemName, setNewItemName] = useState('');
  const [creatingIn, setCreatingIn] = useState<{ id: string; type: 'file' | 'folder' } | null>(
    null
  );

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleCreateItem = async () => {
    if (!creatingIn || !newItemName.trim()) return;

    try {
      if (creatingIn.type === 'folder') {
        await createFolder(newItemName, creatingIn.id === 'root' ? undefined : creatingIn.id);
      } else {
        await createFile(newItemName, creatingIn.id);
      }

      const updatedFolders = await getFolders();
      setFolders(updatedFolders);
      setNewItemName('');
      setCreatingIn(null);
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <div className="w-64 bg-background border-r p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Files</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCreatingIn({ id: 'root', type: 'folder' })}
        >
          <Plus size={16} />
        </Button>
      </div>

      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          isExpanded={expandedFolders.has(folder.id)}
          onToggle={toggleFolder}
          onFileSelect={onFileSelect}
          onCreateClick={(id, type) => setCreatingIn({ id, type })}
        />
      ))}

      {creatingIn && (
        <CreateItemForm
          type={creatingIn.type}
          value={newItemName}
          onChange={setNewItemName}
          onSubmit={handleCreateItem}
        />
      )}
    </div>
  );
}