export interface ClientOptions {
  sdkAppId: number;
  userId: string;
  strRoomId: string;
  sdkSecretKey?: string;
  userSig?: string;
}
export type DeviceItem = Record<string, any>;
