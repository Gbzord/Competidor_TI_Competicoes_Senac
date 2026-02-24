import { Competitor, Task, Evaluation, EvolutionPoint } from '@/types';

export const tasks: Task[] = [
  { id: 't1', name: 'Redux Toolkit', description: 'Gerenciamento de estado com Redux Toolkit', maxTime: 60 },
  { id: 't2', name: 'TypeScript Avançado', description: 'Tipos complexos e generics em TypeScript', maxTime: 50 },
  { id: 't3', name: 'Styled Components React', description: 'Design system com Styled Components', maxTime: 45 },
  { id: 't4', name: 'GraphQL API', description: 'Estruturação de schemas e resolvers GraphQL', maxTime: 55 },
  { id: 't5', name: 'Deploy com Docker', description: 'Containerização e deploy de aplicações', maxTime: 60 },
  { id: 't6', name: 'Autenticação JWT', description: 'Implementação de autenticação segura com JWT', maxTime: 45 },
  { id: 't7', name: 'Testes Unitários Jest', description: 'Cobertura de testes unitários e de integração', maxTime: 55 },
  { id: 't8', name: 'Banco de Dados PostgreSQL', description: 'Modelagem e queries otimizadas', maxTime: 50 },
  { id: 't9', name: 'Interface Dashboard React', description: 'Dashboard responsivo com React', maxTime: 55 },
  { id: 't10', name: 'API REST com Node.js', description: 'API REST completa com Node.js e Express', maxTime: 50 },
];

export const upcomingTasks: { name: string; description: string; difficulty: 'Fácil' | 'Médio' | 'Difícil'; estimatedTime: number }[] = [
  { name: 'Microsserviços com Node.js', description: 'Criar uma arquitetura de microsserviços comunicando via gRPC', difficulty: 'Difícil', estimatedTime: 120 },
  { name: 'Next.js SSR', description: 'Implementar Server-Side Rendering com Next.js 14', difficulty: 'Médio', estimatedTime: 60 },
  { name: 'CI/CD Pipeline', description: 'Configurar pipeline de integração contínua com GitHub Actions', difficulty: 'Médio', estimatedTime: 90 },
  { name: 'WebSockets Real-time', description: 'Desenvolver chat em tempo real com Socket.io', difficulty: 'Médio', estimatedTime: 75 },
];

export const competitors: Competitor[] = [
  {
    id: 'c1', name: 'Ana Silva', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 9.0, frontend: 9.2, backend: 8.8, bancoDeDados: 9.0, softSkills: 8.5, devOps: 8.5 },
    overallAverage: 9.2, evaluationCount: 10,
  },
  {
    id: 'c2', name: 'Carlos Mendes', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 8.5, frontend: 8.0, backend: 9.0, bancoDeDados: 9.2, softSkills: 8.0, devOps: 8.5 },
    overallAverage: 8.8, evaluationCount: 9,
  },
  {
    id: 'c3', name: 'Beatriz Costa', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 8.0, frontend: 8.5, backend: 8.5, bancoDeDados: 8.0, softSkills: 8.8, devOps: 8.0 },
    overallAverage: 8.5, evaluationCount: 8,
  },
  {
    id: 'c4', name: 'Diego Almeida', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 7.8, frontend: 8.0, backend: 7.5, bancoDeDados: 8.2, softSkills: 8.5, devOps: 7.5 },
    overallAverage: 8.1, evaluationCount: 7,
  },
  {
    id: 'c5', name: 'Fernanda Lima', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 7.5, frontend: 7.8, backend: 7.5, bancoDeDados: 8.0, softSkills: 8.2, devOps: 7.5 },
    overallAverage: 7.9, evaluationCount: 8,
  },
  {
    id: 'c6', name: 'Gabriel Santos', avatar: '', occupation: 'Competidor Senac',
    skills: { logica: 7.0, frontend: 7.5, backend: 7.8, bancoDeDados: 7.5, softSkills: 7.5, devOps: 7.0 },
    overallAverage: 7.6, evaluationCount: 6,
  },
];

export const evaluations: Evaluation[] = [
  { id: 'e1', competitorId: 'c1', taskId: 't1', date: '2026-01-04', scores: { logica: 8.5, frontend: 8.8, backend: 8.5, bancoDeDados: 8.5, softSkills: 8.5, devOps: 8.8 }, timeSpent: 52, feedback: 'Boa organização de estado. Explore mais o uso de RTK Query para simplificar chamadas de API.', evaluator: 'Treinadora' },
  { id: 'e2', competitorId: 'c1', taskId: 't2', date: '2026-01-09', scores: { logica: 9.5, frontend: 9.2, backend: 9.5, bancoDeDados: 9.0, softSkills: 9.0, devOps: 9.2 }, timeSpent: 43, feedback: 'Excelente domínio de tipos complexos e generics. Suas interfaces estão muito bem definidas!', evaluator: 'Treinadora' },
  { id: 'e3', competitorId: 'c1', taskId: 't3', date: '2026-01-14', scores: { logica: 8.8, frontend: 9.0, backend: 8.8, bancoDeDados: 8.5, softSkills: 9.0, devOps: 8.5 }, timeSpent: 40, feedback: 'Design system bem implementado. Considere criar mais variantes de componentes para maior reusabilidade.', evaluator: 'Treinadora' },
  { id: 'e4', competitorId: 'c1', taskId: 't4', date: '2026-01-19', scores: { logica: 9.0, frontend: 9.0, backend: 9.2, bancoDeDados: 9.0, softSkills: 9.0, devOps: 9.5 }, timeSpent: 47, feedback: 'Ótima estruturação de schemas e resolvers. Continue explorando otimizações com DataLoader.', evaluator: 'Treinadora' },
  { id: 'e5', competitorId: 'c1', taskId: 't5', date: '2026-01-24', scores: { logica: 8.5, frontend: 8.5, backend: 8.8, bancoDeDados: 8.5, softSkills: 8.8, devOps: 9.0 }, timeSpent: 55, feedback: 'Bom trabalho com containers. Poderia otimizar o tamanho das imagens usando multi-stage builds.', evaluator: 'Treinadora' },
  { id: 'e6', competitorId: 'c1', taskId: 't6', date: '2026-01-29', scores: { logica: 9.2, frontend: 9.5, backend: 9.0, bancoDeDados: 9.2, softSkills: 9.5, devOps: 9.5 }, timeSpent: 38, feedback: 'Implementação segura e eficiente. Excelente uso de refresh tokens e validações.', evaluator: 'Treinadora' },
  { id: 'e7', competitorId: 'c1', taskId: 't7', date: '2026-02-04', scores: { logica: 8.8, frontend: 8.5, backend: 8.8, bancoDeDados: 8.5, softSkills: 9.0, devOps: 9.2 }, timeSpent: 50, feedback: 'Boa cobertura de testes. Considere adicionar mais testes de integração para cobrir os fluxos completos da aplicação.', evaluator: 'Treinadora' },
  { id: 'e8', competitorId: 'c1', taskId: 't8', date: '2026-02-09', scores: { logica: 9.0, frontend: 9.0, backend: 9.0, bancoDeDados: 9.2, softSkills: 9.0, devOps: 8.8 }, timeSpent: 45, feedback: 'Modelagem eficiente e queries otimizadas. Bom uso de índices. Parabéns pelo trabalho!', evaluator: 'Treinadora' },
  { id: 'e9', competitorId: 'c1', taskId: 't9', date: '2026-02-14', scores: { logica: 9.0, frontend: 9.2, backend: 8.8, bancoDeDados: 9.0, softSkills: 9.0, devOps: 9.0 }, timeSpent: 48, feedback: 'Ótimo design responsivo. Poderia melhorar a acessibilidade em alguns componentes. Considere usar mais atributos ARIA.', evaluator: 'Treinadora' },
  { id: 'e10', competitorId: 'c1', taskId: 't10', date: '2026-02-18', scores: { logica: 9.5, frontend: 9.5, backend: 9.5, bancoDeDados: 9.5, softSkills: 9.5, devOps: 9.0 }, timeSpent: 42, feedback: 'Excelente implementação! Código limpo e bem estruturado com tratamento adequado de erros. Continue assim!', evaluator: 'Treinadora' },
  { id: 'e11', competitorId: 'c2', taskId: 't1', date: '2026-01-05', scores: { logica: 8.5, frontend: 8.0, backend: 9.0, bancoDeDados: 9.0, softSkills: 8.0, devOps: 8.5 }, timeSpent: 52, feedback: 'Forte em banco de dados. Precisa melhorar o front-end.', evaluator: 'Treinadora' },
  { id: 'e12', competitorId: 'c2', taskId: 't2', date: '2026-01-12', scores: { logica: 8.8, frontend: 8.2, backend: 9.0, bancoDeDados: 9.2, softSkills: 8.0, devOps: 8.5 }, timeSpent: 50, feedback: 'Bom progresso em TypeScript.', evaluator: 'Treinadora' },
  { id: 'e13', competitorId: 'c3', taskId: 't1', date: '2026-01-06', scores: { logica: 8.0, frontend: 8.5, backend: 8.5, bancoDeDados: 8.0, softSkills: 8.8, devOps: 8.0 }, timeSpent: 48, feedback: 'Boa comunicação e trabalho em equipe.', evaluator: 'Treinadora' },
  { id: 'e14', competitorId: 'c4', taskId: 't1', date: '2026-01-07', scores: { logica: 7.8, frontend: 8.0, backend: 7.5, bancoDeDados: 8.2, softSkills: 8.5, devOps: 7.5 }, timeSpent: 55, feedback: 'Precisa dedicar mais tempo a DevOps.', evaluator: 'Treinadora' },
  { id: 'e15', competitorId: 'c5', taskId: 't1', date: '2026-01-08', scores: { logica: 7.5, frontend: 7.8, backend: 7.5, bancoDeDados: 8.0, softSkills: 8.2, devOps: 7.5 }, timeSpent: 58, feedback: 'Consistente nas entregas. Continue evoluindo.', evaluator: 'Treinadora' },
  { id: 'e16', competitorId: 'c6', taskId: 't1', date: '2026-01-10', scores: { logica: 7.0, frontend: 7.5, backend: 7.8, bancoDeDados: 7.5, softSkills: 7.5, devOps: 7.0 }, timeSpent: 60, feedback: 'Potencial para melhorar. Foco nos fundamentos.', evaluator: 'Treinadora' },
];

export function getEvolutionData(competitorId: string): EvolutionPoint[] {
  const evals = evaluations
    .filter(e => e.competitorId === competitorId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return evals.map(e => {
    const scores = Object.values(e.scores);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return {
      date: e.date,
      average: parseFloat(avg.toFixed(1)),
      label: tasks.find(t => t.id === e.taskId)?.name || e.taskId,
    };
  });
}

export function getRadarData(skills: { [key: string]: number }) {
  const labels: Record<string, string> = {
    logica: 'Lógica',
    frontend: 'Frontend',
    backend: 'Backend',
    bancoDeDados: 'Banco de Dados',
    softSkills: 'Soft Skills',
    devOps: 'DevOps',
  };
  return Object.entries(skills).map(([key, value]) => ({
    skill: labels[key] || key,
    value,
    fullMark: 10,
  }));
}
