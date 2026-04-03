import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import TRTC from 'trtc-sdk-v5';
import { useAppStore } from '@/store';
import { getUrlParam } from '@/utils/utils';
import RemoteVideos from '@/components/RemoteVideos';
import './InvitePage.css';

export default function InvitePage() {
  const { t, i18n } = useTranslation();
  const trtcRef = useRef<any>(null);
  const [joined, setJoined] = useState(false);
  const store = useAppStore();

  const userId = getUrlParam('userId') || '';
  const sdkAppId = parseInt(getUrlParam('SDKAppId') || '0', 10);
  const userSig = getUrlParam('userSig') || '';
  const strRoomId = getUrlParam('strRoomId') || '';

  useEffect(() => {
    // If missing params, redirect to home
    if (!userId || !sdkAppId || !userSig) {
      const { origin, pathname } = window.location;
      window.location.href = `${origin}${pathname}#/`;
      return;
    }

    trtcRef.current = TRTC.create();

    // Request device permission
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        stream?.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error('getUserMedia failed', error);
      }
    })();

    return () => {
      if (trtcRef.current) {
        trtcRef.current.destroy();
        trtcRef.current = null;
      }
    };
  }, []);

  const handleJoin = useCallback(async () => {
    const trtc = trtcRef.current;
    if (!trtc) return;

    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }: { userId: string; streamType: string }) => {
      const elementId = `${userId}_${streamType}`;
      const currentStore = useAppStore.getState();
      currentStore.addInviteRemoteUser({ userId, streamType, elementId });
      setTimeout(() => {
        trtc.startRemoteVideo({ userId, streamType, view: elementId });
      }, 0);
    });

    trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, ({ userId, streamType }: { userId: string; streamType: string }) => {
      const elementId = `${userId}_${streamType}`;
      const currentStore = useAppStore.getState();
      currentStore.removeInviteRemoteUser(elementId);
      trtc.stopRemoteVideo({ userId, streamType });
    });

    await trtc.enterRoom({ strRoomId, sdkAppId, userId, userSig });
    await trtc.startLocalAudio();
    await trtc.startLocalVideo({
      view: document.getElementById('invite-local'),
      option: { profile: '1080p' },
    });
    setJoined(true);
  }, [userId, sdkAppId, userSig, strRoomId]);

  const handleLeave = useCallback(async () => {
    const trtc = trtcRef.current;
    if (!trtc) return;

    await trtc.stopLocalVideo();
    await trtc.stopLocalAudio();
    await trtc.stopRemoteVideo({ userId: '*' });
    await trtc.exitRoom();
    trtc.off('*');
    store.clearInviteRemoteUsers();
    setJoined(false);
  }, [store]);

  const toggleLanguage = async () => {
    const nextLang = i18n.language.startsWith('zh') ? 'en' : 'zh-cn';
    await i18n.changeLanguage(nextLang);
  };

  return (
    <div className="invite-page">
      <div className="invite-page-content">
        <div className="invite-alert">
          <span>{t('invite.pageTitle')}</span>
        </div>
        <div className="invite-actions">
          <button className="invite-action-btn primary" onClick={handleJoin} disabled={joined}>
            {t('invite.join')}
          </button>
          <button className="invite-action-btn primary" onClick={handleLeave} disabled={!joined}>
            {t('invite.leave')}
          </button>
        </div>
        <div className="invite-local-video" id="invite-local" />
        <RemoteVideos useInviteStore />
      </div>
    </div>
  );
}
