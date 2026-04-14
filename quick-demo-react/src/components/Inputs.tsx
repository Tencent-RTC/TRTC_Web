import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store';
import { getUrlParam, generateRandomUserId, generateRandomRoomId } from '@/utils/utils';
import './Inputs.css';

export default function Inputs() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const { sdkAppId, sdkSecretKey, userId, strRoomId, setSdkAppId, setSdkSecretKey, setUserId, setStrRoomId } = useAppStore();

  useEffect(() => {
    const urlSdkAppId = getUrlParam('sdkAppId') || '';
    const urlSecretKey = getUrlParam('sdkSecretKey') || '';
    const urlUserId = getUrlParam('userId') || generateRandomUserId();
    const urlRoomId = getUrlParam('strRoomId') || generateRandomRoomId();

    setSdkAppId(urlSdkAppId || localStorage.getItem('trtc_sdkAppId') || '');
    setSdkSecretKey(urlSecretKey || localStorage.getItem('trtc_sdkSecretKey') || '');
    setUserId(urlUserId);
    setStrRoomId(urlRoomId);
  }, []);

  const securityDocUrl = isZh
    ? 'https://cloud.tencent.com/document/product/647/17275'
    : 'https://trtc.io/document/35166?platform=web&product=rtcengine&menulabel=sdk';

  return (
    <div className="inputs-container">
      <h2 className="section-title">{t('params.title')}</h2>
      <div className="input-row">
        <div className="input-group">
          <span className="input-label">{t('params.sdkAppId')}</span>
          <input
            type="number"
            className="input-field"
            placeholder={t('params.sdkAppIdPlaceholder')}
            value={sdkAppId}
            onChange={(e) => setSdkAppId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-label">{t('params.sdkSecretKey')}</span>
          <input
            type="text"
            className="input-field"
            placeholder={t('params.sdkSecretKeyPlaceholder')}
            value={sdkSecretKey}
            onChange={(e) => setSdkSecretKey(e.target.value)}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-group">
          <span className="input-label">{t('params.userId')}</span>
          <input
            type="text"
            className="input-field"
            placeholder={t('params.userIdPlaceholder')}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-label">{t('params.roomId')}</span>
          <input
            type="text"
            className="input-field"
            placeholder={t('params.roomIdPlaceholder')}
            value={strRoomId}
            onChange={(e) => setStrRoomId(e.target.value)}
          />
        </div>
      </div>
      <div className="security-warning">
        <span>{t('security.warning')} </span>
        <a href={securityDocUrl} target="_blank" rel="noopener noreferrer">
          {t('security.viewDoc')}
        </a>
      </div>
    </div>
  );
}
