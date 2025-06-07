import React, { createContext, useContext, useState, useCallback } from 'react';

type Toast = { id: number; message: string };

interface ToastContextProps {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = (id: number) => setToasts((t) => t.filter((toast) => toast.id !== id));

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => remove(id), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 inset-x-0 flex flex-col items-center space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-black text-white px-4 py-2 rounded shadow pointer-events-auto">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
