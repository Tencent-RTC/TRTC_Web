export interface DeviceDetectorOptions {
  networkDetect?: {
    sdkAppId: number,
    roomId?: number,
    userId: string,
    userSig: string,
    downlinkUserId?: string,
    downlinkUserSig?: string
  }
}

export interface DeviceDetectorResult {
  camera: { isSuccess: boolean, device: MediaDeviceInfo };
  microphone: { isSuccess: boolean, device: MediaDeviceInfo };
  speaker: { isSuccess: boolean, device: MediaDeviceInfo };
  network: { isSuccess: boolean, result: { quality: number, rtt: number } };
}

// export { DeviceDetectorOptions, DeviceDetectorResult };

export declare class DeviceDetector {
  start(options: DeviceDetectorOptions): Promise<DeviceDetectorResult | undefined>;
  stop():Promise<void>;
}

export default DeviceDetector;
