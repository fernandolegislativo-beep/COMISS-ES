import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLegislative } from '../context/LegislativeContext';
import { useNotification } from '../context/NotificationContext';
import { Committee, Councilor, Meeting, AttendanceRecord, AttendanceStatus } from '../types';
import { extractTextFromPdf } from '../utils/pdfExtractor';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Loader2,
  Calendar,
  UserCheck,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  Plus,
  Trash2,
} from 'lucide-react';

interface ParsedMeetingDraft {
  id: string;
  date: string;
  time: string;
  topic: string;
  description: string;
  attendances: AttendanceRecord[];
  minutesText: string;
  sourceTextSnippet: string;
}

interface ImportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCommitteeId?: string;
}

export const ImportReportModal: React.FC<ImportReportModalProps> = ({
  isOpen,
  onClose,
  defaultCommitteeId,
}) => {
  const { styles } = useTheme();
  const { committees, councilors, addMeeting } = useLegislative();
  const { showToast } = useNotification();
  const notifySuccess = (msg: string) => showToast(msg, 'success');
  const notifyError = (msg: string) => showToast(msg, 'error');

  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>(
    defaultCommitteeId || 'com-cfo'
  );
  const [activeInputTab, setActiveInputTab] = useState<'upload' | 'text'>('upload');
  const [rawText, setRawText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [parsedDrafts, setParsedDrafts] = useState<ParsedMeetingDraft[]>([]);
  const [step, setStep] = useState<'input' | 'preview'>('input');

  if (!isOpen) return null;

  const currentCommittee = committees.find((c) => c.id === selectedCommitteeId) || committees[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    try {
      if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
        const extracted = await extractTextFromPdf(file);
        setRawText(extracted);
        autoDetectCommittee(file.name + ' ' + extracted);
        parseReportMeetings(extracted, selectedCommitteeId);
        setStep('preview');
      } else {
        const text = await file.text();
        setRawText(text);
        autoDetectCommittee(file.name + ' ' + text);
        parseReportMeetings(text, selectedCommitteeId);
        setStep('preview');
      }
    } catch (err: any) {
      console.error('Erro ao ler arquivo:', err);
      notifyError('Erro ao ler PDF: ' + (err?.message || 'Arquivo corrompido ou protegido'));
    } finally {
      setIsProcessing(false);
    }
  };

  const autoDetectCommittee = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('finança') || lower.includes('orçamento') || lower.includes('cfo')) {
      setSelectedCommitteeId('com-cfo');
    } else if (lower.includes('educação') || lower.includes('cultura') || lower.includes('cecs')) {
      setSelectedCommitteeId('com-cecs');
    } else if (lower.includes('justiça') || lower.includes('redação') || lower.includes('cjr')) {
      setSelectedCommitteeId('com-cjr');
    } else if (lower.includes('obras') || lower.includes('serviços públicos') || lower.includes('cosp')) {
      setSelectedCommitteeId('com-cosp');
    }
  };

  const handleProcessManualText = () => {
    if (!rawText.trim()) {
      notifyError('Cole o texto do relatório antes de processar.');
      return;
    }
    parseReportMeetings(rawText, selectedCommitteeId);
    setStep('preview');
  };

  const parseReportMeetings = (text: string, committeeId: string) => {
    const committee = committees.find((c) => c.id === committeeId) || currentCommittee;
    if (!committee) return;

    // Build initial attendance template from committee members
    const getBaseAttendances = (): AttendanceRecord[] => {
      return (committee.members || []).map((m) => {
        const councilor = councilors.find((c) => c.id === m.councilorId);
        return {
          councilorId: m.councilorId,
          councilorName: m.councilorName,
          politicalParty: councilor?.politicalParty || '',
          committeeRole: m.role,
          status: 'presente' as AttendanceStatus,
          justificationReason: '',
          justificationDocument: '',
          justificationSigned: false,
        };
      });
    };

    // Splitting by meeting sessions or dates
    // Examples: "Reunião 1", "Reunião nº", "Sessão nº", dates like DD/MM/YYYY
    const chunks = text.split(/(?=Reunião\s*(?:nº|número|\d+|ordinária|extraordinária)|\bData:\s*\d{2}\/\d{2}\/\d{4})/i);

    const drafts: ParsedMeetingDraft[] = [];

    // If split produced only 1 chunk or didn't split well, look for dates
    const segments = chunks.filter((c) => c.trim().length > 20);

    if (segments.length === 0) {
      // Create at least one draft from the whole text
      segments.push(text);
    }

    segments.forEach((seg, idx) => {
      // Find Date
      const dateMatch = seg.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
      let date = new Date().toISOString().split('T')[0];
      if (dateMatch) {
        const day = dateMatch[1].padStart(2, '0');
        const month = dateMatch[2].padStart(2, '0');
        const year = dateMatch[3];
        date = `${year}-${month}-${day}`;
      }

      // Find Time
      const timeMatch = seg.match(/(\d{1,2})[h:](\d{2})/i);
      const time = timeMatch ? `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}` : '14:00';

      // Find Topic / Pauta
      let topic = '';
      const topicMatch = seg.match(/(?:Pauta|Assunto|Matéria|Projeto[s]?\s*de\s*Lei[s]?|PL|Processo)[^:\n]*:\s*([^\n\r]+)/i);
      if (topicMatch) {
        topic = topicMatch[1].trim();
      } else {
        const plMatch = seg.match(/(?:Projeto(?:s)?\s+de\s+Lei\s+n[ºo°]?\s*[\d\s,e\/]+)/i);
        if (plMatch) {
          topic = plMatch[0].trim();
        } else {
          topic = `Apreciação de matérias da ${committee.acronym}`;
        }
      }

      // Parse attendances
      const attendances = getBaseAttendances().map((att) => {
        const namePart = att.councilorName.split(' ')[0].toLowerCase();
        const lastNamePart = att.councilorName.split(' ').slice(-1)[0].toLowerCase();

        // Check if absent in this snippet
        const absentPattern = new RegExp(
          `(${namePart}|${lastNamePart}).{0,45}(ausente|falta|não compareceu)`,
          'i'
        );
        const justifiedPattern = new RegExp(
          `(${namePart}|${lastNamePart}).{0,45}(justific|atestado|ofício)`,
          'i'
        );

        if (absentPattern.test(seg)) {
          if (justifiedPattern.test(seg) || seg.toLowerCase().includes('ausente justificado')) {
            return {
              ...att,
              status: 'ausente_justificado' as AttendanceStatus,
              justificationReason: 'Justificativa comunicada à mesa da comissão',
            };
          }
          return {
            ...att,
            status: 'ausente_injustificado' as AttendanceStatus,
          };
        }
        return att;
      });

      drafts.push({
        id: `draft-${Date.now()}-${idx}`,
        date,
        time,
        topic,
        description: `Reunião deliberativa da ${committee.name}.`,
        attendances,
        minutesText: `ATA DA REUNIÃO DA ${committee.name.toUpperCase()} (${committee.acronym}).\nData: ${date} às ${time}.\nPauta: ${topic}.\nPresenças registradas conforme frequência oficial.`,
        sourceTextSnippet: seg.substring(0, 300),
      });
    });

    setParsedDrafts(drafts);
  };

  const handleAttendanceChange = (
    draftIndex: number,
    councilorId: string,
    newStatus: AttendanceStatus
  ) => {
    setParsedDrafts((prev) =>
      prev.map((draft, idx) => {
        if (idx !== draftIndex) return draft;
        return {
          ...draft,
          attendances: draft.attendances.map((att) =>
            att.councilorId === councilorId ? { ...att, status: newStatus } : att
          ),
        };
      })
    );
  };

  const handleUpdateDraft = (index: number, updates: Partial<ParsedMeetingDraft>) => {
    setParsedDrafts((prev) =>
      prev.map((d, i) => (i === index ? { ...d, ...updates } : d))
    );
  };

  const handleRemoveDraft = (index: number) => {
    setParsedDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    if (parsedDrafts.length === 0) {
      notifyError('Nenhuma reunião encontrada para importar.');
      return;
    }

    setIsSaving(true);
    try {
      const committee = committees.find((c) => c.id === selectedCommitteeId) || currentCommittee;

      for (const draft of parsedDrafts) {
        await addMeeting({
          committeeId: committee.id,
          committeeName: committee.name,
          date: draft.date,
          time: draft.time,
          location: 'Sala das Comissões Parlamentares',
          topic: draft.topic,
          description: draft.description,
          status: 'realizada',
          attendances: draft.attendances,
          minutesText: draft.minutesText,
          minutesApproved: true,
        });
      }

      notifySuccess(`${parsedDrafts.length} reunião(ões) importada(s) com sucesso para o banco de dados!`);
      onClose();
    } catch (err: any) {
      console.error('Erro ao salvar reuniões:', err);
      notifyError('Erro ao gravar reuniões no Firebase: ' + (err?.message || 'Tente novamente'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl border ${styles.cardBg} ${styles.border}`}
      >
        {/* Header */}
        <div className={`p-5 border-b ${styles.border} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${styles.textPrimary}`}>
                Importador Inteligente de Relatórios e Atas
              </h2>
              <p className={`text-xs ${styles.textMuted}`}>
                Suba o PDF da comissão ou cole o texto para estruturar e gravar as reuniões automaticamente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 ${styles.textMuted}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Top selector: Committee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold ${styles.textMuted} mb-1.5`}>
                Comissão Responsável
              </label>
              <select
                value={selectedCommitteeId}
                onChange={(e) => {
                  setSelectedCommitteeId(e.target.value);
                  if (rawText) {
                    parseReportMeetings(rawText, e.target.value);
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${styles.cardBg} ${styles.border} ${styles.textPrimary} focus:ring-2 focus:ring-blue-500`}
              >
                {committees.map((com) => (
                  <option key={com.id} value={com.id}>
                    {com.name} ({com.acronym})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold ${styles.textMuted} mb-1.5`}>
                Membros Oficiais da Comissão Selecionada
              </label>
              <div
                className={`px-3 py-2 rounded-xl border text-xs ${styles.cardBg} ${styles.border} flex flex-wrap gap-2 items-center min-h-[42px]`}
              >
                {(currentCommittee?.members || []).map((m) => (
                  <span
                    key={m.councilorId}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium"
                  >
                    <strong>{m.role}:</strong>&nbsp;{m.councilorName}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {step === 'input' ? (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 pb-2">
                <button
                  onClick={() => setActiveInputTab('upload')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeInputTab === 'upload'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : `${styles.textMuted} hover:text-blue-600`
                  }`}
                >
                  Arquivo PDF
                </button>
                <button
                  onClick={() => setActiveInputTab('text')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeInputTab === 'text'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : `${styles.textMuted} hover:text-blue-600`
                  }`}
                >
                  Colar Texto do Relatório
                </button>
              </div>

              {activeInputTab === 'upload' ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    styles.border
                  } hover:border-blue-500 bg-black/2 dark:bg-white/2`}
                >
                  <input
                    type="file"
                    id="pdf-upload-input"
                    accept=".pdf,.txt,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="pdf-upload-input"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                      {isProcessing ? (
                        <Loader2 className="w-10 h-10 animate-spin" />
                      ) : (
                        <FileText className="w-10 h-10" />
                      )}
                    </div>
                    <div>
                      <p className={`text-base font-semibold ${styles.textPrimary}`}>
                        {isProcessing
                          ? 'Extraindo texto do PDF...'
                          : 'Clique aqui para selecionar o PDF da Comissão'}
                      </p>
                      <p className={`text-xs ${styles.textMuted} mt-1`}>
                        Ex: <em>Comissão de Finanças, Orçamento e Fiscalização.pdf</em> (ou arraste aqui)
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition">
                      Selecionar Arquivo PDF
                    </span>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    rows={8}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Cole aqui o relatório da comissão (ex: Reunião 1 - Data: 10/05/2026, Pauta: Projeto de Lei..., Presenças:...)"
                    className={`w-full p-4 rounded-xl border text-sm font-mono ${styles.cardBg} ${styles.border} ${styles.textPrimary} focus:ring-2 focus:ring-blue-500`}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleProcessManualText}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Analisar e Estruturar Reuniões</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* PREVIEW STEP */
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-3.5 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                    {parsedDrafts.length} reunião(ões) identificada(s) para {currentCommittee?.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setStep('input')}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${styles.cardBg} ${styles.border} ${styles.textMuted} hover:text-blue-600`}
                  >
                    Trocar arquivo / texto
                  </button>
                </div>
              </div>

              {/* Draft Cards */}
              <div className="space-y-4">
                {parsedDrafts.map((draft, idx) => (
                  <div
                    key={draft.id}
                    className={`p-4 rounded-xl border ${styles.cardBg} ${styles.border} shadow-xs space-y-3`}
                  >
                    <div className="flex items-center justify-between border-b pb-2.5 dark:border-gray-800">
                      <div className="flex items-center space-x-3">
                        <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-bold">
                          Reunião {idx + 1}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <input
                            type="date"
                            value={draft.date}
                            onChange={(e) => handleUpdateDraft(idx, { date: e.target.value })}
                            className={`px-2 py-1 rounded-md border text-xs font-medium ${styles.cardBg} ${styles.border} ${styles.textPrimary}`}
                          />
                          <input
                            type="time"
                            value={draft.time}
                            onChange={(e) => handleUpdateDraft(idx, { time: e.target.value })}
                            className={`px-2 py-1 rounded-md border text-xs font-medium ${styles.cardBg} ${styles.border} ${styles.textPrimary}`}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveDraft(idx)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md"
                        title="Remover esta reunião"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Topic */}
                    <div>
                      <label className={`block text-xs font-medium ${styles.textMuted} mb-1`}>
                        Pauta / Matérias Apreciadas
                      </label>
                      <input
                        type="text"
                        value={draft.topic}
                        onChange={(e) => handleUpdateDraft(idx, { topic: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold ${styles.cardBg} ${styles.border} ${styles.textPrimary}`}
                      />
                    </div>

                    {/* Frequency of the 3 members */}
                    <div>
                      <label className={`block text-xs font-medium ${styles.textMuted} mb-1.5`}>
                        Frequência dos Membros da Comissão ({draft.attendances.length} Vereadores)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {draft.attendances.map((att) => (
                          <div
                            key={att.councilorId}
                            className={`p-2.5 rounded-lg border text-xs ${
                              att.status === 'presente'
                                ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                                : att.status === 'ausente_justificado'
                                ? 'bg-amber-50/70 border-amber-300 dark:bg-amber-950/20 dark:border-amber-800'
                                : 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800'
                            }`}
                          >
                            <p className="font-bold text-gray-900 dark:text-gray-100 truncate">
                              {att.councilorName}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                              {att.committeeRole} ({att.politicalParty || 'Câmara'})
                            </p>

                            {/* Status toggles */}
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(idx, att.councilorId, 'presente')
                                }
                                className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold transition ${
                                  att.status === 'presente'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                Presente
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(idx, att.councilorId, 'ausente_justificado')
                                }
                                className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold transition ${
                                  att.status === 'ausente_justificado'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                Justificado
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(idx, att.councilorId, 'ausente_injustificado')
                                }
                                className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold transition ${
                                  att.status === 'ausente_injustificado'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                Ausente
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${styles.border} flex items-center justify-between`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl border text-sm font-medium ${styles.cardBg} ${styles.border} ${styles.textMuted}`}
          >
            Cancelar
          </button>

          {step === 'preview' && (
            <div className="flex items-center space-x-3">
              <span className={`text-xs ${styles.textMuted}`}>
                {parsedDrafts.length} reunião(ões) pronta(s) para sincronização
              </span>
              <button
                onClick={handleSaveAll}
                disabled={isSaving || parsedDrafts.length === 0}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition flex items-center space-x-2 disabled:opacity-50 shadow-md"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gravando no Firebase...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Gravar no Sistema</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
