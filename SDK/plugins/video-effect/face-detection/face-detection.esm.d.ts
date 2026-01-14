export interface FaceDetectionOptions {
  onFaceDetectionStateChanged: (hasFace: boolean) => void;
  detectionInterval?: number;
  minConfidence?: number;
  missingTimeout?: number;
}

export interface UpdateFaceDetectionOptions {
  onFaceDetectionStateChanged?: (hasFace: boolean) => void;
  detectionInterval?: number;
  minConfidence?: number;
  missingTimeout?: number;
}

export declare class FaceDetection {
  static isSupported(): boolean;
  start(options: FaceDetectionOptions): Promise<void>;
  update(options: UpdateFaceDetectionOptions): Promise<void>;
  stop(): Promise<void>;
}

export default FaceDetection;
