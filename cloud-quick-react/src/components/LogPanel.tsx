import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store';
import './LogPanel.css';

export default function LogPanel() {
  const { t } = useTranslation();
  const logs = useAppStore((state) => state.logs);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="log-panel">
      <strong>{t('log.title')}</strong>
      {logs.map((log, index) => (
        <div key={index} className="log-item">
          <span className={log.type === 'success' ? 'log-success' : 'log-failed'}>
            {log.type === 'success' ? '🟩 ' : '🟥 '}
          </span>
          <span>{log.content}</span>
        </div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
}
