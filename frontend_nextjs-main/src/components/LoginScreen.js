'use client';

import { useAppContext } from '@/context/AppContext';
import { GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoginScreen() {
    const { setRole } = useAppContext();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold mx-auto mb-4">
                        S
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Senac Competidor</h1>
                    <p className="text-sm text-muted-foreground mt-1">Selecione seu perfil para continuar</p>
                </div>

                {/* Role Cards */}
                <div className="space-y-3">
                    <Button
                        onClick={() => setRole('coach')}
                        variant="outline"
                        className="w-full h-auto bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group text-left justify-start"
                    >
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Treinadora</p>
                            <p className="text-sm text-muted-foreground">Simone Gerenciar competidores, avaliações e tarefas</p>
                        </div>
                    </Button>

                    <Button
                        onClick={() => setRole('competitor')}
                        variant="outline"
                        className="w-full h-auto bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group text-left justify-start"
                    >
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">Competidor</p>
                            <p className="text-sm text-muted-foreground">Ana Silva Ver painel, histórico e ranking</p>
                        </div>
                    </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                    Ambiente de demonstração • Sem autenticação real
                </p>
            </div>
        </div>
    );
}
