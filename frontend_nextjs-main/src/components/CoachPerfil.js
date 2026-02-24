'use client';

import { CoachTopBar } from './CoachTopBar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';

const achievements = [
    { title: 'Melhor Treinadora 2025', description: 'Reconhecimento por excelência em ensino', date: 'Dezembro 2025' },
    { title: '100% de Aprovação', description: 'Turma completa aprovada em certificação', date: 'Outubro 2025' },
    { title: 'Inovação Pedagógica', description: 'Implementação de metodologias ágeis no ensino', date: 'Junho 2025' },
];

export function CoachPerfil() {
    return (
        <div>
            <CoachTopBar title="Perfil" />
            <div className="p-6 max-w-4xl mx-auto space-y-6">
                {/* Profile Header */}
                <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-primary to-primary/70" />
                    <div className="px-6 pb-6 -mt-12 flex items-end justify-between">
                        <div className="flex items-end gap-4">
                            <div className="h-24 w-24 rounded-full border-4 border-card bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                MS
                            </div>
                            <div className="pb-1">
                                <h2 className="text-xl font-bold">Simone</h2>
                                <p className="text-sm text-muted-foreground">Treinadora Sênior</p>
                            </div>
                        </div>
                        <Button className="mb-1">
                            Editar Perfil
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Competidores Treinados', value: '42' },
                        { label: 'Avaliações Realizadas', value: '328' },
                        { label: 'Taxa de Aprovação', value: '94%' },
                        { label: 'Média de Satisfação', value: '4.8/5' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card rounded-xl border border-border p-4">
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Contact + About */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card rounded-xl border border-border p-5">
                        <h3 className="font-semibold mb-4">Informações de Contato</h3>
                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email', value: 'maria.souza@senac.br' },
                                { icon: Phone, label: 'Telefone', value: '+55 (11) 98765-4321' },
                                { icon: MapPin, label: 'Localização', value: 'São Paulo, SP' },
                                { icon: Calendar, label: 'Membro desde', value: 'Janeiro 2020' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <item.icon className="h-4.5 w-4.5 mt-0.5 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">{item.label}</p>
                                        <p className="text-sm font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-5">
                        <h3 className="font-semibold mb-4">Sobre</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Profissional experiente em desenvolvimento de software com mais de 10 anos de experiência.
                            Especializada em formar desenvolvedores full-stack e preparar talentos para o mercado tech.
                        </p>
                    </div>
                </div>

                {/* Achievements */}
                <div className="bg-card rounded-xl border border-border p-5">
                    <h3 className="font-semibold mb-4">Conquistas e Reconhecimentos</h3>
                    <div className="space-y-3">
                        {achievements.map((a, i) => (
                            <div key={i} className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Award className="h-4.5 w-4.5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{a.title}</p>
                                    <p className="text-xs text-muted-foreground">{a.description}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
