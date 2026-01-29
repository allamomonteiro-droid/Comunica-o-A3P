
export type Channel = 'WhatsApp' | 'E-mail' | 'Reunião' | 'TV Corporativa' | 'Mural' | 'Teams / Meet' | 'Aplicativo Interno' | 'Outro';

export type Audience = 'Operacional' | 'Administrativo' | 'Liderança' | 'Logística / Distribuição' | 'Comercial' | 'Todos' | 'Personalizado';

export type Objective = 'Informar' | 'Engajar' | 'Reconhecer' | 'Alinhar Processo' | 'Compliance / Auditoria' | 'Pesquisa / Escuta' | 'Cultura e Valores';

export type CommunicationType = 'Datas Comemorativas' | 'Folgas / Férias' | 'Remuneração' | 'Controle de Ponto' | 'Saúde e Segurança' | 'Pesquisa de Clima / NPS' | 'Projetos / Ações' | 'Reconhecimento' | 'Painel de Gestão' | 'Auditoria';

export type Comprehension = 'Sim' | 'Parcialmente' | 'Não';

export type Status = 'Planejada' | 'Executada' | 'Reforçada' | 'Em Avaliação' | 'Cancelada';

export interface CommunicationEntry {
  id: string;
  title: string;
  date: string;
  responsible: string;
  channel: Channel;
  audience: Audience;
  objective: Objective;
  type: CommunicationType;
  evidenceLink: string;
  isComprehended: Comprehension;
  returnIndicator: string;
  observations: string;
  status: Status;
  budgetedValue: number; // Valor Orçado
  spentValue: number;    // Valor Gasto
}

export interface DashboardStats {
  total: number;
  byChannel: Record<string, number>;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byEffectiveness: Record<string, number>;
}
