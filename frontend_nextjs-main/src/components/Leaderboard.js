'use client';

import { useState } from 'react';
import { useCompetitors, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function Leaderboard() {
    const { data: competitors, isLoading } = useCompetitors();
    const { data: allEvals } = useEvaluations();
    const [search, setSearch] = useState('');

    const filtered = competitors
        ?.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.overallAverage - a.overallAverage) ?? [];

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Painel da Treinadora</h1>
                <p className="text-sm text-muted-foreground">Ranking geral dos competidores</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar competidor..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Nova Avaliação
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>
            ) : (
                <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="px-4 py-3 text-left font-semibold text-xs text-muted-foreground">#</th>
                                <th className="px-4 py-3 text-left font-semibold text-xs text-muted-foreground">Competidor</th>
                                <th className="px-4 py-3 text-center font-semibold text-xs text-muted-foreground hidden md:table-cell">Avaliações</th>
                                <th className="px-4 py-3 text-center font-semibold text-xs text-muted-foreground">Média</th>
                                <th className="px-4 py-3 text-center font-semibold text-xs text-muted-foreground hidden sm:table-cell">Tendência</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c, i) => {
                                const rank = i + 1;
                                const evals = allEvals?.filter(e => e.competitorId === c.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                                const lastTwo = evals?.slice(0, 2);
                                let trend = 'stable';
                                if (lastTwo && lastTwo.length === 2) {
                                    const avg1 = Object.values(lastTwo[0].scores).reduce((a, b) => a + b, 0) / 6;
                                    const avg2 = Object.values(lastTwo[1].scores).reduce((a, b) => a + b, 0) / 6;
                                    trend = avg1 > avg2 ? 'up' : avg1 < avg2 ? 'down' : 'stable';
                                }
                                return (
                                    <tr key={c.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${rank <= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                                {rank}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                    {c.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{c.name}</p>
                                                    <p className="text-xs text-muted-foreground">{c.occupation}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center hidden md:table-cell font-medium">{c.evaluationCount}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-block px-3 py-1 rounded-full font-bold text-sm bg-primary/10 text-primary">
                                                {c.overallAverage.toFixed(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                                            {trend === 'up' && <TrendingUp className="h-5 w-5 mx-auto text-success" />}
                                            {trend === 'down' && <TrendingDown className="h-5 w-5 mx-auto text-destructive" />}
                                            {trend === 'stable' && <Minus className="h-5 w-5 mx-auto text-muted-foreground" />}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
