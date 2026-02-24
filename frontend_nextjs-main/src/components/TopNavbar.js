'use client';

import { useAppContext } from '@/context/AppContext';
import { Home, BookOpen, Trophy, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function TopNavbar() {
    const { competitorPage, setCompetitorPage, logout } = useAppContext();

    const competitorTabs = [
        { id: 'dashboard', label: 'Meu Painel', icon: Home },
        { id: 'historico', label: 'Meu Histórico', icon: BookOpen },
        { id: 'ranking', label: 'Ranking', icon: Trophy },
        { id: 'perfil', label: 'Perfil', icon: User },
    ];

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                            S
                        </div>
                        <span className="font-semibold text-foreground hidden sm:block">
                            Portal do Competidor
                        </span>
                    </div>

                    {/* Nav Tabs */}
                    <nav className="flex items-center gap-1 overflow-x-auto">
                        {competitorTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = competitorPage === tab.id;
                            return (
                                <Button
                                    key={tab.id}
                                    onClick={() => setCompetitorPage(tab.id)}
                                    variant={isActive ? 'default' : 'ghost'}
                                    size="sm"
                                    className="gap-1.5 whitespace-nowrap"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </Button>
                            );
                        })}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                AS
                            </div>
                            <span className="text-sm font-medium hidden md:block">Ana Silva</span>
                        </div>
                        <Button
                            onClick={logout}
                            variant="ghost"
                            size="sm"
                            className="gap-1.5"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Sair</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
