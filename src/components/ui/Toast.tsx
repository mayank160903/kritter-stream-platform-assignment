'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Toast = { id: number; message: string };

const ToastContext = createContext<{ show: (message: string) => void } | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="px-4 py-2 rounded-lg bg-black/80 border border-gray-700 shadow-lg text-white">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};


