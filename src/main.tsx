import { StrictMode } from 'react'
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
);
