'use client';

import { useAppContext } from '@/context/AppContext';
import { useCompetitor, useCompetitors, useRadar, useEvolution, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { tasks, upcomingTasks } from '@/data/mock-data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trophy, BookOpen, Clock, TrendingUp, Lightbulb, CheckCircle } from 'lucide-react';

export function CompetitorDashboard() {
    const { selectedCompetitorId } = useAppContext();
    const { data: competitor, isLoading } = useCompetitor(selectedCompetitorId);
    const { data: allCompetitors } = useCompetitors();
    const { data: radarData, isLoading: loadingRadar } = useRadar(selectedCompetitorId);
    const { data: evolution, isLoading: loadingEvo } = useEvolution(selectedCompetitorId);
    const { data: evaluations } = useEvaluations(selectedCompetitorId);

    if (isLoading || !competitor) {
        return (
            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <div className="grid grid-cols-2 gap-6"><Skeleton className="h-80 rounded-xl" /><Skeleton className="h-80 rounded-xl" /></div>
            </div>
        );
    }

    const sorted = [...(allCompetitors || [])].sort((a, b) => b.overallAverage - a.overallAverage);
    const rank = sorted.findIndex((c) => c.id === competitor.id) + 1;
    const classAvg = sorted.length > 0 ? sorted.reduce((s, c) => s + c.overallAverage, 0) / sorted.length : 0;
    const aboveAvgPct = classAvg > 0 ? ((competitor.overallAverage - classAvg) / classAvg * 100).toFixed(1) : '0';

    const recentEvals = evaluations?.
        sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).
        slice(0, 5) ?? [];

    const lowestSkill = radarData ? [...radarData].sort((a, b) => a.value - b.value)[0] : null;

    const lastTenAvg = evolution && evolution.length > 0 ?
        (evolution.slice(-10).reduce((s, e) => s + e.average, 0) / Math.min(evolution.length, 10)).toFixed(1) :
        '0';

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {/* Hero */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg font-bold">
                        {competitor.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Olá, {competitor.name}! 👋</h1>
                        <p className="text-primary-foreground/80 text-sm">Continue com o excelente trabalho! Você está no topo da turma.</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: Trophy, label: 'Média Geral', value: competitor.overallAverage.toFixed(1) },
                        { icon: BookOpen, label: 'Total de Provas', value: competitor.evaluationCount.toString() },
                        { icon: Trophy, label: 'Posição no Ranking', value: `#${rank} de ${sorted.length}` }
                    ].map((stat, i) =>
                        <div key={i} className="bg-primary-foreground/10 rounded-lg p-3">
                            <div className="flex items-center gap-1.5 text-primary-foreground/70 text-xs mb-1">
                                <stat.icon className="h-3.5 w-3.5" />
                                {stat.label}
                            </div>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Performance vs class */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="font-semibold">Seu Desempenho vs Média da Turma</h2>
                        <p className="text-xs text-muted-foreground">Você está {aboveAvgPct}% acima da média!</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                    <span>Sua nota: {competitor.overallAverage.toFixed(1)}</span>
                    <span className="text-muted-foreground">Média: {classAvg.toFixed(1)}</span>
                </div>
                <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all" style={{ width: `${competitor.overallAverage / 10 * 100}%` }} />
                </div>
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Continue assim para manter sua posição no topo!
                </p>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar */}
                <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                    <h2 className="font-semibold mb-4">Análise de Habilidades</h2>
                    {loadingRadar ? <Skeleton className="h-72" /> :
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={radarData} margin={{ top: 40, right: 30, bottom: 30, left: 30 }}>
                                <PolarGrid stroke="#e0e7ff" strokeDasharray="0" />
                                <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 11 }} />
                                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <Radar name="Habilidades" dataKey="value" stroke="#0066ff" fill="#0066ff" fillOpacity={0.4} strokeWidth={2.5} />
                            </RadarChart>
                        </ResponsiveContainer>
                    }
                    {lowestSkill &&
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Lightbulb className="h-3.5 w-3.5 text-warning" /> Dica: Continue praticando {lowestSkill.skill} para um perfil ainda mais completo!
                        </p>
                    }
                </div>

                {/* Evolution */}
                <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                    <h2 className="font-semibold mb-4">Evolução das Últimas 10 Provas</h2>
                    {loadingEvo ? <Skeleton className="h-72" /> :
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={evolution?.slice(-10)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                                <XAxis dataKey="label" tick={false} />
                                <YAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e0e7ff', background: '#ffffff', fontSize: 12 }}
                                    labelFormatter={(_, payload) => payload?.[0]?.payload?.label || ''} />
                                <Area type="monotone" dataKey="average" stroke="#0066ff" fill="#0066ff" fillOpacity={0.15} strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-primary" /> Sua performance está consistente! Média nas últimas 10: {lastTenAvg}
                    </p>
                </div>
            </div>

            {/* Recent History */}
            <div className="bg-card rounded-xl border border-border shadow-xs">
                <div className="p-5 border-b border-border">
                    <h2 className="font-semibold">Meu Histórico de Provas (Recentes)</h2>
                    <p className="text-xs text-muted-foreground">Veja seus resultados e feedbacks da treinadora</p>
                </div>
                <div className="divide-y divide-border">
                    {recentEvals.map((ev) => {
                        const task = tasks.find((t) => t.id === ev.taskId);
                        const avg = Object.values(ev.scores).reduce((a, b) => a + b, 0) / 6;
                        return (
                            <div key={ev.id} className="p-5 hover:bg-accent/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="font-semibold text-sm">{task?.name || ev.taskId}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(() => { try { return format(new Date(ev.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); } catch { return ev.date; } })()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="font-semibold text-primary">Nota: {avg.toFixed(1)}</span>
                                        <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{ev.timeSpent} min</span>
                                    </div>
                                </div>
                                <div className="border-l-2 border-primary/30 pl-3 mt-2">
                                    <p className="text-xs font-medium text-muted-foreground mb-0.5">💬 Feedback da Treinadora:</p>
                                    <p className="text-sm text-muted-foreground">{ev.feedback}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                <h2 className="font-semibold mb-1">Próximas Tarefas Disponíveis</h2>
                <p className="text-xs text-muted-foreground mb-4">Desafios prontos para você realizar</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {upcomingTasks.map((t, i) =>
                        <div key={i} className="border border-border rounded-lg p-4 hover:bg-accent/30 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm">{t.name}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.difficulty === 'Difícil' ? 'bg-destructive/10 text-destructive' :
                                    t.difficulty === 'Médio' ? 'bg-primary/10 text-primary' :
                                        'bg-success/10 text-success'}`
                                }>{t.difficulty}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{t.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Tempo estimado: {t.estimatedTime} min</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
