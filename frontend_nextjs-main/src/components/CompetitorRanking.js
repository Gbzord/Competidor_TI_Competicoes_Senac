'use client';

import { useAppContext } from '@/context/AppContext';
import { useCompetitors, useEvaluations } from '@/hooks/use-mock-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, TrendingUp } from 'lucide-react';

export function CompetitorRanking() {
    const { selectedCompetitorId } = useAppContext();
    const { data: competitors, isLoading } = useCompetitors();
    const { data: allEvals } = useEvaluations();

    if (isLoading || !competitors) {
        return <div className="p-6 space-y-4 max-w-4xl mx-auto">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>;
    }

    const sorted = [...competitors].sort((a, b) => b.overallAverage - a.overallAverage);
    const myRank = sorted.findIndex(c => c.id === selectedCompetitorId) + 1;

    const trophyIcons = ['🥇', '🥈', '🥉'];

    const getAvgTime = (compId) => {
        const evals = allEvals?.filter(e => e.competitorId === compId) || [];
        return evals.length > 0 ? Math.round(evals.reduce((s, e) => s + e.timeSpent, 0) / evals.length) : 0;
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Ranking Geral da Turma</h1>
                <p className="text-sm text-muted-foreground">Veja como você está se saindo em relação aos outros competidores</p>
            </div>

            {/* My Position Hero */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                        <Trophy className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm text-primary-foreground/70">Sua Posição Atual</p>
                        <p className="text-3xl font-bold">#{myRank} <span className="text-lg font-normal text-primary-foreground/70">de {sorted.length}</span></p>
                    </div>
                </div>
                <p className="mt-3 text-sm text-primary-foreground/80 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" /> Continue assim para manter sua liderança!
                </p>
            </div>

            {/* Full ranking */}
            <div className="bg-card rounded-xl border border-border shadow-xs">
                <div className="p-5 border-b border-border">
                    <h2 className="font-semibold">Classificação Completa</h2>
                </div>
                <div className="divide-y divide-border">
                    {sorted.map((c, i) => {
                        const rank = i + 1;
                        const isMe = c.id === selectedCompetitorId;
                        const avgTime = getAvgTime(c.id);
                        return (
                            <div key={c.id} className={`p-4 flex items-center gap-4 transition-colors ${isMe ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-accent/30'}`}>
                                <div className="w-8 text-center shrink-0">
                                    {rank <= 3 ? (
                                        <span className="text-xl">{trophyIcons[rank - 1]}</span>
                                    ) : (
                                        <span className="text-lg font-semibold text-muted-foreground">{rank}</span>
                                    )}
                                </div>
                                <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                                    {c.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{isMe ? 'Você' : c.name}</p>
                                        {isMe && (
                                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">Você está aqui</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-3">
                                        <span>🏅 Média: {c.overallAverage.toFixed(1)}</span>
                                        <span>Tempo médio: {avgTime} min</span>
                                    </p>
                                </div>
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0 ${rank === 1 ? 'border-primary bg-primary/10 text-primary' :
                                        rank <= 3 ? 'border-primary/50 bg-primary/5 text-primary' :
                                            'border-warning/50 bg-warning/10 text-warning'
                                    }`}>
                                    {c.overallAverage.toFixed(1)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tips */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs">
                <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                        <h3 className="font-semibold mb-2">💡 Dicas para Melhorar sua Posição</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Mantenha a consistência nas entregas</li>
                            <li>• Aplique os feedbacks recebidos da treinadora</li>
                            <li>• Pratique as habilidades com menor pontuação</li>
                            <li>• Tente otimizar o tempo de resolução dos exercícios</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
