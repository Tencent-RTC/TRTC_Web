export interface ClientOptions {
  sdkAppId: number;
  userId: string;
  roomId: number;
  sdkSecretKey?: string;
  userSig?: string;
}
export type DeviceItem = Record<string, any>;
