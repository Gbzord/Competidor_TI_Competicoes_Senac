import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { competitors, evaluations, tasks, getEvolutionData, getRadarData } from '@/data/mock-data';
import { Evaluation } from '@/types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Replace these with real API calls when ready
const api = {
  getCompetitors: async () => { await delay(800); return competitors; },
  getCompetitor: async (id: string) => { await delay(500); return competitors.find(c => c.id === id); },
  getEvaluations: async (competitorId?: string) => {
    await delay(600);
    return competitorId ? evaluations.filter(e => e.competitorId === competitorId) : evaluations;
  },
  getTasks: async () => { await delay(300); return tasks; },
  getEvolution: async (competitorId: string) => { await delay(500); return getEvolutionData(competitorId); },
  getRadar: async (competitorId: string) => {
    await delay(400);
    const c = competitors.find(comp => comp.id === competitorId);
    return c ? getRadarData(c.skills as unknown as { [key: string]: number }) : [];
  },
  createEvaluation: async (data: Omit<Evaluation, 'id'>) => {
    await delay(700);
    const newEval: Evaluation = { ...data, id: `e${Date.now()}` };
    evaluations.push(newEval);
    return newEval;
  },
};

export const useCompetitors = () =>
  useQuery({ queryKey: ['competitors'], queryFn: api.getCompetitors });

export const useCompetitor = (id: string) =>
  useQuery({ queryKey: ['competitor', id], queryFn: () => api.getCompetitor(id), enabled: !!id });

export const useEvaluations = (competitorId?: string) =>
  useQuery({ queryKey: ['evaluations', competitorId], queryFn: () => api.getEvaluations(competitorId) });

export const useTasks = () =>
  useQuery({ queryKey: ['tasks'], queryFn: api.getTasks });

export const useEvolution = (competitorId: string) =>
  useQuery({ queryKey: ['evolution', competitorId], queryFn: () => api.getEvolution(competitorId), enabled: !!competitorId });

export const useRadar = (competitorId: string) =>
  useQuery({ queryKey: ['radar', competitorId], queryFn: () => api.getRadar(competitorId), enabled: !!competitorId });

export const useCreateEvaluation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createEvaluation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['evaluations'] });
      qc.invalidateQueries({ queryKey: ['competitors'] });
    },
  });
};
