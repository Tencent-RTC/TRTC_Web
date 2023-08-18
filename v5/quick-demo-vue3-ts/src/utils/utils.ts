/*
 * @Description: 通用函数
 * @Date: 2022-03-10 15:17:05
 * @LastEditTime: 2022-03-29 15:20:26
 */

/**
 * 从 window.location.href 中获取指定key的value
 * @param {*} key 要获取的 key
 * @returns window.location.href 中指定key对应的value
 * @example
 * const value = getUrlParam(key);
 */
export function getUrlParam(key: string): string {
  const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ''));
  const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, 'i');
  const paramMatch = url.match(regexp);

  return paramMatch ? paramMatch[2] : '';
}

/**
 * 获取语言
 * @returns language
 */
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
    case 'secretKey':
      return undefined;
    default:
      return undefined;
  }
};

/**
 * 当前浏览器是否为移动端浏览器
 */
export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
