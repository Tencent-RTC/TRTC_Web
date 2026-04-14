import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ClipboardJS from 'clipboard';
import clippySvg from '@/assets/clippy.svg';
import './InviteLink.css';

interface InviteLinkProps {
  visible: boolean;
  link: string;
  onCopied: () => void;
}

export default function InviteLink({ visible, link, onCopied }: InviteLinkProps) {
  const { t } = useTranslation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const clipboardRef = useRef<ClipboardJS | null>(null);

  useEffect(() => {
    if (!visible || !btnRef.current) return;
    clipboardRef.current = new ClipboardJS(btnRef.current);
    clipboardRef.current.on('success', () => {
      onCopied();
    });
    return () => {
      clipboardRef.current?.destroy();
    };
  }, [visible, onCopied]);

  const handleOpenLink = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
      onCopied();
    }
  };

  if (!visible) return null;

  return (
    <div className="invite-container">
      <p className="invite-tip">{t('invite.tip')}</p>
      <div className="invite-copy-row">
        <button ref={btnRef} className="invite-copy-btn" data-clipboard-target="#inviteUrl">
          <img src={clippySvg} width="12" height="12" alt="Copy" />
        </button>
        <input id="inviteUrl" className="invite-input" value={link} readOnly />
        <button className="invite-open-btn" onClick={handleOpenLink} title={t('invite.open')}>
          ↗
        </button>
      </div>
    </div>
  );
}
