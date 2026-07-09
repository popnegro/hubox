import React, { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CRM from './components/CRM';
import Franchises from './components/Franchises';
import Manuals from './components/Manuals';
import University from './components/University';
import SuraciAI from './components/SuraciAI';
import Settings from './components/Settings';

type ViewMode = 'landing' | 'login' | 'app';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<string>('executive'); // executive, inspector, franchisee

  const handleLoginSuccess = (role: string) => {
    setUserRole(role);
    setViewMode('app');
    
    // Default starting tab based on role
    if (role === 'franchisee') {
      setActivePage('franchises');
    } else {
      setActivePage('dashboard');
    }
  };

  const handleLogout = () => {
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {viewMode === 'landing' && (
        <Landing onEnterApp={() => setViewMode('login')} />
      )}

      {viewMode === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setViewMode('landing')}
        />
      )}

      {viewMode === 'app' && (
        <Layout
          activePage={activePage}
          onNavigateTo={setActivePage}
          onLogout={handleLogout}
          userRole={userRole}
        >
          {activePage === 'dashboard' && (
            <Dashboard onNavigateTo={setActivePage} />
          )}

          {activePage === 'crm' && (
            <CRM />
          )}

          {activePage === 'franchises' && (
            <Franchises />
          )}

          {activePage === 'manuals' && (
            <Manuals />
          )}

          {activePage === 'university' && (
            <University />
          )}

          {activePage === 'ai' && (
            <SuraciAI />
          )}

          {activePage === 'settings' && (
            <Settings />
          )}
        </Layout>
      )}
    </div>
  );
}
