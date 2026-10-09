import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const REAL_MEETINGS_CFO = [
  {
    id: 'meet-cfo-2026-06-09',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-06-09',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 20/2026 e nº 21/2026',
    description: 'Abertura de crédito adicional suplementar e adequação das metas fiscais do exercício de 2026.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 1ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos nove dias do mês de junho do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Finanças, Orçamento e Fiscalização na Sala das Comissões Parlamentares.
Presentes os vereadores: Henerson Luiz Dias (Presidente), Valsi Rogério Fernandes (Relator) e Dilson Antônio Lopes Pereira (Membro).
Havendo quórum integral, abriu-se a sessão para deliberação da pauta: Projeto de Lei nº 20/2026 e nº 21/2026 (abertura de crédito suplementar).
Após debate e análise do impacto financeiro, foi emitido parecer favorável unânime. Nada mais havendo a tratar, encerrou-se a reunião e lavrou-se a presente ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-06-09T14:00:00').toISOString(),
    updatedAt: new Date('2026-06-09T15:15:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-06-23',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-06-23',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 23/2026, 24/2026 e 25/2026',
    description: 'Diretrizes Orçamentárias (LDO 2027) e autorização para abertura de créditos especiais.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 2ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos vinte e três dias do mês de junho de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Finanças, Orçamento e Fiscalização na Sala das Comissões Parlamentares.
Presentes os vereadores: Henerson Luiz Dias (Presidente), Valsi Rogério Fernandes (Relator) e Dilson Antônio Lopes Pereira (Membro).
Pauta: Análise orçamentária dos Projetos de Lei nº 23/2026, nº 24/2026 e nº 25/2026.
O relator proferiu voto favorável às matérias, sendo acompanhado pelos demais pares. Aprovado o parecer por unanimidade. Lavrou-se a presente ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-06-23T14:00:00').toISOString(),
    updatedAt: new Date('2026-06-23T15:20:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-07-14',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-07-14',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 26/2026 e nº 27/2026',
    description: 'Análise de impacto orçamentário e readequação de dotações orçamentárias municipais.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'ausente_injustificado',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'ausente_justificado',
        justificationReason: 'Viagem oficial em representação do Poder Legislativo Municipal com comprovação documental anexada.',
        justificationDocument: 'Ofício nº 42/2026 - Certificado de representação e diárias',
        justificationSigned: true,
      },
    ],
    minutesText: `ATA DA 3ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos quatorze dias do mês de julho de dois mil e vinte e seis, às quatorze horas, reuniu-se a CFO.
Presente o Presidente Vereador Henerson Luiz Dias. Registrada a ausência justificada do Vereador Dilson Antônio Lopes Pereira em razão de viagem oficial e representação institucional do Legislativo com documentação regular. Registrada a ausência não justificada do Vereador Valsi Rogério Fernandes.
Pauta: Projeto de Lei nº 26/2026 e nº 27/2026. Registrado o relatório de comparecimento e expediente das matérias para instrução subsequente. Lavrou-se a ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-07-14T14:00:00').toISOString(),
    updatedAt: new Date('2026-07-14T14:45:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-07-28',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-07-28',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 28/2026',
    description: 'Revisão do Código Tributário Municipal e incentivos fiscais para desenvolvimento econômico local.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 4ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos vinte e oito dias do mês de julho de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Finanças na Sala das Comissões.
Presentes todos os membros da comissão: Vereadores Henerson Luiz Dias (Presidente), Valsi Rogério Fernandes (Relator) e Dilson Antônio Lopes Pereira (Membro).
Pauta: Projeto de Lei nº 28/2026 dispondo sobre a legislação tributária e estímulos ao desenvolvimento local.
Após deliberação e manifestação favorável do Relator e Membro, o parecer foi aprovado por unanimidade. Lavrou-se a ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-07-28T14:00:00').toISOString(),
    updatedAt: new Date('2026-07-28T15:30:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-08-11',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-08-11',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 29/2026 e nº 30/2026',
    description: 'Crédito Adicional Especial para custeio de programas e gestão fiscal municipal.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 5ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos onze dias do mês de agosto de dois mil e vinte e seis, às quatorze horas, reuniu-se a CFO com quórum total.
Presentes: Presidente Henerson Luiz Dias, Relator Valsi Rogério Fernandes e Membro Dilson Antônio Lopes Pereira.
Pauta: Apreciação e parecer dos Projetos de Lei nº 29/2026 e nº 30/2026.
Examinada a compatibilidade com a Lei de Responsabilidade Fiscal e o PPA, a matéria recebeu parecer favorável unânime dos membros. Encerrou-se a reunião.`,
    minutesApproved: true,
    createdAt: new Date('2026-08-11T14:00:00').toISOString(),
    updatedAt: new Date('2026-08-11T15:10:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-08-25',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-08-25',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 31/2026 e nº 32/2026',
    description: 'Alterações no Plano Plurianual (PPA 2026-2029) e adequação nas dotações de infraestrutura urbana.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 6ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos vinte e cinco dias do mês de agosto do ano de dois mil e vinte e seis, às quatorze horas, reuniu-se a CFO na Sala das Comissões.
Presentes todos os membros da Comissão: Henerson Luiz Dias, Valsi Rogério Fernandes e Dilson Antônio Lopes Pereira.
Pauta: Projetos de Lei nº 31/2026 e nº 32/2026.
O relator apresentou parecer favorável às matérias com destaque para o equilíbrio orçamentário. Parecer aprovado unanimemente. Lavrou-se a ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-08-25T14:00:00').toISOString(),
    updatedAt: new Date('2026-08-25T15:25:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-09-15',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-09-15',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 34/2026 e nº 35/2026',
    description: 'Abertura de crédito suplementar por superávit financeiro e reajuste da tabela de contribuição de melhoria.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 7ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos quinze dias do mês de setembro de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Finanças.
Presentes os edis: Henerson Luiz Dias (Presidente), Valsi Rogério Fernandes (Relator) e Dilson Antônio Lopes Pereira (Membro).
Pauta: Projetos de Lei nº 34/2026 e nº 35/2026.
Após análise dos relatórios contábeis da Fazenda Municipal, votou-se pelo parecer favorável às proposições. Nada mais havendo, lavrou-se a ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-09-15T14:00:00').toISOString(),
    updatedAt: new Date('2026-09-15T15:15:00').toISOString(),
  },
  {
    id: 'meet-cfo-2026-09-29',
    committeeId: 'com-cfo',
    committeeName: 'Comissão de Finanças, Orçamento e Fiscalização',
    date: '2026-09-29',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 37/2026 e Avaliação das Metas Fiscais do 2º Quadrimestre',
    description: 'Avaliação das metas fiscais e orçamentárias quadrimestrais e deliberação sobre matérias financeiras.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Relator',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-06',
        councilorName: 'Dilson Antônio Lopes Pereira',
        committeeRole: 'Membro',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA 8ª REUNIÃO DA COMISSÃO DE FINANÇAS, ORÇAMENTO E FISCALIZAÇÃO (CFO) DA CÂMARA MUNICIPAL.
Aos vinte e nove dias do mês de setembro de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Finanças com presença integral de seus membros:
Vereador Henerson Luiz Dias (Presidente), Vereador Valsi Rogério Fernandes (Relator) e Vereador Dilson Antônio Lopes Pereira (Membro).
Pauta: Projeto de Lei nº 37/2026 e relatório das metas fiscais do 2º quadrimestre de 2026.
Constatado o cumprimento dos limites constitucionais com saúde, educação e pessoal, foi emitido parecer favorável conclusivo. Encerrou-se a reunião.`,
    minutesApproved: true,
    createdAt: new Date('2026-09-29T14:00:00').toISOString(),
    updatedAt: new Date('2026-09-29T15:40:00').toISOString(),
  },
];

async function insertCfoMeetings() {
  console.log('--- INSERINDO AS 8 REUNIÕES DA COMISSÃO DE FINANÇAS (CFO) NO FIRESTORE ---');
  for (const m of REAL_MEETINGS_CFO) {
    console.log(`Gravando Reunião CFO: ${m.date} - ${m.topic}`);
    await setDoc(doc(db, 'meetings', m.id), m, { merge: true });
  }
  console.log('--- TODAS AS 8 REUNIÕES DA CFO FORAM GRAVADAS COM SUCESSO! ---');
  process.exit(0);
}

insertCfoMeetings().catch((err) => {
  console.error('Erro ao inserir reuniões da CFO:', err);
  process.exit(1);
});
