/// <reference types="vite/client" />

interface LibGenerateTestUserSigClass {
  new (sdkAppId: number, sdkSecretKey: string, expireTime: number): {
    genTestUserSig(userId: string): string;
  };
}

declare const LibGenerateTestUserSig: LibGenerateTestUserSigClass;

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
