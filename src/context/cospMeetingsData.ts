import { Meeting } from '../types';

export const EXACT_MEETINGS_COSP: Meeting[] = [
  {
    id: 'meet-cosp-2026-06-23',
    committeeId: 'com-cosp',
    committeeName: 'Comissão de Obras e Serviços Públicos',
    date: '2026-06-23',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projetos de Lei nº 23, 24 e 25/2026',
    description: 'Apreciação, debate e deliberação sobre matérias atinentes a obras e serviços municipais nos Projetos de Lei nº 23, 24 e 25/2026.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Relator',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE OBRAS E SERVIÇOS PÚBLICOS (COSP) DA CÂMARA MUNICIPAL.
Aos vinte e três dias do mês de junho de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Obras e Serviços Públicos na Sala das Comissões Parlamentares.
Presentes os vereadores: Valsi Rogério Fernandes (Presidente), Odinei Luiz Parolin (Relator) e Henerson Luiz Dias (Membro), perfazendo 100% de quórum.
Pauta: Projetos de Lei nº 23, 24 e 25/2026.
Após análise das matérias pertinentes à infraestrutura e aos serviços públicos municipais, os membros deliberaram favoravelmente às proposições por parecer unânime.
Nada mais havendo, lavrou-se a presente ata.`,
    minutesApproved: true,
    createdAt: new Date('2026-06-23T14:00:00').toISOString(),
    updatedAt: new Date('2026-06-23T15:30:00').toISOString(),
  },
  {
    id: 'meet-cosp-2026-07-14',
    committeeId: 'com-cosp',
    committeeName: 'Comissão de Obras e Serviços Públicos',
    date: '2026-07-14',
    time: '14:00',
    location: 'Sala das Comissões Parlamentares',
    topic: 'Projeto de Lei nº 26/2026 e 27/2026',
    description: 'Apreciação e emissão de parecer sobre os Projetos de Lei nº 26/2026 e 27/2026.',
    status: 'realizada',
    attendances: [
      {
        councilorId: 'c-05',
        councilorName: 'Valsi Rogério Fernandes',
        committeeRole: 'Presidente',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-01',
        councilorName: 'Odinei Luiz Parolin',
        committeeRole: 'Relator',
        politicalParty: 'MDB',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
      {
        councilorId: 'c-04',
        councilorName: 'Henerson Luiz Dias',
        committeeRole: 'Membro',
        politicalParty: 'PL',
        status: 'presente',
        justificationReason: '',
        justificationDocument: '',
        justificationSigned: false,
      },
    ],
    minutesText: `ATA DA REUNIÃO DA COMISSÃO DE OBRAS E SERVIÇOS PÚBLICOS (COSP) DA CÂMARA MUNICIPAL.
Aos quatorze dias do mês de julho de dois mil e vinte e seis, às quatorze horas, reuniu-se a Comissão de Obras e Serviços Públicos na Sala das Comissões Parlamentares.
Presentes os vereadores: Valsi Rogério Fernandes (Presidente), Odinei Luiz Parolin (Relator) e Henerson Luiz Dias (Membro), perfazendo 100% de quórum.
Pauta: Projeto de Lei nº 26/2026 e 27/2026.
Após análise e debate, a comissão emitiu parecer favorável à continuidade da tramitação regimental.
Nada mais havendo, lavrou-se a presente ata oficial.`,
    minutesApproved: true,
    createdAt: new Date('2026-07-14T14:00:00').toISOString(),
    updatedAt: new Date('2026-07-14T15:30:00').toISOString(),
  },
];
