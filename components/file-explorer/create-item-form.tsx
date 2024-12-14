'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CreateItemFormProps {
  type: 'file' | 'folder';
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function CreateItemForm({
  type,
  value,
  onChange,
  onSubmit,
}: CreateItemFormProps) {
  return (
    <div className="ml-8 mt-2 flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`New ${type} name...`}
        className="h-8"
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <Button size="sm" onClick={onSubmit}>
        Create
      </Button>
    </div>
  );
}