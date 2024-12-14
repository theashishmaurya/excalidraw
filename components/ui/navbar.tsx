'use client';

import Link from 'next/link';
import { Button } from './button';
import { Pencil } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Pencil className="h-5 w-5" />
          <span>DrawFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/create">
            <Button variant="default">Start Drawing</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}