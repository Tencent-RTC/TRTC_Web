type Algorithm = 'AES-GCM' | 'AES-128-GCM' | 'AES-256-GCM' | 'SM4';

interface CustomCryptors {
  encryptor: Cryptor;
  decryptor: Cryptor;
}

type Cryptor = (data: Uint8Array) => Uint8Array;
interface BuiltinOptions {
  algorithm: Algorithm;
  secretKey: Uint8Array;
  salt?: Uint8Array;
}

interface EncryptionOptions {
  // 自定义：传 customCryptors；内置：传后三个参数
  customCryptors?: CustomCryptors;
  builtinOptions?: BuiltinOptions;
  mode: 'webrtc' | 'udt3';
  audio: boolean;
  video: boolean;
}

declare class CustomEncryption {
  start(options: EncryptionOptions): Promise<void>;
  update(options: EncryptionOptions): Promise<void>;
  stop(options: EncryptionOptions): Promise<void>;
}

export { CustomEncryption, EncryptionOptions, Cryptor, Algorithm };
export default CustomEncryption;
