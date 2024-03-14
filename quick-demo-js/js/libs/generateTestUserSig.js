/* eslint-disable*/

function genTestUserSig({ sdkAppId, userId, SDKSecretKey }) {

  const SDKAPPID = sdkAppId;

  const EXPIRETIME = 604800;

  const SDK_SECRETKEY = SDKSecretKey;

  // a soft reminder to guide developer to configure sdkAppId/SDKSecretKey
  if (SDKAPPID === '' || SDK_SECRETKEY === '') {
    alert(
      'Please configure your SDKAPPID/SDK_SECRETKEY in js/debug/GenerateTestUserSig.js'
    );
  }
  const generator = new LibGenerateTestUserSig(SDKAPPID, SDK_SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig
  };
}
