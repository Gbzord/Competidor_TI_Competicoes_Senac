'use client';

import { useState } from 'react';
import { CoachTopBar } from './CoachTopBar';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, Circle, Plus } from 'lucide-react';

const mockTasks = [
    { id: '1', title: 'Preparar prova de Backend', description: 'Criar exercícios práticos de Node.js e Express', deadline: '21/02/2026', responsible: 'Simone', status: 'em_andamento' },
    { id: '2', title: 'Revisar avaliações pendentes', description: 'Corrigir 3 provas de React avançado', deadline: '19/02/2026', responsible: 'Simone', status: 'pendente' },
    { id: '3', title: 'Atualizar material didático', description: 'Adicionar novos exemplos de TypeScript', deadline: '24/02/2026', responsible: 'Simone', status: 'pendente' },
    { id: '4', title: 'Reunião de feedback', description: 'Discussão individual com top 3 competidores', deadline: '17/02/2026', responsible: 'Simone', status: 'concluida' },
];

const statusConfig = {
    pendente: { label: 'Pendente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    em_andamento: { label: 'Em Andamento', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    concluida: { label: 'Concluída', className: 'bg-green-50 text-green-700 border-green-200' },
};

const statusIcon = {
    pendente: Circle,
    em_andamento: Clock,
    concluida: CheckCircle2,
};

export function CoachTarefas() {
    const [tasks] = useState(mockTasks);

    const counts = {
        pendente: tasks.filter(t => t.status === 'pendente').length,
        em_andamento: tasks.filter(t => t.status === 'em_andamento').length,
        concluida: tasks.filter(t => t.status === 'concluida').length,
    };

    return (
        <div>
            <CoachTopBar title="Tarefas" />
            <div className="p-6 space-y-6">
                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pendentes</p>
                            <p className="text-3xl font-bold mt-1">{counts.pendente}</p>
                        </div>
                        <Circle className="h-8 w-8 text-amber-400" />
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Em Andamento</p>
                            <p className="text-3xl font-bold mt-1">{counts.em_andamento}</p>
                        </div>
                        <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Concluídas</p>
                            <p className="text-3xl font-bold mt-1">{counts.concluida}</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                </div>

                {/* Tasks List */}
                <div className="bg-card rounded-xl border border-border shadow-xs">
                    <div className="flex items-center justify-between p-5 border-b border-border">
                        <h2 className="text-lg font-semibold">Lista de Tarefas</h2>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> Nova Tarefa
                        </Button>
                    </div>
                    <div className="divide-y divide-border">
                        {tasks.map(task => {
                            const Icon = statusIcon[task.status];
                            const config = statusConfig[task.status];
                            return (
                                <div key={task.id} className="p-5 flex items-start gap-4 hover:bg-accent/30 transition-colors">
                                    <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${task.status === 'concluida' ? 'text-green-500' : task.status === 'em_andamento' ? 'text-primary' : 'text-amber-400'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm">{task.title}</p>
                                        <p className="text-sm text-muted-foreground mt-0.5">{task.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1.5">
                                            Prazo: {task.deadline} &nbsp;•&nbsp; Responsável: {task.responsible}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full border shrink-0 ${config.className}`}>
                                        {config.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
