/* eslint-disable */
interface Login {
  sdkAppId: number;
  userId: string;
  SDKSecretKey: string;
}

interface UserSig {
  userSig: string;
  sdkAppId: number;
}

export function genTestUserSig({ sdkAppId, userId, SDKSecretKey }: Login): UserSig {
  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SDK_SECRETKEY = SDKSecretKey;

  // a soft reminder to guide developer to configure sdkAppId/SDKSecretKey
  if (SDKAPPID == undefined || SDK_SECRETKEY === '') {
    alert(
      '请先配置好您的账号信息： SDKAPPID 及 SDK_SECRETKEY ' +
      '\r\n\r\nPlease configure your SDKAPPID/SDK_SECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new (<any>window).LibGenerateTestUserSig(SDKAPPID, SDK_SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
