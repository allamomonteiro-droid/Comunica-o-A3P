
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { CommunicationEntry } from '../types';

interface DashboardProps {
  data: CommunicationEntry[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const stats = useMemo(() => {
    const channelMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};
    const effectivenessMap: Record<string, number> = { 'Sim': 0, 'Parcialmente': 0, 'Não': 0 };
    const audienceMap: Record<string, number> = {};
    let totalBudget = 0;
    let totalSpent = 0;

    data.forEach(item => {
      channelMap[item.channel] = (channelMap[item.channel] || 0) + 1;
      typeMap[item.type] = (typeMap[item.type] || 0) + 1;
      effectivenessMap[item.isComprehended]++;
      audienceMap[item.audience] = (audienceMap[item.audience] || 0) + 1;
      totalBudget += item.budgetedValue || 0;
      totalSpent += item.spentValue || 0;
    });

    return {
      channelData: Object.entries(channelMap).map(([name, value]) => ({ name, value })),
      typeData: Object.entries(typeMap).map(([name, value]) => ({ name, value })),
      effectivenessData: Object.entries(effectivenessMap).map(([name, value]) => ({ name, value })),
      audienceData: Object.entries(audienceMap).map(([name, value]) => ({ name, value })),
      totalBudget,
      totalSpent
    };
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Investimento Total (Gasto)</p>
          <p className="text-2xl font-bold mt-1 text-slate-900">{formatCurrency(stats.totalSpent)}</p>
          <p className="text-xs text-slate-400 mt-1">Orçado: {formatCurrency(stats.totalBudget)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total de Comunicações</p>
          <p className="text-3xl font-bold mt-1">{data.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Economia s/ Orçamento</p>
          <p className={`text-2xl font-bold mt-1 ${stats.totalBudget - stats.totalSpent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatCurrency(stats.totalBudget - stats.totalSpent)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Nível de Compreensão</p>
          <p className="text-3xl font-bold mt-1 text-emerald-600">82%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Comunicações por Canal</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.channelData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Efetividade da Comunicação</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.effectivenessData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {stats.effectivenessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
