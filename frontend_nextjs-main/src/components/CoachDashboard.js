'use client';

import { useCompetitors, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Trophy, Award, ClipboardList, Clock, Eye, Plus } from 'lucide-react';
import { CoachTopBar } from './CoachTopBar';
import { useAppContext } from '@/context/AppContext';

export function CoachDashboard() {
    const { data: competitors, isLoading } = useCompetitors();
    const { data: allEvals } = useEvaluations();
    const { setCoachPage } = useAppContext();

    const sorted = [...(competitors || [])].sort((a, b) => b.overallAverage - a.overallAverage);
    const classAvg = sorted.length > 0 ? (sorted.reduce((s, c) => s + c.overallAverage, 0) / sorted.length).toFixed(1) : '0';
    const topCompetitor = sorted[0];
    const pendingEvals = 3; // mock

    return (
        <div>
            <CoachTopBar title="Dashboard - Leaderboard" />
            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Trophy className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Média da Turma</p>
                        <p className="text-3xl font-bold mt-1">{classAvg}</p>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Award className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Top 1 Competidor</p>
                        <p className="text-2xl font-bold mt-1">{topCompetitor?.name || ''}</p>
                        <p className="text-sm text-muted-foreground">Média: {topCompetitor?.overallAverage.toFixed(1)}</p>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <ClipboardList className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Provas Pendentes</p>
                        <p className="text-3xl font-bold mt-1">{pendingEvals}</p>
                        <p className="text-sm text-muted-foreground">Aguardando correção</p>
                    </div>
                </div>

                {/* Ranking Table */}
                <div className="bg-card rounded-xl border border-border shadow-xs">
                    <div className="flex items-center justify-between p-5 border-b border-border">
                        <h2 className="text-lg font-semibold">Ranking de Competidores</h2>
                        <Button
                            onClick={() => setCoachPage('nova-avaliacao')}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" /> Nova Avaliação
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="p-5 space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-5 py-3 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Posição</th>
                                        <th className="px-5 py-3 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Nome</th>
                                        <th className="px-5 py-3 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Média Geral</th>
                                        <th className="px-5 py-3 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Tempo Médio</th>
                                        <th className="px-5 py-3 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Última Atividade</th>
                                        <th className="px-5 py-3 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sorted.map((c, i) => {
                                        const rank = i + 1;
                                        const evals = allEvals?.filter(e => e.competitorId === c.id) || [];
                                        const avgTime = evals.length > 0 ? Math.round(evals.reduce((s, e) => s + e.timeSpent, 0) / evals.length) : 0;
                                        const lastEval = evals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                                        const lastDate = lastEval ? new Date(lastEval.date).toLocaleDateString('pt-BR') : '';

                                        return (
                                            <tr key={c.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                                                <td className="px-5 py-4">
                                                    <span className={`font-bold text-sm ${rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                                                        #{rank}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                            {c.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <span className="font-medium">{c.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary">
                                                        {c.overallAverage.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center text-muted-foreground">
                                                    <span className="flex items-center justify-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" /> {avgTime} min
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center text-muted-foreground">{lastDate}</td>
                                                <td className="px-5 py-4 text-center">
                                                    <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mx-auto">
                                                        <Eye className="h-3.5 w-3.5" /> Ver Análise
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
