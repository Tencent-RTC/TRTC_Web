export interface DeviceItem {
  deviceId: string;
  label: string;
  groupId?: string;
}

export interface LogItem {
  type: 'success' | 'failed';
  content: string;
}

export interface RemoteUser {
  userId: string;
  streamType: string;
  elementId: string;
}

export interface ClientOptions {
  sdkAppId: number;
  sdkSecretKey: string;
  userId: string;
  strRoomId: string;
}
