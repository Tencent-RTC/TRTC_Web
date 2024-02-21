/* eslint-disable */
interface Login {
  sdkAppId: number;
  userId: string;
  secretKey: string;
}

interface UserSig {
  userSig: string;
  sdkAppId: number;
}

export function genTestUserSig({ sdkAppId, userId, secretKey }: Login): UserSig {
  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SECRETKEY = secretKey;

  // a soft reminder to guide developer to configure sdkAppId/secretKey
  if (SDKAPPID == undefined || SECRETKEY === '') {
    alert(
      '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
      '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new (<any>window).LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
