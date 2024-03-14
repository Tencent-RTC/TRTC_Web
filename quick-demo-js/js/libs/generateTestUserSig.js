/* eslint-disable*/

function genTestUserSig({ sdkAppId, userId, sdkSecretKey }) {

  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SDKSECRETKEY = sdkSecretKey;

  // a soft reminder to guide developer to configure sdkAppId/SDKSecretKey
  if (SDKAPPID === '' || SDKSECRETKEY === '') {
    alert(
      'Please configure your SDKAPPID/SDKSECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new LibGenerateTestUserSig(SDKAPPID, SDKSECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
