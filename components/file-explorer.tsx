'use client';

import { Folder, File } from '@prisma/client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderIcon, FileIcon, ChevronRight, ChevronDown, Plus } from 'lucide-react';

interface FileExplorerProps {
  initialFolders: (Folder & { files: File[]; children: Folder[] })[];
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
      const response = await fetch(
        `/api/${creatingIn.type === 'folder' ? 'folders' : 'files'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newItemName,
            [creatingIn.type === 'folder' ? 'parentId' : 'folderId']: creatingIn.id,
            ...(creatingIn.type === 'file' && { content: {} }),
          }),
        }
      );

      if (response.ok) {
        // Refresh the folder structure
        const foldersResponse = await fetch('/api/folders');
        const updatedFolders = await foldersResponse.json();
        setFolders(updatedFolders);
      }
    } catch (error) {
      console.error('Failed to create item:', error);
    }

    setNewItemName('');
    setCreatingIn(null);
  };

  const renderFolder = (folder: Folder & { files: File[]; children: Folder[] }) => {
    const isExpanded = expandedFolders.has(folder.id);

    return (
      <div key={folder.id} className="ml-4">
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={() => toggleFolder(folder.id)}
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
            onClick={() => setCreatingIn({ id: folder.id, type: 'file' })}
          >
            <Plus size={16} />
          </Button>
        </div>

        {isExpanded && (
          <div className="ml-4">
            {folder.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 py-1 cursor-pointer hover:bg-accent rounded-sm px-2"
                onClick={() => onFileSelect(file)}
              >
                <FileIcon size={16} className="text-gray-500" />
                <span>{file.name}</span>
              </div>
            ))}
            {folder.children.map((childFolder) => renderFolder(childFolder))}
          </div>
        )}

        {creatingIn?.id === folder.id && (
          <div className="ml-8 mt-2 flex items-center gap-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`New ${creatingIn.type} name...`}
              className="h-8"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateItem()}
            />
            <Button size="sm" onClick={handleCreateItem}>
              Create
            </Button>
          </div>
        )}
      </div>
    );
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
      {folders.map((folder) => renderFolder(folder))}
    </div>
  );
}