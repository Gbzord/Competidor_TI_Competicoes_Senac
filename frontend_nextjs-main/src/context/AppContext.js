'use client';

import { createContext, useContext, useState } from 'react';

/**
 * @typedef {Object} AppContextType
 * @property {'coach' | 'competitor' | null} role
 * @property {Function} setRole
 * @property {string} selectedCompetitorId
 * @property {Function} setSelectedCompetitorId
 * @property {'dashboard' | 'historico' | 'ranking' | 'perfil'} competitorPage
 * @property {Function} setCompetitorPage
 * @property {'dashboard' | 'nova-avaliacao' | 'tarefas' | 'perfil'} coachPage
 * @property {Function} setCoachPage
 * @property {Function} logout
 */

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
    const [role, setRole] = useState(null);
    const [selectedCompetitorId, setSelectedCompetitorId] = useState('c1');
    const [competitorPage, setCompetitorPage] = useState('dashboard');
    const [coachPage, setCoachPage] = useState('dashboard');

    const logout = () => {
        setRole(null);
        setCompetitorPage('dashboard');
        setCoachPage('dashboard');
    };

    const value = {
        role,
        setRole,
        selectedCompetitorId,
        setSelectedCompetitorId,
        competitorPage,
        setCompetitorPage,
        coachPage,
        setCoachPage,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be inside AppProvider');
    return ctx;
}
