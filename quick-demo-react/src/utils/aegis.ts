const isProd = location.origin === 'https://web.sdk.qcloud.com';
const isDev = location.origin.includes('localhost') || location.origin.includes('127.0.0.1');

export const DEMOKEY = isProd ? 'v5QuickDemoReact' : 'v5QuickDemoReactDev';

const AEGIS_ID = {
  dev: 'iHWefAYqBEHVFrSxnV',
  prod: 'iHWefAYqVGQzlNLveU',
};

let aegis: any = null;

export function initAegis() {
  if ((isProd || isDev) && (window as any).Aegis) {
    aegis = new (window as any).Aegis({
      id: isProd ? AEGIS_ID.prod : AEGIS_ID.dev,
      uin: '',
      reportApiSpeed: false,
      reportAssetSpeed: false,
    });
  }
}

export function reportSuccessEvent(name: string, sdkAppId: number) {
  const isIframe = window.self !== window.top;
  aegis?.reportEvent({
    name,
    ext1: `${name}-success${isIframe ? '-iframe' : ''}`,
    ext2: DEMOKEY,
    ext3: sdkAppId,
  });
}

export function reportFailedEvent({
  name,
  error,
  type = 'rtc',
  roomId,
}: {
  name: string;
  error: any;
  type?: string;
  roomId?: string;
}) {
  aegis?.reportEvent({
    name,
    ext1: `${name}-failed#${roomId}*${type}*${error?.message || ''}`,
    ext2: DEMOKEY,
    ext3: 0,
  });
}

export function reportEvent(eventData: Record<string, any>) {
  aegis?.reportEvent(eventData);
}
