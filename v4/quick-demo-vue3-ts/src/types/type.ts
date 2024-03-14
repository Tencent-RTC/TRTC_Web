export interface ClientOptions {
  sdkAppId: number;
  userId: string;
  roomId: number;
  SDKSecretKey?: string;
  userSig?: string;
}
export type DeviceItem = Record<string, any>;
