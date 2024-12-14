import type { ExcalidrawContent } from '@/lib/types';

export async function createFile(name: string, folderId: string) {
  const response = await fetch('/api/files', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, folderId, content: {} }),
  });
  if (!response.ok) {
    throw new Error('Failed to create file');
  }
  return response.json();
}

export async function updateFileContent(fileId: string, content: ExcalidrawContent) {
  const response = await fetch('/api/files', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: fileId, content }),
  });
  if (!response.ok) {
    throw new Error('Failed to update file');
  }
  return response.json();
}