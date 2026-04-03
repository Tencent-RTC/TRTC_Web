import { useTranslation } from 'react-i18next';
import type { RoomStatus, MediaStatus } from '@/hooks/useTRTC';
import './Controls.css';

interface ControlsProps {
  roomStatus: RoomStatus;
  camStatus: MediaStatus;
  micStatus: MediaStatus;
  shareStatus: MediaStatus;
  onEnterRoom: () => void;
  onExitRoom: () => void;
  onStartLocalAudio: () => void;
  onStopLocalAudio: () => void;
  onStartLocalVideo: () => void;
  onStopLocalVideo: () => void;
  onStartScreenShare: () => void;
  onStopScreenShare: () => void;
}

export default function Controls({
  roomStatus,
  camStatus,
  micStatus,
  shareStatus,
  onEnterRoom,
  onExitRoom,
  onStartLocalAudio,
  onStopLocalAudio,
  onStartLocalVideo,
  onStopLocalVideo,
  onStartScreenShare,
  onStopScreenShare,
}: ControlsProps) {
  const { t } = useTranslation();

  const isEntering = roomStatus === 'entering';
  const isExiting = roomStatus === 'exiting';
  const isEntered = roomStatus === 'entered';

  return (
    <div className="controls-container">
      <h2 className="section-title">{t('operation.title')}</h2>
      <div className="controls-row">
        <button
          className="ctrl-btn ctrl-btn-primary"
          onClick={onEnterRoom}
          disabled={isEntering || isEntered}
        >
          {isEntering && <span className="loading-spinner" />}
          {t('operation.enterRoom')}
        </button>
        <button
          className="ctrl-btn ctrl-btn-outline"
          onClick={onExitRoom}
          disabled={isExiting || roomStatus === 'idle'}
        >
          {isExiting && <span className="loading-spinner" />}
          {t('operation.exitRoom')}
        </button>
      </div>
      <div className="controls-row">
        <button
          className="ctrl-btn ctrl-btn-primary"
          onClick={onStartLocalAudio}
          disabled={micStatus === 'starting' || micStatus === 'started'}
        >
          {micStatus === 'starting' && <span className="loading-spinner" />}
          {t('operation.startLocalAudio')}
        </button>
        <button
          className="ctrl-btn ctrl-btn-primary"
          onClick={onStartLocalVideo}
          disabled={camStatus === 'starting' || camStatus === 'started'}
        >
          {camStatus === 'starting' && <span className="loading-spinner" />}
          {t('operation.startLocalVideo')}
        </button>
        <button
          className="ctrl-btn ctrl-btn-outline"
          onClick={onStopLocalAudio}
          disabled={micStatus === 'stopping' || micStatus === 'idle'}
        >
          {micStatus === 'stopping' && <span className="loading-spinner" />}
          {t('operation.stopLocalAudio')}
        </button>
        <button
          className="ctrl-btn ctrl-btn-outline"
          onClick={onStopLocalVideo}
          disabled={camStatus === 'stopping' || camStatus === 'idle'}
        >
          {camStatus === 'stopping' && <span className="loading-spinner" />}
          {t('operation.stopLocalVideo')}
        </button>
      </div>
      <div className="controls-row">
        <button
          className="ctrl-btn ctrl-btn-primary"
          onClick={onStartScreenShare}
          disabled={shareStatus === 'starting' || shareStatus === 'started'}
        >
          {shareStatus === 'starting' && <span className="loading-spinner" />}
          {t('operation.startShareScreen')}
        </button>
        <button
          className="ctrl-btn ctrl-btn-outline"
          onClick={onStopScreenShare}
          disabled={shareStatus === 'stopping' || shareStatus === 'idle'}
        >
          {shareStatus === 'stopping' && <span className="loading-spinner" />}
          {t('operation.stopShareScreen')}
        </button>
      </div>
    </div>
  );
}
