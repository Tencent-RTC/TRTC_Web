export function getUrlParam(name: string): string | null {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  // Also check hash params for HashRouter
  const hash = window.location.hash;
  if (hash.includes('?')) {
    const hashSearch = hash.split('?')[1];
    const hr = hashSearch.match(reg);
    if (hr != null) {
      return decodeURIComponent(hr[2]);
    }
  }
  return null;
}

export function getLanguage(storageKey = 'trtc-v5-quick-demo-react'): string {
  const urlLang = getUrlParam('lang');
  const storedLang = localStorage.getItem(storageKey);
  const browserLang = navigator.language?.toLowerCase();
  const lang = urlLang || storedLang || browserLang || 'en';
  return lang.indexOf('zh') > -1 ? 'zh-cn' : 'en';
}

export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function generateRandomUserId(): string {
  return 'user_' + Math.floor(Math.random() * 1000000);
}

export function generateRandomRoomId(): string {
  return 'room_' + Math.floor(Math.random() * 1000);
}
