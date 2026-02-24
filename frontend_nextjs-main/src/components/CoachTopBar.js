'use client';

import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function CoachTopBar({ title }) {
    return (
        <header className="sticky top-0 z-30 bg-card border-b border-border h-16 flex items-center justify-between px-6">
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar..." className="pl-10 w-56 h-9" />
                </div>
                <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                </button>
            </div>
        </header>
    );
}
