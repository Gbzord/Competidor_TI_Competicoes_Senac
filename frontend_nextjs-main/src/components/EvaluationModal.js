'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCompetitors, useTasks, useCreateEvaluation } from '@/hooks/use-mock-api';
import { toast } from 'sonner';

const skillLabels = {
    logica: 'Lógica', frontend: 'Front-end', backend: 'Back-end',
    bancoDeDados: 'Banco de Dados', softSkills: 'Soft Skills', devOps: 'DevOps',
};
const skillKeys = Object.keys(skillLabels);

export function EvaluationModal({ open, onClose }) {
    const { data: competitors } = useCompetitors();
    const { data: tasks } = useTasks();
    const createMutation = useCreateEvaluation();
    const [competitorId, setCompetitorId] = useState('');
    const [taskId, setTaskId] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [feedback, setFeedback] = useState('');
    const [scores, setScores] = useState({});
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!competitorId) newErrors.competitorId = 'Selecione um competidor';
        if (!taskId) newErrors.taskId = 'Selecione uma tarefa';
        const time = parseFloat(timeSpent);
        if (!timeSpent || isNaN(time) || time <= 0) newErrors.timeSpent = 'Informe um tempo válido';
        skillKeys.forEach(key => {
            const val = parseFloat(scores[key] || '');
            if (isNaN(val) || val < 0 || val > 10) newErrors[key] = '0-10';
        });
        if (!feedback.trim()) newErrors.feedback = 'Feedback obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const parsedScores = Object.fromEntries(skillKeys.map(key => [key, parseFloat(scores[key])]));
        createMutation.mutate({
            competitorId, taskId, date: new Date().toISOString().split('T')[0],
            scores: parsedScores, timeSpent: parseFloat(timeSpent), feedback, evaluator: 'Treinadora',
        }, {
            onSuccess: () => {
                toast.success('Avaliação registrada!');
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Nova Avaliação</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                    <div>
                        <Label>Competidor *</Label>
                        <Select value={competitorId} onValueChange={setCompetitorId}>
                            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                            <SelectContent>{competitors?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                        </Select>
                        {errors.competitorId && <p className="text-destructive text-xs mt-1">{errors.competitorId}</p>}
                    </div>

                    <div>
                        <Label>Tarefa *</Label>
                        <Select value={taskId} onValueChange={setTaskId}>
                            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                            <SelectContent>{tasks?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                        </Select>
                        {errors.taskId && <p className="text-destructive text-xs mt-1">{errors.taskId}</p>}
                    </div>

                    <div>
                        <Label>Tempo (minutos) *</Label>
                        <Input type="number" min={0} value={timeSpent} onChange={e => setTimeSpent(e.target.value)} className="mt-1.5" placeholder="45" />
                        {errors.timeSpent && <p className="text-destructive text-xs mt-1">{errors.timeSpent}</p>}
                    </div>

                    <div>
                        <Label>Notas por Habilidade *</Label>
                        <div className="grid grid-cols-2 gap-3 mt-1.5">
                            {skillKeys.map(key => (
                                <div key={key}>
                                    <label className="text-xs text-muted-foreground">{skillLabels[key]}</label>
                                    <Input type="number" min={0} max={10} step={0.5} value={scores[key] || ''} onChange={e => setScores({ ...scores, [key]: e.target.value })} placeholder="0-10" className="mt-0.5" />
                                    {errors[key] && <p className="text-destructive text-xs mt-0.5">{errors[key]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>Feedback *</Label>
                        <Textarea value={feedback} onChange={e => setFeedback(e.target.value)} className="mt-1.5 min-h-[100px]" placeholder="Feedback..." />
                        {errors.feedback && <p className="text-destructive text-xs mt-1">{errors.feedback}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button onClick={onClose} variant="outline">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} disabled={createMutation.isPending}>
                            {createMutation.isPending ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
