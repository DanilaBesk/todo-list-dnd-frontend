import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { CardModal } from './components/modal/card-modal/card-modal';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster offset={6} position="top-right" richColors closeButton />
      <CardModal />
    </QueryClientProvider>
  </React.StrictMode>
);
