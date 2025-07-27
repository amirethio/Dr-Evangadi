import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastProvider, useGlobalToast } from './components/ui/toast';
import './index.css';

const AppWithToast = () => {
  useGlobalToast();
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppWithToast />
    </ToastProvider>
  </StrictMode>
);
