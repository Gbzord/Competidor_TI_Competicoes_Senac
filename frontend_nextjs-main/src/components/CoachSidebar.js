'use client';

import { useAppContext } from '@/context/AppContext';
import { LayoutDashboard, ClipboardEdit, ListTodo, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'nova-avaliacao', label: 'Nova Avaliação', icon: ClipboardEdit },
    { id: 'tarefas', label: 'Tarefas', icon: ListTodo },
    { id: 'perfil', label: 'Perfil', icon: User },
];

export function CoachSidebar() {
    const { coachPage, setCoachPage, logout } = useAppContext();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border flex flex-col z-40">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                    S
                </div>
                <span className="font-semibold text-foreground">Senac Competidor</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = coachPage === item.id;
                    return (
                        <Button
                            key={item.id}
                            onClick={() => setCoachPage(item.id)}
                            variant={isActive ? 'default' : 'ghost'}
                            className={cn(
                                'w-full justify-start gap-3 px-3',
                                isActive ? '' : 'text-muted-foreground'
                            )}
                        >
                            <Icon className="h-4.5 w-4.5" />
                            {item.label}
                        </Button>
                    );
                })}
            </nav>

            {/* User */}
            <div className="px-4 py-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        MS
                    </div>
                    <div>
                        <p className="text-sm font-medium">Simone</p>
                        <p className="text-xs text-muted-foreground">Treinadora</p>
                    </div>
                </div>
                <Button
                    onClick={logout}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-3 text-muted-foreground"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </Button>
            </div>
        </aside>
    );
}
