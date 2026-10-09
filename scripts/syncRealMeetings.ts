import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const REAL_MEETINGS_CECS = [
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
];

import { EXACT_MEETINGS_CFO } from './correctCfoMeetings';

async function applyRealMeetings() {
  console.log('--- APAGANDO TODAS AS REUNIÕES DE TESTE DO FIRESTORE ---');
  const meetsSnap = await getDocs(collection(db, 'meetings'));
  for (const docSnap of meetsSnap.docs) {
    console.log('Excluindo reunião antiga/teste:', docSnap.id);
    await deleteDoc(doc(db, 'meetings', docSnap.id));
  }

  console.log('--- CADASTRANDO AS 4 REUNIÕES OFICIAIS DO RELATÓRIO CECS ---');
  for (const m of REAL_MEETINGS_CECS) {
    console.log(`Cadastrando Reunião CECS: ${m.date} - ${m.topic}`);
    await setDoc(doc(db, 'meetings', m.id), m);
  }

  console.log('--- CADASTRANDO AS 8 REUNIÕES OFICIAIS DO RELATÓRIO CFO ---');
  for (const m of EXACT_MEETINGS_CFO) {
    console.log(`Cadastrando Reunião CFO: ${m.date} - ${m.topic}`);
    await setDoc(doc(db, 'meetings', m.id), m);
  }

  console.log('--- ATUALIZAÇÃO CONCLUÍDA COM SUCESSO! ---');
  process.exit(0);
}

applyRealMeetings().catch((err) => {
  console.error('Erro:', err);
  process.exit(1);
});
