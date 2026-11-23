import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CvPage } from './CvPage';
import './cv.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CvPage />
  </StrictMode>,
);
