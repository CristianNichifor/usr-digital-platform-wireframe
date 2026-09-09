import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tokens.css';
import './styles.css';
import '@cristiannichifor/civic-ui/styles.css';
import '@cristiannichifor/civic-ui/themes/usr.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="civic-scope civic-usr">
      <App />
    </div>
  </StrictMode>,
);
