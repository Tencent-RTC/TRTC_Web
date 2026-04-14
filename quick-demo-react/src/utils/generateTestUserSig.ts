export function genTestUserSig({
  sdkAppId,
  userId,
  sdkSecretKey,
}: {
  sdkAppId: number;
  userId: string;
  sdkSecretKey: string;
}): { sdkAppId: number; userSig: string } {
  const EXPIRETIME = 604800;

  if (!sdkAppId || !sdkSecretKey) {
    console.error('Please configure your SDKAPPID/SDKSECRETKEY');
  }

  const generator = new (window as any).LibGenerateTestUserSig(sdkAppId, sdkSecretKey, EXPIRETIME);
  const userSig = generator.genTestUserSig(userId);

  return {
    sdkAppId,
    userSig,
  };
}
