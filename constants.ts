
import { Channel, Audience, Objective, CommunicationType, Status, Comprehension, CommunicationEntry } from './types';

export const CHANNELS: Channel[] = [
  'WhatsApp', 'E-mail', 'Reunião', 'TV Corporativa', 'Mural', 'Teams / Meet', 'Aplicativo Interno', 'Outro'
];

export const AUDIENCES: Audience[] = [
  'Operacional', 'Administrativo', 'Liderança', 'Logística / Distribuição', 'Comercial', 'Todos', 'Personalizado'
];

export const OBJECTIVES: Objective[] = [
  'Informar', 'Engajar', 'Reconhecer', 'Alinhar Processo', 'Compliance / Auditoria', 'Pesquisa / Escuta', 'Cultura e Valores'
];

export const TYPES: CommunicationType[] = [
  'Datas Comemorativas', 'Folgas / Férias', 'Remuneração', 'Controle de Ponto', 'Saúde e Segurança', 'Pesquisa de Clima / NPS', 'Projetos / Ações', 'Reconhecimento', 'Painel de Gestão', 'Auditoria'
];

export const STATUSES: Status[] = [
  'Planejada', 'Executada', 'Reforçada', 'Em Avaliação', 'Cancelada'
];

export const COMPREHENSION_LEVELS: Comprehension[] = [
  'Sim', 'Parcialmente', 'Não'
];

export const BRAZILIAN_HOLIDAYS = [
  { date: '01-01', name: 'Confraternização Universal' },
  { date: '04-21', name: 'Tiradentes' },
  { date: '05-01', name: 'Dia do Trabalho' },
  { date: '09-07', name: 'Independência do Brasil' },
  { date: '10-12', name: 'Nsa. Sra. Aparecida' },
  { date: '11-02', name: 'Finados' },
  { date: '11-15', name: 'Proclamação da República' },
  { date: '11-20', name: 'Consciência Negra' },
  { date: '12-25', name: 'Natal' }
];

export const MOCK_DATA: CommunicationEntry[] = [
  {
    id: '1',
    title: 'Campanha de Segurança do Trabalho',
    date: '2024-03-10',
    responsible: 'João Silva (RH)',
    channel: 'TV Corporativa',
    audience: 'Operacional',
    objective: 'Compliance / Auditoria',
    type: 'Saúde e Segurança',
    evidenceLink: 'https://picsum.photos/200/300',
    isComprehended: 'Sim',
    returnIndicator: '95% de visualização',
    observations: 'Público operacional demonstrou alto interesse.',
    status: 'Executada',
    budgetedValue: 1500,
    spentValue: 1250
  },
  {
    id: '2',
    title: 'Aviso de Novas Férias',
    date: '2024-03-12',
    responsible: 'Maria Costa (DP)',
    channel: 'E-mail',
    audience: 'Administrativo',
    objective: 'Informar',
    type: 'Folgas / Férias',
    evidenceLink: 'https://picsum.photos/200/301',
    isComprehended: 'Sim',
    returnIndicator: '10 dúvidas recebidas',
    observations: 'E-mail enviado conforme cronograma.',
    status: 'Executada',
    budgetedValue: 0,
    spentValue: 0
  }
];
