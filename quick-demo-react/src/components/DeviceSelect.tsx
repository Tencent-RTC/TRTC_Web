import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store';
import './DeviceSelect.css';

interface DeviceSelectProps {
  onCameraChange?: (deviceId: string) => void;
  onMicrophoneChange?: (deviceId: string) => void;
  initDevice?: () => Promise<void>;
}

export default function DeviceSelect({ onCameraChange, onMicrophoneChange, initDevice }: DeviceSelectProps) {
  const { t } = useTranslation();
  const { cameras, microphones, selectedCameraId, selectedMicrophoneId, setSelectedCameraId, setSelectedMicrophoneId } = useAppStore();

  useEffect(() => {
    initDevice?.();
  }, []);

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    setSelectedCameraId(deviceId);
    onCameraChange?.(deviceId);
  };

  const handleMicrophoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    setSelectedMicrophoneId(deviceId);
    onMicrophoneChange?.(deviceId);
  };

  return (
    <div className="device-select-container">
      <h2 className="section-title">{t('device.title')}</h2>
      <div className="device-row">
        <div className="device-group">
          <select className="device-dropdown" value={selectedCameraId} onChange={handleCameraChange}>
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `${t('device.camera')} ${camera.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
          <span className="device-label">{t('device.camera')}</span>
        </div>
        <div className="device-group">
          <select className="device-dropdown" value={selectedMicrophoneId} onChange={handleMicrophoneChange}>
            {microphones.map((mic) => (
              <option key={mic.deviceId} value={mic.deviceId}>
                {mic.label || `${t('device.microphone')} ${mic.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
          <span className="device-label">{t('device.microphone')}</span>
        </div>
      </div>
      <p className="device-tip">{t('device.permissionTip')}</p>
    </div>
  );
}
