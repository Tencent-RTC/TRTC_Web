export function getUrlParam(key: string): string {
  const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ''));
  const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, 'i');
  const paramMatch = url.match(regexp);

  return paramMatch ? paramMatch[2] : '';
}

export function getLanguage(localStorageLangId = 'trtc-v5-quick-demo-vue3-ts') {
  let lang = getParamKey('lang') || localStorage.getItem(localStorageLangId) || window.navigator.language?.toLowerCase();
  lang = lang.indexOf('zh') > -1 ? 'zh-cn' : 'en';
  return lang;
}

export const getParamKey: any = (key: string) => {
  if (getUrlParam(key)) {
    return getUrlParam(key);
  }
  switch (key) {
    case 'userId':
      return `user_${Math.floor(Math.random() * 100000000)}`;
    case 'roomId':
      return Math.floor(Math.random() * 100000);
    case 'sdkAppId':
      return undefined;
    case 'sdkSecretKey':
      return undefined;
    default:
      return undefined;
  }
};

export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
