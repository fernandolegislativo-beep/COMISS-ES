import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, testConnection } from '../firebase/config';
import { Councilor, Committee, Meeting, SystemSettings, ThemeId, Legislature } from '../types';
import { EXACT_MEETINGS_CFO } from './cfoMeetingsData';
import { EXACT_MEETINGS_CJR } from './cjrMeetingsData';
import { EXACT_MEETINGS_COSP } from './cospMeetingsData';

export const DEFAULT_LEGISLATURES: Legislature[] = [
  {
    id: 'leg-2025-2028',
    name: '18ª Legislatura',
    period: '2025 - 2028',
    startDate: '2025-01-01',
    endDate: '2028-12-31',
    isActive: true,
    councilorIds: ['c-01', 'c-02', 'c-03', 'c-04', 'c-05', 'c-06', 'c-07', 'c-08', 'c-09', 'c-10'],
    notes: 'Legislatura constitucional em exercício na Câmara Municipal.',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_SETTINGS: SystemSettings = {
  id: 'system',
  chamberName: 'Câmara Municipal de Santa Lúcia - PR',
  city: 'Santa Lúcia',
  state: 'PR',
  legislature: '2025 - 2028 (18ª Legislatura)',
  activeLegislatureId: 'leg-2025-2028',
  address: 'Rua das Palmeiras, 150 - Centro, Santa Lúcia - PR',
  phone: '(45) 3288-1200',
  cnpj: '78.291.402/0001-89',
  presidentName: 'Odinei Luiz Parolin',
  activeTheme: 'institucional_light',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_COUNCILORS: Councilor[] = [
  {
    id: 'c-01',
    name: 'Odinei Luiz Parolin',
    nickname: 'Nego',
    politicalParty: 'MDB',
    role: 'Vereador',
    email: 'odinei.parolin@camara.pr.gov.br',
    phone: '(45) 99811-0101',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-02',
    name: 'Zélia Fiorese Cupini',
    nickname: 'Zélia',
    politicalParty: 'PP',
    role: 'Vereadora',
    email: 'zelia.cupini@camara.pr.gov.br',
    phone: '(45) 99811-0102',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-03',
    name: 'Afonso Leandro dos Santos',
    nickname: 'Afonso',
    politicalParty: 'PL',
    role: 'Vereador',
    email: 'afonso.santos@camara.pr.gov.br',
    phone: '(45) 99811-0103',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-04',
    name: 'Henerson Luiz Dias',
    nickname: 'Heno',
    politicalParty: 'PL',
    role: 'Vereador',
    email: 'henerson.dias@camara.pr.gov.br',
    phone: '(45) 99811-0104',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-05',
    name: 'Valsi Rogério Fernandes',
    nickname: 'Valsi',
    politicalParty: 'PL',
    role: 'Vereador',
    email: 'valsi.fernandes@camara.pr.gov.br',
    phone: '(45) 99811-0105',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-06',
    name: 'Dilson Antônio Lopes Pereira',
    nickname: 'Dilsinho',
    politicalParty: 'MDB',
    role: 'Vereador',
    email: 'dilson.pereira@camara.pr.gov.br',
    phone: '(45) 99811-0106',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-07',
    name: 'João Elton Rangel',
    nickname: 'João Elton',
    politicalParty: 'MDB',
    role: 'Vereador',
    email: 'joao.rangel@camara.pr.gov.br',
    phone: '(45) 99811-0107',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-08',
    name: 'Ângelo Joacir Buratti',
    nickname: 'Mané',
    politicalParty: 'PL',
    role: 'Vereador',
    email: 'angelo.buratti@camara.pr.gov.br',
    phone: '(45) 99811-0108',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-09',
    name: 'Salésio de Sousa',
    nickname: 'Sassa',
    politicalParty: 'PL',
    role: 'Vereador',
    email: 'salesio.sousa@camara.pr.gov.br',
    phone: '(45) 99811-0109',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'c-10',
    name: 'Dalci Vieira Berti',
    nickname: 'Dalci',
    politicalParty: 'PP',
    role: 'Vereador',
    email: 'dalci.berti@camara.pr.gov.br',
    phone: '(45) 99811-0110',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    isActive: true,
    legislature: '2025 - 2028',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_COMMITTEES: Committee[] = [
  {
    id: 'com-cfo',
    name: 'Comissão de Finanças, Orçamento e Fiscalização',
    acronym: 'CFO',
    description: 'Exame de planos orçamentários, matérias tributárias, finanças públicas e fiscalização contábil.',
    legislature: '2025 - 2028',
    isActive: true,
    members: [
      { councilorId: 'c-04', councilorName: 'Henerson Luiz Dias', role: 'Presidente' },
      { councilorId: 'c-05', councilorName: 'Valsi Rogério Fernandes', role: 'Relator' },
      { councilorId: 'c-06', councilorName: 'Dilson Antônio Lopes Pereira', role: 'Membro' },
    ],
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'com-cjr',
    name: 'Comissão de Justiça e Redação',
    acronym: 'CJR',
    description: 'Apreciação da constitucionalidade, legalidade, regimentalidade e redação final das proposições legislativas.',
    legislature: '2025 - 2028',
    isActive: true,
    members: [
      { councilorId: 'c-07', councilorName: 'João Elton Rangel', role: 'Presidente' },
      { councilorId: 'c-08', councilorName: 'Ângelo Joacir Buratti', role: 'Relator' },
      { councilorId: 'c-02', councilorName: 'Zélia Fiorese Cupini', role: 'Membro' },
    ],
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'com-cosp',
    name: 'Comissão de Obras e Serviços Públicos',
    acronym: 'COSP',
    description: 'Fiscalização de obras públicas municipais, concessões, transportes, habitação e desenvolvimento urbano e rural.',
    legislature: '2025 - 2028',
    isActive: true,
    members: [
      { councilorId: 'c-05', councilorName: 'Valsi Rogério Fernandes', role: 'Presidente' },
      { councilorId: 'c-01', councilorName: 'Odinei Luiz Parolin', role: 'Relator' },
      { councilorId: 'c-04', councilorName: 'Henerson Luiz Dias', role: 'Membro' },
    ],
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'com-cecs',
    name: 'Comissão de Educação, Cultura, Saúde, Bem-Estar',
    acronym: 'CECS',
    description: 'Acompanhamento das políticas públicas de educação, cultura, esportes, saúde pública e assistência social.',
    legislature: '2025 - 2028',
    isActive: true,
    members: [
      { councilorId: 'c-01', councilorName: 'Odinei Luiz Parolin', role: 'Presidente' },
      { councilorId: 'c-02', councilorName: 'Zélia Fiorese Cupini', role: 'Relator' },
      { councilorId: 'c-09', councilorName: 'Salésio de Sousa', role: 'Membro' },
    ],
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet-cecs-2026-06-23',
    committeeId: 'com-cecs',
    committeeName: 'Comissão de Educação, Cultura, Saúde, Bem-Estar',
    date: '2026-06-23',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 23, 24 e 25/2026',
    description: 'Deliberação e emissão de pareceres sobre matérias de interesse público da área de educação, saúde e assistência.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Presidente',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-02',
        councilorName: 'Zélia Fiorese Cupini',
        committeeRole: 'Relatora',
        politicalParty: 'PP',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-03',
        councilorName: 'Afonso Leandro dos Santos',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'ausente_injustificado',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE EDUCAÇÃO, CULTURA, SAÚDE, BEM-ESTAR (CECS) DA CÂMARA MUNICIPAL.
Aos vinte e três dias do mês de junho do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Educação, Cultura, Saúde, Bem-Estar na Sala das Comissões Parlamentares.
Presentes os vereadores: Odinei Luiz Parolin (Presidente) e Zélia Fiorese Cupini (Relatora). Registrada a ausência não justificada do Vereador Afonso Leandro dos Santos.
Havendo quórum legal (maioria dos membros), abriu-se a reunião para deliberação da pauta: Projeto de Lei nº 23, 24 e 25/2026.
A comissão deliberou favoravelmente sobre as matérias pautadas. Nada mais havendo a tratar, encerrou-se a reunião e lavrou-se a presente ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-06-23T14:00:00').toISOString(),
    updatedAt: new Date('2026-06-23T15:30:00').toISOString(),
  },
  {
    id: 'meet-cecs-2026-07-14',
    committeeId: 'com-cecs',
    committeeName: 'Comissão de Educação, Cultura, Saúde, Bem-Estar',
    date: '2026-07-14',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 26/2026 e 27/2026',
    description: 'Análise de matérias de saúde pública municipal e programas educacionais.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Presidente',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-02',
        councilorName: 'Zélia Fiorese Cupini',
        committeeRole: 'Relatora',
        politicalParty: 'PP',
        status: 'ausente_injustificado',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-03',
        councilorName: 'Afonso Leandro dos Santos',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'ausente_injustificado',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE EDUCAÇÃO, CULTURA, SAÚDE, BEM-ESTAR (CECS) DA CÂMARA MUNICIPAL.
Aos quatorze dias do mês de julho do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a CECS.
Presente o Presidente Vereador Odinei Luiz Parolin. Registrada a ausência sem justificativa da Vereadora Zélia Fiorese Cupini e do Vereador Afonso Leandro dos Santos.
Pauta: Projeto de Lei nº 26/2026 e 27/2026. Registrado o relatório de comparecimento e expediente da matéria.`,
    minutesApproved: true,
    createdAt: new Date('2026-07-14T14:00:00').toISOString(),
    updatedAt: new Date('2026-07-14T15:00:00').toISOString(),
  },
  {
    id: 'meet-cecs-2026-08-25',
    committeeId: 'com-cecs',
    committeeName: 'Comissão de Educação, Cultura, Saúde, Bem-Estar',
    date: '2026-08-25',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 29/2026 e nº 30/2026',
    description: 'Apreciação e emissão de pareceres sobre o Projeto de Lei nº 29/2026 e nº 30/2026.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Presidente',
        politicalParty: 'MDB',
        status: 'ausente_injustificado',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-02',
        councilorName: 'Zélia Fiorese Cupini',
        committeeRole: 'Relatora',
        politicalParty: 'PP',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-09',
        councilorName: 'Salésio de Sousa',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE EDUCAÇÃO, CULTURA, SAÚDE, BEM-ESTAR (CECS) DA CÂMARA MUNICIPAL.
Aos vinte e cinco dias do mês de agosto do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a CECS na Sala das Comissões.
Presentes os vereadores: Zélia Fiorese Cupini (Relatora) e Salésio de Sousa (Membro). Registrada a ausência sem justificativa do Presidente Vereador Odinei Luiz Parolin.
Havendo quórum regimental da maioria dos membros, passou-se à apreciação da pauta: Projeto de Lei nº 29/2026 e nº 30/2026.
As matérias foram analisadas e emitido parecer favorável. Nada mais havendo a tratar, lavrou-se a presente ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-08-25T14:00:00').toISOString(),
    updatedAt: new Date('2026-08-25T15:30:00').toISOString(),
  },
  {
    id: 'meet-cecs-2026-09-29',
    committeeId: 'com-cecs',
    committeeName: 'Comissão de Educação, Cultura, Saúde, Bem-Estar',
    date: '2026-09-29',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 37/2026. Projeto de Resolução nº 05, 06 e 07/2026',
    description: 'Deliberação de matérias regimentais, projetos de resolução e projeto de lei da comissão temática.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Presidente',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-02',
        councilorName: 'Zélia Fiorese Cupini',
        committeeRole: 'Relatora',
        politicalParty: 'PP',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-09',
        councilorName: 'Salésio de Sousa',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE EDUCAÇÃO, CULTURA, SAÚDE, BEM-ESTAR (CECS) DA CÂMARA MUNICIPAL.
Aos vinte e nove dias do mês de setembro do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a CECS na Sala das Comissões.
Composição completa presente: Vereador Odinei Luiz Parolin (Presidente), Vereadora Zélia Fiorese Cupini (Relatora) e Vereador Salésio de Sousa (Membro). Quórum de 100%.
Pauta deliberativa: Projeto de Lei nº 37/2026 e Projetos de Resolução nº 05, 06 e 07/2026.
Todas as matérias foram discutidas, relatadas e aprovadas por unanimidade dos membros presentes.
Nada mais a tratar, lavrou-se a presente ata oficial.`,
    minutesApproved: true,
    createdAt: new Date('2026-09-29T14:00:00').toISOString(),
    updatedAt: new Date('2026-09-29T15:30:00').toISOString(),
  },
  ...EXACT_MEETINGS_CFO,
  ...EXACT_MEETINGS_CJR,
  ...EXACT_MEETINGS_COSP,
];

interface LegislativeContextType {
  councilors: Councilor[];
  committees: Committee[];
  meetings: Meeting[];
  legislatures: Legislature[];
  activeLegislature: Legislature | null;
  settings: SystemSettings;
  isLoading: boolean;
  firebaseConnected: boolean;
  addCouncilor: (councilor: Omit<Councilor, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCouncilor: (id: string, councilor: Partial<Councilor>) => Promise<void>;
  deleteCouncilor: (id: string) => Promise<void>;
  addCommittee: (committee: Omit<Committee, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCommittee: (id: string, committee: Partial<Committee>) => Promise<void>;
  deleteCommittee: (id: string) => Promise<void>;
  addMeeting: (meeting: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateMeeting: (id: string, meeting: Partial<Meeting>) => Promise<void>;
  deleteMeeting: (id: string) => Promise<void>;
  addLegislature: (
    legData: Omit<Legislature, 'id' | 'createdAt' | 'updatedAt'>,
    selectedExistingCouncilorIds: string[],
    newCouncilors: Omit<Councilor, 'id' | 'createdAt' | 'updatedAt'>[],
    autoCreateCommittees?: boolean
  ) => Promise<void>;
  updateLegislature: (id: string, partial: Partial<Legislature>) => Promise<void>;
  setActiveLegislature: (id: string) => Promise<void>;
  deleteLegislature: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SystemSettings>) => Promise<void>;
  seedInitialData: () => Promise<void>;
  exportBackup: () => string;
  importBackup: (jsonData: string) => Promise<void>;
}

const LegislativeContext = createContext<LegislativeContextType | undefined>(undefined);

export const LegislativeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [councilors, setCouncilors] = useState<Councilor[]>(INITIAL_COUNCILORS);
  const [committees, setCommittees] = useState<Committee[]>(INITIAL_COMMITTEES);
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [legislatures, setLegislatures] = useState<Legislature[]>(DEFAULT_LEGISLATURES);
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firebaseConnected, setFirebaseConnected] = useState<boolean>(true);

  // Active legislature
  const activeLegislature =
    legislatures.find((l) => l.isActive) ||
    legislatures.find((l) => l.id === settings.activeLegislatureId) ||
    legislatures[0] ||
    null;

  // Initialize listeners
  useEffect(() => {
    let unsubCouncilors = () => {};
    let unsubCommittees = () => {};
    let unsubMeetings = () => {};
    let unsubLegislatures = () => {};
    let unsubSettings = () => {};

    const setupListeners = async () => {
      try {
        const isOnline = await testConnection();
        setFirebaseConnected(isOnline);

        // Legislatures listener
        const legislaturesCol = collection(db, 'legislatures');
        unsubLegislatures = onSnapshot(
          legislaturesCol,
          (snapshot) => {
            const list: Legislature[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as Legislature);
            });
            if (list.length === 0 && snapshot.metadata.fromCache === false) {
              setDoc(doc(db, 'legislatures', DEFAULT_LEGISLATURES[0].id), DEFAULT_LEGISLATURES[0]).catch(
                console.error
              );
            } else if (list.length > 0) {
              setLegislatures(list);
            }
          },
          (error) => {
            console.error('Erro ao escutar legislaturas:', error);
            handleFirestoreError(error, OperationType.GET, 'legislatures');
          }
        );

        // Councilor listener
        const councilorsCol = collection(db, 'councilors');
        unsubCouncilors = onSnapshot(
          councilorsCol,
          (snapshot) => {
            const list: Councilor[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as Councilor);
            });
            // If empty on first load or has old template placeholder names, seed official data!
            const hasOldPlaceholders = list.some(
              (c) => c.name.includes('Carlos Eduardo Silva') || c.name.includes('Carlinhos da Saúde')
            );
            const isMissingOfficial = list.length > 0 && !list.some((c) => c.name === 'Odinei Luiz Parolin');
            if ((list.length === 0 || hasOldPlaceholders || isMissingOfficial) && snapshot.metadata.fromCache === false) {
              console.log('Sincronizando vereadores e comissões oficiais no Firebase...');
              seedInitialData();
            } else {
              setCouncilors(list);
            }
          },
          (error) => {
            console.error('Erro ao escutar vereadores:', error);
            handleFirestoreError(error, OperationType.GET, 'councilors');
          }
        );

        // Committee listener
        const committeesCol = collection(db, 'committees');
        unsubCommittees = onSnapshot(
          committeesCol,
          (snapshot) => {
            const list: Committee[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as Committee);
            });
            setCommittees(list);
          },
          (error) => {
            console.error('Erro ao escutar comissões:', error);
            handleFirestoreError(error, OperationType.GET, 'committees');
          }
        );

        // Meeting listener
        const meetingsCol = collection(db, 'meetings');
        unsubMeetings = onSnapshot(
          meetingsCol,
          (snapshot) => {
            const list: Meeting[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as Meeting);
            });
            // Sort by date desc
            list.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
            setMeetings(list);
            setIsLoading(false);
          },
          (error) => {
            console.error('Erro ao escutar reuniões:', error);
            handleFirestoreError(error, OperationType.GET, 'meetings');
          }
        );

        // Settings listener
        const settingsDoc = doc(db, 'settings', 'system');
        unsubSettings = onSnapshot(
          settingsDoc,
          (docSnap) => {
            if (docSnap.exists()) {
              setSettings(docSnap.data() as SystemSettings);
            } else {
              // Create default settings
              setDoc(doc(db, 'settings', 'system'), DEFAULT_SETTINGS).catch((e) =>
                console.error('Erro ao salvar settings padrão:', e)
              );
            }
          },
          (error) => {
            console.error('Erro ao escutar configurações:', error);
            handleFirestoreError(error, OperationType.GET, 'settings/system');
          }
        );
      } catch (err) {
        console.error('Erro ao configurar Firestore:', err);
        setIsLoading(false);
      }
    };

    setupListeners();

    return () => {
      unsubCouncilors();
      unsubCommittees();
      unsubMeetings();
      unsubLegislatures();
      unsubSettings();
    };
  }, []);

  // Seed standard data for Câmara Municipal de Santa Lúcia
  const seedInitialData = async () => {
    try {
      // 1. Settings
      await setDoc(doc(db, 'settings', 'system'), DEFAULT_SETTINGS);

      // 2. Legislatures
      for (const leg of DEFAULT_LEGISLATURES) {
        await setDoc(doc(db, 'legislatures', leg.id), leg);
      }

      // 3. Delete obsolete committee documents if any
      await deleteDoc(doc(db, 'committees', 'com-ccjr')).catch(() => {});
      await deleteDoc(doc(db, 'committees', 'com-cesa')).catch(() => {});

      // 4. Councilors
      for (const c of INITIAL_COUNCILORS) {
        await setDoc(doc(db, 'councilors', c.id), c);
      }

      // 5. Committees
      for (const com of INITIAL_COMMITTEES) {
        await setDoc(doc(db, 'committees', com.id), com);
      }

      // 6. Meetings
      for (const m of INITIAL_MEETINGS) {
        await setDoc(doc(db, 'meetings', m.id), m);
      }

      setCouncilors(INITIAL_COUNCILORS);
      setCommittees(INITIAL_COMMITTEES);
      setMeetings(INITIAL_MEETINGS);
      setLegislatures(DEFAULT_LEGISLATURES);
      setSettings(DEFAULT_SETTINGS);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'seedInitialData');
    }
  };

  // Councilors CRUD
  const addCouncilor = async (councilorData: Omit<Councilor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = 'c-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();
    const newDoc: Councilor = {
      ...councilorData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    try {
      await setDoc(doc(db, 'councilors', id), newDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `councilors/${id}`);
    }
  };

  const updateCouncilor = async (id: string, partial: Partial<Councilor>) => {
    const current = councilors.find((c) => c.id === id);
    if (!current) return;
    const updated: Councilor = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'councilors', id), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `councilors/${id}`);
    }
  };

  const deleteCouncilor = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'councilors', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `councilors/${id}`);
    }
  };

  // Committees CRUD
  const addCommittee = async (committeeData: Omit<Committee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = 'com-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();
    const newDoc: Committee = {
      ...committeeData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    try {
      await setDoc(doc(db, 'committees', id), newDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `committees/${id}`);
    }
  };

  const updateCommittee = async (id: string, partial: Partial<Committee>) => {
    const current = committees.find((c) => c.id === id);
    if (!current) return;
    const updated: Committee = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'committees', id), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `committees/${id}`);
    }
  };

  const deleteCommittee = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'committees', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `committees/${id}`);
    }
  };

  // Meetings CRUD
  const addMeeting = async (meetingData: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = 'meet-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();
    const newDoc: Meeting = {
      ...meetingData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    try {
      await setDoc(doc(db, 'meetings', id), newDoc);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `meetings/${id}`);
    }
  };

  const updateMeeting = async (id: string, partial: Partial<Meeting>) => {
    const current = meetings.find((m) => m.id === id);
    if (!current) return;
    const updated: Meeting = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'meetings', id), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `meetings/${id}`);
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'meetings', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `meetings/${id}`);
    }
  };

  // Settings
  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    const updated: SystemSettings = {
      ...settings,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'settings', 'system'), updated);
      setSettings(updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'settings/system');
    }
  };

  // Legislatures CRUD
  const addLegislature = async (
    legData: Omit<Legislature, 'id' | 'createdAt' | 'updatedAt'>,
    selectedExistingCouncilorIds: string[],
    newCouncilors: Omit<Councilor, 'id' | 'createdAt' | 'updatedAt'>[],
    autoCreateCommittees = true
  ) => {
    const cleanPeriod = legData.period.replace(/\s+/g, '').replace(/[^a-zA-Z0-9-]/g, '');
    const id = 'leg-' + cleanPeriod;
    const now = new Date().toISOString();

    try {
      // 1. Create brand new councilors if provided
      const createdCouncilorIds: string[] = [];
      for (const nc of newCouncilors) {
        const cId = 'c-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
        const newCouncilorDoc: Councilor = {
          ...nc,
          id: cId,
          legislature: legData.period,
          createdAt: now,
          updatedAt: now,
        };
        await setDoc(doc(db, 'councilors', cId), newCouncilorDoc);
        createdCouncilorIds.push(cId);
      }

      const allCouncilorIds = [...selectedExistingCouncilorIds, ...createdCouncilorIds];

      // 2. If new leg is marked active, unmark previous ones
      if (legData.isActive) {
        for (const existingLeg of legislatures) {
          if (existingLeg.isActive) {
            await setDoc(doc(db, 'legislatures', existingLeg.id), {
              ...existingLeg,
              isActive: false,
              updatedAt: now,
            });
          }
        }
      }

      // 3. Save new Legislature doc
      const newLegDoc: Legislature = {
        ...legData,
        id,
        councilorIds: allCouncilorIds,
        createdAt: now,
        updatedAt: now,
      };
      await setDoc(doc(db, 'legislatures', id), newLegDoc);

      // 4. If autoCreateCommittees is true, create template committees for this new legislature
      if (autoCreateCommittees) {
        const templateComms = [
          { name: 'Comissão de Finanças, Orçamento e Fiscalização', acronym: 'CFO', desc: 'Exame de planos orçamentários, matérias financeiras, tributárias e fiscalização contábil.' },
          { name: 'Comissão de Justiça e Redação', acronym: 'CJR', desc: 'Apreciação da constitucionalidade, legalidade, regimentalidade e redação final das proposições legislativas.' },
          { name: 'Comissão de Obras e Serviços Públicos', acronym: 'COSP', desc: 'Fiscalização de obras municipais, concessões, transportes, habitação e desenvolvimento urbano e rural.' },
          { name: 'Comissão de Educação, Cultura, Saúde, Bem-Estar', acronym: 'CECS', desc: 'Acompanhamento das políticas públicas de educação, cultura, esportes, saúde pública e bem-estar social.' },
        ];

        for (const t of templateComms) {
          const commId = 'com-' + t.acronym.toLowerCase() + '-' + cleanPeriod;
          const newComm: Committee = {
            id: commId,
            name: t.name,
            acronym: t.acronym,
            description: t.desc,
            legislature: legData.period,
            isActive: true,
            members: [
              { councilorId: allCouncilorIds[0] || '', councilorName: councilors.find((c) => c.id === allCouncilorIds[0])?.name || '', role: 'Presidente' },
              { councilorId: allCouncilorIds[1] || '', councilorName: councilors.find((c) => c.id === allCouncilorIds[1])?.name || '', role: 'Relator' },
              { councilorId: allCouncilorIds[2] || '', councilorName: councilors.find((c) => c.id === allCouncilorIds[2])?.name || '', role: 'Membro' },
            ],
            createdAt: now,
            updatedAt: now,
          };
          await setDoc(doc(db, 'committees', commId), newComm);
        }
      }

      // 5. Update settings if active
      if (legData.isActive) {
        await updateSettings({
          legislature: `${legData.period} (${legData.name})`,
          activeLegislatureId: id,
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `legislatures/${id}`);
    }
  };

  const updateLegislature = async (id: string, partial: Partial<Legislature>) => {
    const current = legislatures.find((l) => l.id === id);
    if (!current) return;
    const updated: Legislature = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'legislatures', id), updated);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `legislatures/${id}`);
    }
  };

  const setActiveLegislature = async (id: string) => {
    const target = legislatures.find((l) => l.id === id);
    if (!target) return;
    const now = new Date().toISOString();

    try {
      for (const leg of legislatures) {
        const isTarget = leg.id === id;
        await setDoc(doc(db, 'legislatures', leg.id), {
          ...leg,
          isActive: isTarget,
          updatedAt: now,
        });
      }

      await updateSettings({
        legislature: `${target.period} (${target.name})`,
        activeLegislatureId: id,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `legislatures/${id}`);
    }
  };

  const deleteLegislature = async (id: string) => {
    if (legislatures.length <= 1) {
      throw new Error('Não é possível excluir a única legislatura cadastrada no sistema.');
    }
    try {
      await deleteDoc(doc(db, 'legislatures', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `legislatures/${id}`);
    }
  };

  // Export Backup
  const exportBackup = (): string => {
    const data = {
      exportedAt: new Date().toISOString(),
      chamber: settings.chamberName,
      settings,
      legislatures,
      councilors,
      committees,
      meetings,
    };
    return JSON.stringify(data, null, 2);
  };

  // Import Backup
  const importBackup = async (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.settings) {
        await setDoc(doc(db, 'settings', 'system'), parsed.settings);
      }
      if (Array.isArray(parsed.legislatures)) {
        for (const leg of parsed.legislatures) {
          await setDoc(doc(db, 'legislatures', leg.id), leg);
        }
      }
      if (Array.isArray(parsed.councilors)) {
        for (const c of parsed.councilors) {
          await setDoc(doc(db, 'councilors', c.id), c);
        }
      }
      if (Array.isArray(parsed.committees)) {
        for (const com of parsed.committees) {
          await setDoc(doc(db, 'committees', com.id), com);
        }
      }
      if (Array.isArray(parsed.meetings)) {
        for (const m of parsed.meetings) {
          await setDoc(doc(db, 'meetings', m.id), m);
        }
      }
    } catch (err) {
      console.error('Erro ao importar backup:', err);
      throw new Error('Formato de arquivo JSON inválido.');
    }
  };

  return (
    <LegislativeContext.Provider
      value={{
        councilors,
        committees,
        meetings,
        legislatures,
        activeLegislature,
        settings,
        isLoading,
        firebaseConnected,
        addCouncilor,
        updateCouncilor,
        deleteCouncilor,
        addCommittee,
        updateCommittee,
        deleteCommittee,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        addLegislature,
        updateLegislature,
        setActiveLegislature,
        deleteLegislature,
        updateSettings,
        seedInitialData,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </LegislativeContext.Provider>
  );
};

export const useLegislative = () => {
  const context = useContext(LegislativeContext);
  if (!context) {
    throw new Error('useLegislative must be used within a LegislativeProvider');
  }
  return context;
};
