/* eslint-disable */
interface Login {
  sdkAppId: number;
  userId: string;
  sdkSecretKey: string;
}

interface UserSig {
  userSig: string;
  sdkAppId: number;
}

export function genTestUserSig({ sdkAppId, userId, sdkSecretKey }: Login): UserSig {
  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SDKSECRETKEY = sdkSecretKey;

  // a soft reminder to guide developer to configure sdkAppId/sdkSecretKey
  if (SDKAPPID == undefined || SDKSECRETKEY === '') {
    alert(
      '请先配置好您的账号信息： SDKAPPID 及 SDKSECRETKEY ' +
      '\r\n\r\nPlease configure your SDKAPPID/SDKSECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new (<any>window).LibGenerateTestUserSig(SDKAPPID, SDKSECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
