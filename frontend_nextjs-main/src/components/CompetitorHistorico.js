'use client';

import { useAppContext } from '@/context/AppContext';
import { useCompetitor, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { tasks } from '@/data/mock-data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trophy, Star, Clock } from 'lucide-react';

export function CompetitorHistorico() {
    const { selectedCompetitorId } = useAppContext();
    const { data: competitor, isLoading } = useCompetitor(selectedCompetitorId);
    const { data: evaluations, isLoading: loadingEvals } = useEvaluations(selectedCompetitorId);

    if (isLoading || !competitor) {
        return <div className="p-6 space-y-4 max-w-4xl mx-auto">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>;
    }

    const sortedEvals = [...(evaluations || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const avgs = sortedEvals.map(ev => Object.values(ev.scores).reduce((a, b) => a + b, 0) / 6);
    const overallAvg = avgs.length > 0 ? avgs.reduce((a, b) => a + b, 0) / avgs.length : 0;
    const bestScore = avgs.length > 0 ? Math.max(...avgs) : 0;
    const avgTime = sortedEvals.length > 0 ? Math.round(sortedEvals.reduce((s, e) => s + e.timeSpent, 0) / sortedEvals.length) : 0;

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Histórico Completo de Avaliações</h1>
                <p className="text-sm text-muted-foreground">Todas as suas provas realizadas e feedbacks recebidos</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Trophy, label: 'Média Geral', value: overallAvg.toFixed(1) },
                    { icon: Star, label: 'Melhor Nota', value: bestScore.toFixed(1) },
                    { icon: Clock, label: 'Tempo Médio', value: `${avgTime} min` },
                ].map((s, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-4 shadow-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                            <s.icon className="h-4 w-4" /> {s.label}
                        </div>
                        <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Evaluations List */}
            <div className="bg-card rounded-xl border border-border shadow-xs">
                <div className="p-5 border-b border-border">
                    <h2 className="font-semibold">Todas as Avaliações ({sortedEvals.length})</h2>
                </div>
                {loadingEvals ? (
                    <div className="p-4 space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}</div>
                ) : (
                    <div className="divide-y divide-border">
                        {sortedEvals.map((ev, idx) => {
                            const task = tasks.find(t => t.id === ev.taskId);
                            const avg = Object.values(ev.scores).reduce((a, b) => a + b, 0) / 6;
                            const num = sortedEvals.length - idx;
                            return (
                                <div key={ev.id} className="p-5 hover:bg-accent/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                            {num}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">{task?.name || ev.taskId}</p>
                                                <div className="flex items-center gap-3 text-sm shrink-0">
                                                    <span className="font-semibold text-primary">{avg.toFixed(1)}</span>
                                                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{ev.timeSpent} min</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                📅 {(() => { try { return format(new Date(ev.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); } catch { return ev.date; } })()}
                                            </p>
                                            <div className="border-l-2 border-primary/30 pl-3 mt-3">
                                                <p className="text-xs font-medium text-muted-foreground mb-0.5">💬 Feedback da Treinadora:</p>
                                                <p className="text-sm text-muted-foreground">{ev.feedback}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
