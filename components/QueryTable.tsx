
import React, { useState, useMemo } from 'react';
import { CommunicationEntry } from '../types';
import { CHANNELS, STATUSES, AUDIENCES } from '../constants';

interface QueryTableProps {
  data: CommunicationEntry[];
  onEdit: (entry: CommunicationEntry) => void;
}

const QueryTable: React.FC<QueryTableProps> = ({ data, onEdit }) => {
  const [filters, setFilters] = useState({
    title: '',
    channel: '',
    status: '',
    audience: ''
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        item.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (filters.channel === '' || item.channel === filters.channel) &&
        (filters.status === '' || item.status === filters.status) &&
        (filters.audience === '' || item.audience === filters.audience)
      );
    });
  }, [data, filters]);

  const selectClass = "p-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input 
          type="text" 
          placeholder="Buscar por título..." 
          className={`${selectClass} md:col-span-1`}
          value={filters.title}
          onChange={e => setFilters({...filters, title: e.target.value})}
        />
        <select 
          className={selectClass}
          value={filters.channel}
          onChange={e => setFilters({...filters, channel: e.target.value})}
        >
          <option value="">Todos os Canais</option>
          {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          className={selectClass}
          value={filters.status}
          onChange={e => setFilters({...filters, status: e.target.value})}
        >
          <option value="">Todos os Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select 
          className={selectClass}
          value={filters.audience}
          onChange={e => setFilters({...filters, audience: e.target.value})}
        >
          <option value="">Todos os Públicos</option>
          {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Data</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Título</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Canal</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Orçado</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Gasto</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Ações</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Efetividade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length > 0 ? filteredData.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-4 text-sm font-medium">{item.title}</td>
                <td className="p-4 text-sm">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium uppercase">
                    {item.channel}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">{formatCurrency(item.budgetedValue || 0)}</td>
                <td className={`p-4 text-sm font-medium ${item.spentValue > item.budgetedValue && item.budgetedValue > 0 ? 'text-rose-600' : 'text-slate-600'}`}>
                  {formatCurrency(item.spentValue || 0)}
                </td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium uppercase ${
                    item.status === 'Executada' ? 'bg-emerald-50 text-emerald-700' : 
                    item.status === 'Planejada' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    {item.evidenceLink && (
                      <button 
                        onClick={() => {
                          const win = window.open();
                          win?.document.write(`<iframe src="${item.evidenceLink}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver Evidência"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    )}
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <span className={`font-semibold ${
                    item.isComprehended === 'Sim' ? 'text-emerald-600' : 
                    item.isComprehended === 'Parcialmente' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {item.isComprehended}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500">Nenhum registro encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryTable;
