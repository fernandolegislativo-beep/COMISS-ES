import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLegislative } from '../context/LegislativeContext';
import { Meeting } from '../types';
import { Printer, X, FileText, CheckCircle2, Download } from 'lucide-react';
import { exportMeetingMinutesToWord } from '../utils/wordExport';

interface PrintAtaModalProps {
  meeting: Meeting;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintAtaModal: React.FC<PrintAtaModalProps> = ({
  meeting,
  isOpen,
  onClose,
}) => {
  const { styles } = useTheme();
  const { settings, councilors } = useLegislative();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = () => {
    exportMeetingMinutesToWord(meeting, settings);
  };

  const formatDateBR = (isoDate: string) => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-4xl rounded-xl shadow-2xl border ${styles.cardBg} ${styles.border} ${styles.textPrimary} max-h-[92vh] flex flex-col`}
      >
        {/* Header Bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${styles.border} print:hidden`}>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-lg">Ata Oficial de Reunião Parlamentar</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportWord}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${styles.border} ${styles.tableHoverBg} text-blue-700 dark:text-blue-300 transition-colors`}
              title="Baixar arquivo formatado para Microsoft Word (.doc)"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Exportar Word (.doc)</span>
            </button>
            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${styles.btnPrimary}`}
            >
              <Printer className="w-4 h-4" />
              Imprimir / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-10 overflow-y-auto print:p-0 print:overflow-visible text-slate-900 bg-white">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full border-2 border-slate-900 flex items-center justify-center bg-slate-50 font-serif font-bold text-2xl shadow-xs">
                ⚖️
              </div>
            </div>
            <h1 className="text-lg font-bold tracking-wider uppercase font-serif">
              ESTADO DO PARANÁ
            </h1>
            <h2 className="text-xl font-extrabold uppercase font-serif tracking-tight text-slate-900">
              {settings.chamberName}
            </h2>
            <p className="text-xs text-slate-600 uppercase tracking-widest mt-0.5">
              PALÁCIO LEGISLATIVO MUNICIPAL • {settings.legislature}
            </p>
            <p className="text-xs text-slate-500">
              {settings.address} • Tel: {settings.phone} • CNPJ: {settings.cnpj}
            </p>
          </div>

          {/* Heading */}
          <div className="text-center my-6">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 border border-slate-300 rounded text-slate-800 mb-2">
              Processo Legislativo • Registro de Sessão
            </span>
            <h3 className="text-base font-bold uppercase text-slate-900 font-serif tracking-wide underline underline-offset-4">
              ATA DA REUNIÃO DA {meeting.committeeName.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Data: {formatDateBR(meeting.date)} às {meeting.time}h | Local: {meeting.location}
            </p>
          </div>

          {/* Pauta da Sessão */}
          <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span>📋</span> PAUTA DA SESSÃO:
            </h4>
            <p className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
              {meeting.topic || 'Deliberação e apreciação de matérias regimentais da comissão.'}
            </p>
            {meeting.description && (
              <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-600 whitespace-pre-line">
                <span className="font-semibold text-slate-700">Observações / Detalhes: </span>
                {meeting.description}
              </div>
            )}
          </div>

          {/* Ata content */}
          <div className="space-y-6 text-sm leading-relaxed text-slate-800 text-justify">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                TEXTO OFICIAL DA ATA:
              </h4>
              {meeting.minutesText ? (
                <div className="whitespace-pre-line font-serif leading-7 text-sm bg-slate-50/50 p-6 rounded border border-slate-200">
                  {meeting.minutesText}
                </div>
              ) : (
                <div className="italic text-slate-500 bg-slate-50 p-6 rounded border border-slate-200 text-center">
                  A ata desta reunião ainda não foi redigida ou está aguardando revisão da secretaria da comissão.
                </div>
              )}
            </div>

            {/* Attendance Table */}
            <div className="mt-6 pt-3 border-t border-slate-300">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                REGISTRO REGIMENTAL DE FREQUÊNCIA E QUÓRUM
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-300">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="py-1.5 px-2.5 border-b border-r border-slate-300">Vereador(a)</th>
                      <th className="py-1.5 px-2.5 border-b border-r border-slate-300">Função</th>
                      <th className="py-1.5 px-2.5 border-b border-r border-slate-300">Situação</th>
                      <th className="py-1.5 px-2.5 border-b border-slate-300">Justificativa / Documento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meeting.attendances.map((att, i) => {
                      let statusBadge = '';
                      if (att.status === 'presente') {
                        statusBadge = 'Presente';
                      } else if (att.status === 'ausente_justificado') {
                        statusBadge = 'Ausente com Justificativa';
                      } else {
                        statusBadge = 'Ausente sem Justificativa (Falta)';
                      }

                      return (
                        <tr key={i} className="border-b border-slate-200">
                          <td className="py-1 px-2.5 font-bold text-slate-900 border-r border-slate-300">
                            {att.councilorName}
                          </td>
                          <td className="py-1 px-2.5 border-r border-slate-300 text-slate-700">
                            {att.committeeRole || 'Membro'}
                          </td>
                          <td className="py-1 px-2.5 font-semibold border-r border-slate-300">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${
                                att.status === 'presente'
                                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                                  : att.status === 'ausente_justificado'
                                  ? 'bg-amber-100 text-amber-800 font-bold'
                                  : 'bg-rose-100 text-rose-800 font-bold'
                              }`}
                            >
                              {statusBadge}
                            </span>
                          </td>
                          <td className="py-1 px-2.5 text-slate-600 text-[11px]">
                            {att.status === 'ausente_justificado'
                              ? `${att.justificationReason || 'Atestado/Ofício'} (${att.justificationDocument || 'Termo Assinado'})`
                              : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Signatures Section - 3 Columns Grid */}
            <div className="pt-8 space-y-6 mt-6">
              {/* Committee Members Signatures */}
              <div>
                <p className="text-center font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-6 pb-1 border-b border-slate-200">
                  ASSINATURAS DOS MEMBROS DA COMISSÃO
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10 items-start">
                  {meeting.attendances.map((att, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-full border-t border-slate-900 pt-2 min-h-[48px] flex flex-col justify-start items-center">
                        <p className="text-[11px] font-bold text-slate-900 uppercase leading-tight">
                          {att.councilorName}
                        </p>
                        <p className="text-[10px] text-slate-600 font-medium leading-tight mt-1">
                          {att.committeeRole || 'Membro'}
                        </p>
                        {att.status !== 'presente' && (
                          <p className="text-[9px] text-slate-400 italic mt-0.5">
                            ({att.status === 'ausente_justificado' ? 'Ausência Justificada' : 'Ausente'})
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guests / Other Participants Signatures */}
              {meeting.guests && meeting.guests.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-center font-bold text-[11px] uppercase tracking-wider text-slate-700 mb-6 pb-1 border-b border-slate-200">
                    DEMAIS PARTICIPANTES E CONVIDADOS PRESENTES
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10 items-start">
                    {meeting.guests.map((g, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <div className="w-full border-t border-slate-900 pt-2 min-h-[48px] flex flex-col justify-start items-center">
                          <p className="text-[11px] font-bold text-slate-900 uppercase leading-tight">
                            {g.name}
                          </p>
                          <p className="text-[10px] text-slate-600 font-medium leading-tight mt-1">
                            {g.role || 'Convidado(a)'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Approval mark */}
            {meeting.minutesApproved && (
              <div className="flex items-center justify-center gap-2 pt-6 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Ata Homologada e Aprovada por Unanimidade dos Presentes
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t ${styles.border} flex justify-end gap-2 print:hidden`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${styles.btnSecondary}`}
          >
            Fechar
          </button>
          <button
            onClick={handleExportWord}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border ${styles.border} ${styles.tableHoverBg} text-blue-700 dark:text-blue-300`}
          >
            <Download className="w-4 h-4" />
            Exportar Word (.doc)
          </button>
          <button
            onClick={handlePrint}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium ${styles.btnPrimary}`}
          >
            <Printer className="w-4 h-4" />
            Imprimir Ata Oficial
          </button>
        </div>
      </div>
    </div>
  );
};
