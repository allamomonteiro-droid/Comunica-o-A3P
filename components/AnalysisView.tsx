
import React, { useState, useEffect } from 'react';
import { CommunicationEntry } from '../types';
import { getStrategicInsights } from '../services/geminiService';

interface AnalysisViewProps {
  data: CommunicationEntry[];
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  const [insights, setInsights] = useState<{ insights: string[], suggestions: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getStrategicInsights(data);
    setInsights(result);
    setLoading(false);
  };

  useEffect(() => {
    if (data.length > 0 && !insights) {
      fetchInsights();
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-2xl shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">People Analytics & Insights</h2>
            <p className="mt-2 text-indigo-100 opacity-90">Análise automatizada de padrões de comunicação baseada em IA.</p>
          </div>
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analisando...
              </>
            ) : "Atualizar Insights"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Insights Estratégicos
          </h3>
          <ul className="space-y-4">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-lg"></div>)
            ) : insights?.insights.map((insight, idx) => (
              <li key={idx} className="flex gap-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-indigo-900 leading-relaxed">
                <span className="font-bold text-indigo-400">0{idx + 1}.</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Sugestões de Melhoria
          </h3>
          <ul className="space-y-4">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-lg"></div>)
            ) : insights?.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-emerald-900 leading-relaxed">
                <span className="font-bold text-emerald-400">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
        <h4 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          Recomendação Crítica de Governança
        </h4>
        <p className="text-amber-900 text-sm">
          Com base no histórico recente, a comunicação com o público <strong>Operacional</strong> via <strong>WhatsApp</strong> apresenta a maior taxa de compreensão, porém os registros de evidência estão incompletos em 30% dos casos. Recomendamos reforçar a anexação de prints para fins de auditoria.
        </p>
      </div>
    </div>
  );
};

export default AnalysisView;
