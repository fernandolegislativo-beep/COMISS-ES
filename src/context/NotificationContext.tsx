import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ConfirmDialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'danger' | 'primary' | 'warning';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface NotificationContextType {
  showToast: (message: string, type?: ToastType) => void;
  confirmAction: (options: ConfirmDialogOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogOptions | null>(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = 'toast-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const confirmAction = useCallback((options: ConfirmDialogOptions) => {
    setConfirmDialog(options);
  }, []);

  const handleConfirm = async () => {
    if (!confirmDialog) return;
    try {
      setIsConfirmLoading(true);
      await confirmDialog.onConfirm();
    } catch (err) {
      console.error('Erro na ação de confirmação:', err);
    } finally {
      setIsConfirmLoading(false);
      setConfirmDialog(null);
    }
  };

  const handleCancel = () => {
    if (confirmDialog?.onCancel) {
      confirmDialog.onCancel();
    }
    setConfirmDialog(null);
  };

  return (
    <NotificationContext.Provider value={{ showToast, confirmAction }}>
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bg = 'bg-slate-900 text-white border-slate-700';
          let Icon = Info;
          let iconColor = 'text-blue-400';

          if (toast.type === 'success') {
            bg = 'bg-emerald-950 text-emerald-100 border-emerald-700/60';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
          } else if (toast.type === 'error') {
            bg = 'bg-rose-950 text-rose-100 border-rose-700/60';
            Icon = XCircle;
            iconColor = 'text-rose-400';
          } else if (toast.type === 'warning') {
            bg = 'bg-amber-950 text-amber-100 border-amber-700/60';
            Icon = AlertTriangle;
            iconColor = 'text-amber-400';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${bg}`}
              role="alert"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white p-0.5 rounded-md transition-colors"
                title="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* In-App Confirmation Modal Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-900 dark:text-white space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  confirmDialog.confirmVariant === 'danger'
                    ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                    : confirmDialog.confirmVariant === 'warning'
                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                    : 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                }`}
              >
                {confirmDialog.confirmVariant === 'danger' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : confirmDialog.confirmVariant === 'warning' ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <HelpCircle className="w-6 h-6" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base font-serif leading-tight">
                  {confirmDialog.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {confirmDialog.message}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={isConfirmLoading}
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors disabled:opacity-50"
              >
                {confirmDialog.cancelText || 'Cancelar'}
              </button>
              <button
                type="button"
                disabled={isConfirmLoading}
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-xs disabled:opacity-50 ${
                  confirmDialog.confirmVariant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800'
                    : confirmDialog.confirmVariant === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                {isConfirmLoading
                  ? 'Processando...'
                  : confirmDialog.confirmText || 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
