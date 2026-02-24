'use client';

import { useAppContext } from '@/context/AppContext';
import { useCompetitor, useCompetitors, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, BookOpen, Clock, Target, Mail, Calendar, Crosshair } from 'lucide-react';

export function CompetitorPerfil() {
    const { selectedCompetitorId } = useAppContext();
    const { data: competitor, isLoading } = useCompetitor(selectedCompetitorId);
    const { data: allCompetitors } = useCompetitors();
    const { data: evaluations } = useEvaluations(selectedCompetitorId);

    if (isLoading || !competitor) {
        return <div className="p-6 space-y-4 max-w-4xl mx-auto">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>;
    }

    const sorted = [...(allCompetitors || [])].sort((a, b) => b.overallAverage - a.overallAverage);
    const rank = sorted.findIndex(c => c.id === competitor.id) + 1;
    const totalHours = evaluations ? Math.round(evaluations.reduce((s, e) => s + e.timeSpent, 0) / 60) : 0;
    const avgs = (evaluations || []).map(ev => Object.values(ev.scores).reduce((a, b) => a + b, 0) / 6);
    const bestScore = avgs.length > 0 ? Math.max(...avgs) : 0;

    const badges = [
        { icon: '🏆', title: 'Primeiro Lugar', desc: 'Liderando o ranking da turma', date: 'Fevereiro 2026', color: 'bg-primary/10' },
        { icon: '🎯', title: '10 Provas Completas', desc: 'Completou 10 avaliações com sucesso', date: 'Janeiro 2026', color: 'bg-primary/10' },
        { icon: '⭐', title: 'Nota Máxima', desc: `Alcançou ${bestScore.toFixed(1)} em avaliação`, date: 'Fevereiro 2026', color: 'bg-primary/10' },
        { icon: '🚀', title: 'Evolução Constante', desc: 'Média acima de 9.0 por 3 meses', date: 'Janeiro 2026', color: 'bg-primary/10' },
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            {/* Hero */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold border-4 border-primary-foreground/30">
                        {competitor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{competitor.name}</h1>
                        <p className="text-primary-foreground/70 text-sm">{competitor.occupation}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-primary-foreground/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                                🏆 Top {rank}
                            </span>
                            <span className="text-xs bg-primary-foreground/20 px-2.5 py-0.5 rounded-full font-medium">
                                Média {competitor.overallAverage.toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Trophy, label: 'Posição', value: `#${rank}` },
                    { icon: BookOpen, label: 'Provas Feitas', value: competitor.evaluationCount.toString() },
                    { icon: Clock, label: 'Horas Dedicadas', value: `${totalHours}h` },
                    { icon: Target, label: 'Taxa Conclusão', value: '100%' },
                ].map((s, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-4 shadow-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                            <s.icon className="h-4 w-4" /> {s.label}
                        </div>
                        <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Info + Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                    <h2 className="font-semibold mb-4">Informações Pessoais</h2>
                    <div className="space-y-4">
                        {[
                            { icon: Mail, label: 'Email', value: 'ana.silva@aluno.senac.br' },
                            { icon: Calendar, label: 'Matrícula desde', value: 'Setembro 2025' },
                            { icon: Crosshair, label: 'Meta de Conclusão', value: 'Junho 2026' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="text-sm font-medium">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                    <h2 className="font-semibold mb-4">Progresso do Curso</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Módulos Completados', value: '8/10', pct: 80, color: 'bg-primary' },
                            { label: 'Frequência', value: '95%', pct: 95, color: 'bg-primary' },
                            { label: 'Performance Geral', value: '92%', pct: 92, color: 'bg-primary' },
                        ].map((p, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span>{p.label}</span>
                                    <span className="font-semibold">{p.value}</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${p.color} transition-all`} style={{ width: `${p.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                <h2 className="font-semibold mb-4">Conquistas e Badges</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {badges.map((b, i) => (
                        <div key={i} className={`${b.color} rounded-lg p-4 flex items-start gap-3`}>
                            <span className="text-2xl">{b.icon}</span>
                            <div>
                                <p className="font-semibold text-sm">{b.title}</p>
                                <p className="text-xs text-muted-foreground">{b.desc}</p>
                                <p className="text-xs text-muted-foreground mt-1">{b.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
