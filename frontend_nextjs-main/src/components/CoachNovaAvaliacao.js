'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCompetitors, useTasks, useCreateEvaluation } from '@/hooks/use-mock-api';
import { toast } from 'sonner';
import { CoachTopBar } from './CoachTopBar';
import { useAppContext } from '@/context/AppContext';
import { Lightbulb } from 'lucide-react';

export function CoachNovaAvaliacao() {
    const { data: competitors } = useCompetitors();
    const { data: tasks } = useTasks();
    const createMutation = useCreateEvaluation();
    const { setCoachPage } = useAppContext();

    const [competitorId, setCompetitorId] = useState('');
    const [taskId, setTaskId] = useState('');
    const [nota, setNota] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!competitorId) newErrors.competitorId = 'Selecione um competidor';
        if (!taskId) newErrors.taskId = 'Selecione uma tarefa';
        const n = parseFloat(nota);
        if (!nota || isNaN(n) || n < 0 || n > 10) newErrors.nota = 'Nota deve ser entre 0 e 10';
        const time = parseFloat(timeSpent);
        if (!timeSpent || isNaN(time) || time <= 0) newErrors.timeSpent = 'Informe um tempo válido';
        if (!feedback.trim()) newErrors.feedback = 'Feedback obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const score = parseFloat(nota);
        const scores = {
            logica: score, frontend: score, backend: score,
            bancoDeDados: score, softSkills: score, devOps: score,
        };
        createMutation.mutate({
            competitorId, taskId, date: new Date().toISOString().split('T')[0],
            scores, timeSpent: parseFloat(timeSpent), feedback, evaluator: 'Treinadora',
        }, {
            onSuccess: () => {
                toast.success('Avaliação registrada com sucesso!');
                setCoachPage('dashboard');
            },
        });
    };

    return (
        <div>
            <CoachTopBar title="Nova Avaliação" />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                {/* Form Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-xs">
                    <h2 className="text-lg font-bold mb-1">Registrar Nova Avaliação</h2>
                    <p className="text-sm text-muted-foreground mb-6">Preencha os campos abaixo para registrar a avaliação de um competidor</p>

                    <div className="space-y-5">
                        <div>
                            <Label>Competidor *</Label>
                            <Select value={competitorId} onValueChange={setCompetitorId}>
                                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecionar competidor..." /></SelectTrigger>
                                <SelectContent>{competitors?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                            </Select>
                            {errors.competitorId && <p className="text-destructive text-xs mt-1">{errors.competitorId}</p>}
                        </div>

                        <div>
                            <Label>Tarefa *</Label>
                            <Select value={taskId} onValueChange={setTaskId}>
                                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecionar tarefa..." /></SelectTrigger>
                                <SelectContent>{tasks?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                            </Select>
                            {errors.taskId && <p className="text-destructive text-xs mt-1">{errors.taskId}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Nota (0-10) *</Label>
                                <Input type="number" min={0} max={10} step={0.5} value={nota} onChange={e => setNota(e.target.value)} className="mt-1.5" placeholder="8.5" />
                                {errors.nota && <p className="text-destructive text-xs mt-1">{errors.nota}</p>}
                            </div>
                            <div>
                                <Label>Tempo (minutos) *</Label>
                                <Input type="number" min={0} value={timeSpent} onChange={e => setTimeSpent(e.target.value)} className="mt-1.5" placeholder="45" />
                                {errors.timeSpent && <p className="text-destructive text-xs mt-1">{errors.timeSpent}</p>}
                            </div>
                        </div>

                        <div>
                            <Label>Feedback *</Label>
                            <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} className="mt-1.5 min-h-[120px]" placeholder="Descreva o desempenho do competidor, pontos fortes e áreas de melhoria..." />
                            {errors.feedback && <p className="text-destructive text-xs mt-1">{errors.feedback}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-border">
                        <Button onClick={() => setCoachPage('dashboard')} variant="outline">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'Salvando...' : 'Salvar Avaliação'}
                        </Button>
                    </div>
                </div>

                {/* Tips Card */}
                <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
                    <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-primary" /> Dicas para Avaliação
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Seja objetivo e específico no feedback</li>
                        <li>• Destaque pontos fortes e áreas de melhoria</li>
                        <li>• Use exemplos concretos quando possível</li>
                        <li>• Considere o nível de experiência do competidor</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
