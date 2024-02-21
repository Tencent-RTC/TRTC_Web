export function getUrlParam(key) {
  const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ''));
  const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, 'i');
  const paramMatch = url.match(regexp);

  return paramMatch ? paramMatch[2] : null;
}

export function clearUrlParam() {
  location.href = location.href.slice(0, location.href.indexOf('?') > 0 ? location.href.indexOf('?') : location.href.length);
}

export function isUndefined(value) {
  return value === 'undefined';
}

export function getLanguage(localStorageLangId = 'trtc-v5-quick-demo-vue2-js') {
  let lang = getUrlParam('lang') || localStorage.getItem(localStorageLangId) || window.navigator.language?.toLowerCase();
  lang = lang.indexOf('zh') > -1 ? 'zh-cn' : 'en';
  return lang;
}

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
