/* eslint-disable*/

function genTestUserSig({ sdkAppId, userId, secretKey }) {

  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SECRETKEY = secretKey;

  // a soft reminder to guide developer to configure sdkAppId/secretKey
  if (SDKAPPID === '' || SECRETKEY === '') {
    alert(
      'Please configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
