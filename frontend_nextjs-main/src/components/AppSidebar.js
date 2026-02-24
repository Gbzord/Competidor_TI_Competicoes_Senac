'use client';

import { useAppContext } from '@/context/AppContext';
import { useCompetitors } from '@/hooks/use-mock-api';
import { Button } from '@/components/ui/button';
import { Trophy, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
    const { role, setRole, selectedCompetitorId, setSelectedCompetitorId } = useAppContext();
    const { data: competitors } = useCompetitors();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'flex flex-col border-r-2 border-border bg-sidebar transition-all duration-200 h-screen sticky top-0',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-border p-4">
                {!collapsed && (
                    <h1 className="text-lg font-bold tracking-tight uppercase">
                        Competidor<br />Senac
                    </h1>
                )}
                <Button
                    onClick={() => setCollapsed(!collapsed)}
                    variant="ghost"
                    size="icon"
                >
                    {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </Button>
            </div>

            {/* Role Switcher */}
            <div className="border-b-2 border-border p-2">
                <Button
                    onClick={() => setRole('coach')}
                    variant={role === 'coach' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                    size="sm"
                >
                    <Trophy className="h-4 w-4 shrink-0" />
                    {!collapsed && 'Treinadora'}
                </Button>
                <Button
                    onClick={() => setRole('competitor')}
                    variant={role === 'competitor' ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2 mt-1"
                    size="sm"
                >
                    <User className="h-4 w-4 shrink-0" />
                    {!collapsed && 'Competidor'}
                </Button>
            </div>

            {/* Competitors List */}
            {role === 'coach' && (
                <div className="flex-1 overflow-y-auto border-b-2 border-border">
                    <div className={cn('p-2', collapsed && 'p-1')}>
                        <div className={cn('px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase', collapsed && 'text-center')}>
                            {!collapsed && 'Competidores'}
                        </div>
                        {competitors?.map(comp => (
                            <Button
                                key={comp.id}
                                onClick={() => setSelectedCompetitorId(comp.id)}
                                variant={selectedCompetitorId === comp.id ? 'default' : 'ghost'}
                                className="w-full justify-start gap-2 mt-0.5"
                                size="sm"
                                title={comp.name}
                            >
                                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0">
                                    {comp.name[0]}
                                </div>
                                {!collapsed && <span className="truncate">{comp.name}</span>}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
