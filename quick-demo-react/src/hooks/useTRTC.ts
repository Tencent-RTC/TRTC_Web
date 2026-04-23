import { useRef, useState, useCallback, useEffect } from 'react';
import TRTC from 'trtc-sdk-v5';
import { useAppStore } from '@/store';
import { genTestUserSig } from '@/utils/generateTestUserSig';
import { reportSuccessEvent, reportFailedEvent } from '@/utils/aegis';

export type RoomStatus = 'idle' | 'entering' | 'entered' | 'exiting';
export type MediaStatus = 'idle' | 'starting' | 'started' | 'stopping';

export function useTRTC() {
  const trtcRef = useRef<any>(null);

  const [roomStatus, setRoomStatus] = useState<RoomStatus>('idle');
  const [camStatus, setCamStatus] = useState<MediaStatus>('idle');
  const [micStatus, setMicStatus] = useState<MediaStatus>('idle');
  const [shareStatus, setShareStatus] = useState<MediaStatus>('idle');
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const store = useAppStore();

  // Initialize TRTC instance
  useEffect(() => {
    if (!trtcRef.current) {
      trtcRef.current = TRTC.create();
      TRTC.setLogLevel(1);
    }
    return () => {
      if (trtcRef.current) {
        trtcRef.current.destroy();
        trtcRef.current = null;
      }
    };
  }, []);

  // Create share link helper
  const createShareLink = useCallback((sdkAppId: number, sdkSecretKey: string, strRoomId: string) => {
    const inviteUserId = String(Math.floor(Math.random() * 1000000));
    const { userSig } = genTestUserSig({ sdkAppId, userId: inviteUserId, sdkSecretKey });
    const { origin } = window.location;
    const hash = window.location.hash.split('?')[0];
    const basePath = `${origin}${window.location.pathname}`;
    return `${basePath}#/invite?userSig=${userSig}&SDKAppId=${sdkAppId}&userId=${inviteUserId}&strRoomId=${strRoomId}`;
  }, []);

  const refreshLink = useCallback(() => {
    const { sdkAppId, sdkSecretKey, strRoomId } = useAppStore.getState();
    if (sdkAppId && sdkSecretKey && strRoomId) {
      const link = createShareLink(Number(sdkAppId), sdkSecretKey, strRoomId);
      setShareLink(link);
    }
  }, [createShareLink]);

  // Bind TRTC events
  const bindEvents = useCallback(() => {
    const trtc = trtcRef.current;
    if (!trtc) return;

    trtc.on(TRTC.EVENT.REMOTE_VIDEO_AVAILABLE, ({ userId, streamType }: { userId: string; streamType: string }) => {
      const elementId = `${userId}_${streamType}`;
      const currentStore = useAppStore.getState();
      currentStore.addRemoteUser({ userId, streamType, elementId });

      // Wait for DOM to render then start remote video
      setTimeout(() => {
        trtc.startRemoteVideo({ userId, streamType, view: elementId });
      }, 0);
    });

    trtc.on(TRTC.EVENT.REMOTE_VIDEO_UNAVAILABLE, ({ userId, streamType }: { userId: string; streamType: string }) => {
      const elementId = `${userId}_${streamType}`;
      const currentStore = useAppStore.getState();
      currentStore.removeRemoteUser(elementId);
      trtc.stopRemoteVideo({ userId, streamType });
    });

    trtc.on(TRTC.EVENT.SCREEN_SHARE_STOPPED, () => {
      setShareStatus('idle');
      const currentStore = useAppStore.getState();
      currentStore.addSuccessLog('Screen sharing stopped.');
    });

    trtc.on(TRTC.EVENT.DEVICE_CHANGED, async ({ type }: { type: string }) => {
      if (type === 'camera') {
        const cameras = await TRTC.getCameraList();
        const currentStore = useAppStore.getState();
        currentStore.setCameras(cameras.map((c: MediaDeviceInfo) => ({ deviceId: c.deviceId, label: c.label })));
      }
      if (type === 'microphone') {
        const microphones = await TRTC.getMicrophoneList();
        const currentStore = useAppStore.getState();
        currentStore.setMicrophones(microphones.map((m: MediaDeviceInfo) => ({ deviceId: m.deviceId, label: m.label })));
      }
    });
  }, []);

  const unbindEvents = useCallback(() => {
    const trtc = trtcRef.current;
    if (!trtc) return;
    trtc.off('*');
  }, []);

  // Enter Room
  const enterRoom = useCallback(async () => {
    const { sdkAppId, sdkSecretKey, userId, strRoomId } = useAppStore.getState();
    const numericSdkAppId = Number(sdkAppId);

    if (!numericSdkAppId || !sdkSecretKey || !userId || !strRoomId) {
      store.addFailedLog('Please fill in the correct SDKAppId, SDKSecretKey, userId, strRoomId');
      return;
    }

    setRoomStatus('entering');
    bindEvents();

    try {
      const { userSig } = genTestUserSig({ sdkAppId: numericSdkAppId, userId, sdkSecretKey });
      await trtcRef.current.enterRoom({ strRoomId, sdkAppId: numericSdkAppId, userId, userSig });
      reportSuccessEvent('enterRoom', numericSdkAppId);
      store.addSuccessLog(`[${userId}] enterRoom.`);
      setRoomStatus('entered');

      // Generate invite link
      const link = createShareLink(numericSdkAppId, sdkSecretKey, strRoomId);
      setShareLink(link);
    } catch (error: any) {
      console.error('enterRoom error', error);
      reportFailedEvent({ name: 'enterRoom', error, roomId: strRoomId });
      store.addFailedLog(`[${userId}] enterRoom failed. Reason: ${error.message || error}`);
      setRoomStatus('idle');
      unbindEvents();
    }
  }, [store, bindEvents, unbindEvents, createShareLink]);

  // Exit Room
  const exitRoom = useCallback(async () => {
    const { userId } = useAppStore.getState();
    setRoomStatus('exiting');

    try {
      if (micStatus === 'started') {
        await trtcRef.current.stopLocalAudio();
        setMicStatus('idle');
      }
      if (camStatus === 'started') {
        await trtcRef.current.stopLocalVideo();
        setCamStatus('idle');
      }
      if (shareStatus === 'started') {
        await trtcRef.current.stopScreenShare();
        setShareStatus('idle');
      }

      await trtcRef.current.exitRoom();
      reportSuccessEvent('exitRoom', 0);
      store.addSuccessLog(`[${userId}] exitRoom.`);
      store.clearRemoteUsers();
      unbindEvents();
      setRoomStatus('idle');
      setShareLink('');
      setAudioMuted(false);
      setVideoMuted(false);
    } catch (error: any) {
      console.error('exitRoom error', error);
      reportFailedEvent({ name: 'exitRoom', error });
      store.addFailedLog(`[${userId}] exitRoom failed. Reason: ${error.message || error}`);
      setRoomStatus('entered');
    }
  }, [store, micStatus, camStatus, shareStatus, unbindEvents]);

  // Start Local Audio
  const startLocalAudio = useCallback(async () => {
    const { userId, selectedMicrophoneId } = useAppStore.getState();
    setMicStatus('starting');
    try {
      await trtcRef.current.startLocalAudio({
        option: { microphoneId: selectedMicrophoneId || undefined },
      });
      setMicStatus('started');
      setAudioMuted(false);
      reportSuccessEvent('startLocalAudio', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} startLocalAudio.`);
    } catch (error: any) {
      console.error('startLocalAudio error', error);
      reportFailedEvent({ name: 'startLocalAudio', error });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} startLocalAudio failed. Reason: ${error.message || error}`);
      setMicStatus('idle');
    }
  }, [store]);

  // Stop Local Audio
  const stopLocalAudio = useCallback(async () => {
    const { userId } = useAppStore.getState();
    if (micStatus !== 'started') {
      store.addFailedLog('The audio has not been started');
      return;
    }
    setMicStatus('stopping');
    try {
      await trtcRef.current.stopLocalAudio();
      setMicStatus('idle');
      reportSuccessEvent('stopLocalAudio', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} stopLocalAudio.`);
    } catch (error: any) {
      console.error('stopLocalAudio error', error);
      reportFailedEvent({ name: 'stopLocalAudio', error });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} stopLocalAudio failed. Reason: ${error.message || error}`);
      setMicStatus('started');
    }
  }, [store, micStatus]);

  // Start Local Video
  const startLocalVideo = useCallback(async (viewId: string = 'local') => {
    const { userId, selectedCameraId } = useAppStore.getState();
    setCamStatus('starting');
    try {
      await trtcRef.current.startLocalVideo({
        view: document.getElementById(viewId),
        option: { cameraId: selectedCameraId || undefined, profile: '1080p' },
      });
      setCamStatus('started');
      setVideoMuted(false);
      reportSuccessEvent('startLocalVideo', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} startLocalVideo.`);
    } catch (error: any) {
      console.error('startLocalVideo error', error);
      reportFailedEvent({ name: 'startLocalVideo', error });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} startLocalVideo failed. Reason: ${error.message || error}`);
      setCamStatus('idle');
    }
  }, [store]);

  // Stop Local Video
  const stopLocalVideo = useCallback(async () => {
    const { userId } = useAppStore.getState();
    if (camStatus !== 'started') {
      store.addFailedLog('The video has not been started');
      return;
    }
    setCamStatus('stopping');
    try {
      await trtcRef.current.stopLocalVideo();
      setCamStatus('idle');
      reportSuccessEvent('stopLocalVideo', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} stopLocalVideo.`);
    } catch (error: any) {
      console.error('stopLocalVideo error', error);
      reportFailedEvent({ name: 'stopLocalVideo', error });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} stopLocalVideo failed. Reason: ${error.message || error}`);
      setCamStatus('started');
    }
  }, [store, camStatus]);

  // Start Screen Share
  const startScreenShare = useCallback(async () => {
    const { userId } = useAppStore.getState();
    setShareStatus('starting');
    try {
      await trtcRef.current.startScreenShare();
      setShareStatus('started');
      reportSuccessEvent('startScreenShare', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} startScreenShare.`);
    } catch (error: any) {
      console.error('startScreenShare error', error);
      reportFailedEvent({ name: 'startScreenShare', error, type: 'share' });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} startScreenShare failed. Reason: ${error.message || error}`);
      setShareStatus('idle');
    }
  }, [store]);

  // Stop Screen Share
  const stopScreenShare = useCallback(async () => {
    const { userId } = useAppStore.getState();
    if (shareStatus !== 'started') {
      store.addFailedLog('The screen share has not been started');
      return;
    }
    setShareStatus('stopping');
    try {
      await trtcRef.current.stopScreenShare();
      setShareStatus('idle');
      reportSuccessEvent('stopScreenShare', 0);
      store.addSuccessLog(`${userId ? `[${userId}]` : ''} stopScreenShare.`);
    } catch (error: any) {
      console.error('stopScreenShare error', error);
      reportFailedEvent({ name: 'stopScreenShare', error, type: 'share' });
      store.addFailedLog(`${userId ? `[${userId}]` : ''} stopScreenShare failed. Reason: ${error.message || error}`);
      setShareStatus('started');
    }
  }, [store, shareStatus]);

  // Toggle Audio Mute
  const toggleAudioMute = useCallback(async () => {
    const { userId } = useAppStore.getState();
    try {
      const newMuted = !audioMuted;
      await trtcRef.current.updateLocalAudio({ mute: newMuted });
      setAudioMuted(newMuted);
      store.addSuccessLog(`updateLocalAudio muted=${newMuted}`);
    } catch (error: any) {
      store.addFailedLog(`[${userId}] updateLocalAudio failed. Reason: ${error.message}`);
    }
  }, [store, audioMuted]);

  // Toggle Video Mute
  const toggleVideoMute = useCallback(async () => {
    const { userId } = useAppStore.getState();
    try {
      const newMuted = !videoMuted;
      await trtcRef.current.updateLocalVideo({ mute: newMuted });
      setVideoMuted(newMuted);
      store.addSuccessLog(`updateLocalVideo muted=${newMuted}`);
    } catch (error: any) {
      store.addFailedLog(`[${userId}] updateLocalVideo failed. Reason: ${error.message}`);
    }
  }, [store, videoMuted]);

  // Update local audio device
  const updateLocalAudioDevice = useCallback(async (microphoneId: string) => {
    try {
      await trtcRef.current.updateLocalAudio({ option: { microphoneId } });
    } catch (error: any) {
      console.error('updateLocalAudio error', error);
    }
  }, []);

  // Update local video device
  const updateLocalVideoDevice = useCallback(async (cameraId: string) => {
    try {
      await trtcRef.current.updateLocalVideo({ option: { cameraId } });
    } catch (error: any) {
      console.error('updateLocalVideo error', error);
    }
  }, []);

  // Get devices
  const getDevices = useCallback(async () => {
    try {
      const cameras = await TRTC.getCameraList();
      store.setCameras(cameras.map((c: MediaDeviceInfo) => ({ deviceId: c.deviceId, label: c.label })));

      const microphones = await TRTC.getMicrophoneList();
      store.setMicrophones(microphones.map((m: MediaDeviceInfo) => ({ deviceId: m.deviceId, label: m.label })));
    } catch (error: any) {
      console.error('getDevices error', error);
    }
  }, [store]);

  // Init device (request permission then get device list)
  const initDevice = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      stream?.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('getUserMedia failed', error);
    }
    await getDevices();
  }, [getDevices]);

  return {
    trtcRef,
    roomStatus,
    camStatus,
    micStatus,
    shareStatus,
    audioMuted,
    videoMuted,
    shareLink,

    enterRoom,
    exitRoom,
    startLocalAudio,
    stopLocalAudio,
    startLocalVideo,
    stopLocalVideo,
    startScreenShare,
    stopScreenShare,
    toggleAudioMute,
    toggleVideoMute,
    updateLocalAudioDevice,
    updateLocalVideoDevice,
    getDevices,
    initDevice,
    refreshLink,
  };
}
