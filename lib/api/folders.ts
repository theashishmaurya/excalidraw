export async function getFolders() {
  const response = await fetch('/api/folders');
  if (!response.ok) {
    throw new Error('Failed to fetch folders');
  }
  return response.json();
}

export async function createFolder(name: string, parentId?: string) {
  const response = await fetch('/api/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, parentId }),
  });
  if (!response.ok) {
    throw new Error('Failed to create folder');
  }
  return response.json();
}