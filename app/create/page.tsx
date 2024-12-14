'use client';

import { useEffect, useState } from 'react';
import { FileExplorer } from '@/components/file-explorer';
import { ExcalidrawEditor } from '@/components/excalidraw-editor';
import type { FolderWithRelations } from '@/lib/types';
import type { File } from '@prisma/client';

export default function CreatePage() {
  const [folders, setFolders] = useState<FolderWithRelations[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders');
        if (!response.ok) {
          throw new Error('Failed to fetch folders');
        }
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        setError('Failed to fetch folders');
        console.error('Failed to fetch folders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <FileExplorer initialFolders={folders} onFileSelect={setSelectedFile} />
      <main className="flex-1">
        <ExcalidrawEditor file={selectedFile} />
      </main>
    </div>
  );
}
