
import React, { useState } from 'react';
import { CommunicationEntry } from './types';
import { MOCK_DATA } from './constants';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import QueryTable from './components/QueryTable';
import AnalysisView from './components/AnalysisView';
import CalendarView from './components/CalendarView';

type Tab = 'dashboard' | 'register' | 'query' | 'analysis' | 'calendar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [entries, setEntries] = useState<CommunicationEntry[]>(MOCK_DATA);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<CommunicationEntry | null>(null);

  const addEntry = (entry: CommunicationEntry) => {
    setEntries([entry, ...entries]);
    setActiveTab('query');
    setSelectedDate(null);
  };

  const updateEntry = (updatedEntry: CommunicationEntry) => {
    setEntries(entries.map(e => e.id === updatedEntry.id ? updatedEntry : e));
    setActiveTab('query');
    setEditingEntry(null);
  };

  const handleEditEntry = (entry: CommunicationEntry) => {
    setEditingEntry(entry);
    setActiveTab('register');
  };

  const handleAddFromCalendar = (date: string) => {
    setSelectedDate(date);
    setEditingEntry(null);
    setActiveTab('register');
  };

  const NavItem = ({ id, label, icon }: { id: Tab, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => { 
        setActiveTab(id); 
        if (id !== 'register') {
          setSelectedDate(null);
          setEditingEntry(null);
        }
      }}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto z-10 hidden md:flex">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">CommGov</span>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem id="dashboard" label="Dashboard" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          <NavItem id="calendar" label="Calendário" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
          <NavItem id="register" label={editingEntry ? "Editar Registro" : "Novo Registro"} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          <NavItem id="query" label="Consulta" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          <NavItem id="analysis" label="Análises IA" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sessão Atual</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AD</div>
            <div>
              <p className="text-sm font-bold">Admin RH</p>
              <p className="text-[10px] text-slate-500">Gestor de Canais</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-lg ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" strokeWidth="2"/></svg>
        </button>
        <button onClick={() => setActiveTab('calendar')} className={`p-2 rounded-lg ${activeTab === 'calendar' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </button>
        <button onClick={() => setActiveTab('register')} className={`p-2 rounded-lg ${activeTab === 'register' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2"/></svg>
        </button>
        <button onClick={() => setActiveTab('query')} className={`p-2 rounded-lg ${activeTab === 'query' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2"/></svg>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {activeTab === 'dashboard' && 'Painel Executivo'}
              {activeTab === 'calendar' && 'Calendário de Comunicação'}
              {activeTab === 'register' && (editingEntry ? 'Editar Registro' : 'Novo Registro')}
              {activeTab === 'query' && 'Consulta de Registros'}
              {activeTab === 'analysis' && 'Inteligência de Dados'}
            </h1>
            <p className="text-slate-500 mt-1">
              Governança da Comunicação Interna • <span className="font-semibold">{entries.length}</span> comunicações registradas
            </p>
          </div>
          <div className="flex gap-2 text-xs font-semibold">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sistema Online
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              Auditoria em Dia
            </span>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'dashboard' && <Dashboard data={entries} />}
          {activeTab === 'calendar' && <CalendarView data={entries} onAddFromCalendar={handleAddFromCalendar} onEditEvent={handleEditEntry} />}
          {activeTab === 'register' && (
            <RegistrationForm 
              onAdd={addEntry} 
              onUpdate={updateEntry}
              initialDate={selectedDate || undefined} 
              editingEntry={editingEntry || undefined}
            />
          )}
          {activeTab === 'query' && <QueryTable data={entries} onEdit={handleEditEntry} />}
          {activeTab === 'analysis' && <AnalysisView data={entries} />}
        </div>
      </main>
    </div>
  );
};

export default App;
