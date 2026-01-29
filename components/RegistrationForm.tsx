
import React, { useState, useEffect } from 'react';
import { 
  CHANNELS, AUDIENCES, OBJECTIVES, TYPES, STATUSES, COMPREHENSION_LEVELS 
} from '../constants';
import { CommunicationEntry } from '../types';

interface RegistrationFormProps {
  onAdd: (entry: CommunicationEntry) => void;
  onUpdate: (entry: CommunicationEntry) => void;
  initialDate?: string;
  editingEntry?: CommunicationEntry;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onAdd, onUpdate, initialDate, editingEntry }) => {
  const [formData, setFormData] = useState<Partial<CommunicationEntry>>({
    date: initialDate || new Date().toISOString().split('T')[0],
    status: 'Planejada',
    isComprehended: 'Sim',
    budgetedValue: 0,
    spentValue: 0
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setFormData(editingEntry);
    } else if (initialDate) {
      setFormData(prev => ({ ...prev, date: initialDate }));
    }
  }, [initialDate, editingEntry]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, evidenceLink: reader.result as string }));
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Erro ao ler arquivo.");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.channel || !formData.audience) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const entry: CommunicationEntry = {
      id: editingEntry?.id || Math.random().toString(36).substr(2, 9),
      title: formData.title || '',
      date: formData.date || '',
      responsible: formData.responsible || '',
      channel: formData.channel as any,
      audience: formData.audience as any,
      objective: formData.objective as any,
      type: formData.type as any,
      evidenceLink: formData.evidenceLink || '',
      isComprehended: formData.isComprehended as any,
      returnIndicator: formData.returnIndicator || '',
      observations: formData.observations || '',
      status: formData.status as any,
      budgetedValue: Number(formData.budgetedValue) || 0,
      spentValue: Number(formData.spentValue) || 0,
    };

    if (editingEntry) {
      onUpdate(entry);
      alert("Comunicação atualizada com sucesso!");
    } else {
      onAdd(entry);
      alert("Comunicação registrada com sucesso!");
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      status: 'Planejada',
      isComprehended: 'Sim',
      budgetedValue: 0,
      spentValue: 0
    });
  };

  const inputClass = "w-full p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block mb-1.5 text-sm font-semibold text-slate-700";

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-slate-800">
        {editingEntry ? "Editar Registro de Comunicação" : "Novo Registro de Comunicação"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</span>
            Identificação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Título da Comunicação *</label>
              <input 
                type="text" 
                className={inputClass} 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Treinamento de Novos Processos"
              />
            </div>
            <div>
              <label className={labelClass}>Data da Comunicação *</label>
              <input 
                type="date" 
                className={inputClass} 
                value={formData.date || ''} 
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Responsável pela Comunicação *</label>
              <input 
                type="text" 
                className={inputClass} 
                value={formData.responsible || ''} 
                onChange={e => setFormData({...formData, responsible: e.target.value})}
                placeholder="Nome ou Setor"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-indigo-600 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-sm">2</span>
            Estratégia e Público
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Canal Utilizado *</label>
              <select className={inputClass} value={formData.channel || ''} onChange={e => setFormData({...formData, channel: e.target.value as any})}>
                <option value="">Selecione...</option>
                {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Público Impactado *</label>
              <select className={inputClass} value={formData.audience || ''} onChange={e => setFormData({...formData, audience: e.target.value as any})}>
                <option value="">Selecione...</option>
                {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Objetivo da Comunicação</label>
              <select className={inputClass} value={formData.objective || ''} onChange={e => setFormData({...formData, objective: e.target.value as any})}>
                <option value="">Selecione...</option>
                {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tipo de Comunicação</label>
              <select className={inputClass} value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                <option value="">Selecione...</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-sm">3</span>
            Investimento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Valor Orçado (R$)</label>
              <input 
                type="number" 
                className={inputClass} 
                value={formData.budgetedValue || 0} 
                onChange={e => setFormData({...formData, budgetedValue: Number(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className={labelClass}>Valor Gasto (R$)</label>
              <input 
                type="number" 
                className={inputClass} 
                value={formData.spentValue || 0} 
                onChange={e => setFormData({...formData, spentValue: Number(e.target.value)})}
                placeholder="0.00"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-emerald-600 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-sm">4</span>
            Evidência e Efetividade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Arquivo / Evidência *</label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all ${formData.evidenceLink ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-300 bg-slate-50/50 hover:border-blue-400'}`}>
                <div className="space-y-2 text-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center py-4">
                      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
                      <p className="text-sm text-slate-500 font-medium">Processando...</p>
                    </div>
                  ) : formData.evidenceLink ? (
                    <div className="flex flex-col items-center">
                      {formData.evidenceLink.startsWith('data:image') ? (
                        <img src={formData.evidenceLink} alt="Preview" className="h-24 w-auto rounded-lg mb-2" />
                      ) : (
                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg mb-2"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" /></svg></div>
                      )}
                      <button type="button" onClick={() => setFormData({...formData, evidenceLink: ''})} className="text-xs text-rose-500 font-bold underline">Remover</button>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <label htmlFor="file-upload" className="cursor-pointer text-sm font-bold text-blue-600">
                        <span>Upload de arquivo</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>A Comunicação foi Compreendida?</label>
              <select className={inputClass} value={formData.isComprehended || ''} onChange={e => setFormData({...formData, isComprehended: e.target.value as any})}>
                {COMPREHENSION_LEVELS.map(cl => <option key={cl} value={cl}>{cl}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Indicador de Retorno</label>
              <input type="text" className={inputClass} value={formData.returnIndicator || ''} onChange={e => setFormData({...formData, returnIndicator: e.target.value})} placeholder="Ex: 85%" />
            </div>
            <div>
              <label className={labelClass}>Status Atual</label>
              <select className={inputClass} value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Aprendizados / Observações</label>
            <textarea className={`${inputClass} min-h-[100px]`} value={formData.observations || ''} onChange={e => setFormData({...formData, observations: e.target.value})} />
          </div>
        </section>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={isUploading} 
            className={`flex-1 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all ${isUploading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {editingEntry ? 'Atualizar Registro' : 'Registrar Comunicação'}
          </button>
          {editingEntry && (
            <button 
              type="button" 
              onClick={() => window.location.reload()} // Simplistic reset for cancel
              className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
