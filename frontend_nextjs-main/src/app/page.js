'use client';

import { AppProvider, useAppContext } from '@/context/AppContext';
import { TopNavbar } from '@/components/TopNavbar';
import { CoachSidebar } from '@/components/CoachSidebar';
import { CoachDashboard } from '@/components/CoachDashboard';
import { CoachNovaAvaliacao } from '@/components/CoachNovaAvaliacao';
import { CoachTarefas } from '@/components/CoachTarefas';
import { CoachPerfil } from '@/components/CoachPerfil';
import { CompetitorDashboard } from '@/components/CompetitorDashboard';
import { CompetitorHistorico } from '@/components/CompetitorHistorico';
import { CompetitorRanking } from '@/components/CompetitorRanking';
import { CompetitorPerfil } from '@/components/CompetitorPerfil';
import { LoginScreen } from '@/components/LoginScreen';

function CoachContent() {
  const { coachPage } = useAppContext();
  switch (coachPage) {
    case 'dashboard': return <CoachDashboard />;
    case 'nova-avaliacao': return <CoachNovaAvaliacao />;
    case 'tarefas': return <CoachTarefas />;
    case 'perfil': return <CoachPerfil />;
    default: return <CoachDashboard />;
  }
}

function CompetitorContent() {
  const { competitorPage } = useAppContext();
  switch (competitorPage) {
    case 'dashboard': return <CompetitorDashboard />;
    case 'historico': return <CompetitorHistorico />;
    case 'ranking': return <CompetitorRanking />;
    case 'perfil': return <CompetitorPerfil />;
    default: return <CompetitorDashboard />;
  }
}

function MainLayout() {
  const { role } = useAppContext();

  if (!role) return <LoginScreen />;

  if (role === 'coach') {
    return (
      <div className="min-h-screen bg-background">
        <CoachSidebar />
        <div className="ml-60">
          <CoachContent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <main>
        <CompetitorContent />
      </main>
    </div>
  );
}

const Index = () => (
  <AppProvider>
    <MainLayout />
  </AppProvider>
);

export default Index;
