'use client';

import { FileIcon } from 'lucide-react';
import type { File } from '@prisma/client';

interface FileItemProps {
  file: File;
  onSelect: (file: File) => void;
}

export function FileItem({ file, onSelect }: FileItemProps) {
  return (
    <div
      className="flex items-center gap-2 py-1 cursor-pointer hover:bg-accent rounded-sm px-2"
      onClick={() =>{
        onSelect(file)
      } }
    >
      <FileIcon size={16} className="text-gray-500" />
      <span>{file.name}</span>
    </div>
  );
}