import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import './index.css';

function Fallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="glass-card p-8 text-red-400 text-center">
        <h1 className="text-3xl mb-4">⚠️ Application Error</h1>
        <p className="mb-4">{error.message}</p>
        <button
          className="px-4 py-2 bg-purple-500/30 rounded hover:bg-purple-500/50 transition-colors"
          onClick={() => window.location.reload()}
        >
          Reload Application
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
      <Analytics />
    </ErrorBoundary>
  </React.StrictMode>
);