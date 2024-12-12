import crypto from 'crypto';
import KSUID from 'ksuid';
import { v4 as uuidv4 } from 'uuid';

export class CryptoUtils {
  private static algorithm = 'aes-256-cbc';

  /**
   * Converts a string from Base64 to a Buffer.
   * @param base64 - The Base64-encoded string
   * @returns The decoded Buffer
   */
  private static base64ToBuffer(base64: string): Buffer {
    return Buffer.from(base64, 'base64');
  }

  static createRandomBytesStr(length = 16, type: 'UUID' | 'KSUID' = 'UUID'): string {
    const UUID = uuidv4();
    const now = Date.now();
    const payload = crypto.randomBytes(length);
    const nowKSUID = KSUID.fromParts(now, payload);

    return type === 'KSUID' ? nowKSUID.string : UUID;
  }

  static hashPassword(password: string): string {
    return crypto.createHash('sha512').update(password).digest('hex');
  }

  static checkPassword(inputPassword: string, storedHash: string): boolean {
    const inputHash = this.hashPassword(inputPassword);
    return inputHash === storedHash;
  }

  /**
   * Encrypts text using AES with the given session key and IV.
   * @param text - The text to encrypt
   * @param sessionKey - The AES session key as a string
   * @param iv - The initialization vector as a string (must be 16 bytes)
   * @returns The encrypted text as a hexadecimal string
   */
  static aesEncrypt(text: string, sessionKey: string, iv: string): string {
    // Convert session key and IV to buffers
    const keyBuffer = this.stringTo32BytesUsingHash(sessionKey);
    const ivBuffer = this.stringTo16BytesUsingHash(iv);

    const cipher = crypto.createCipheriv(this.algorithm, keyBuffer, ivBuffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  /**
   * Decrypts text using AES with the given session key and IV.
   * @param encryptedText - The text to decrypt
   * @param sessionKey - The AES session key as a string
   * @param iv - The initialization vector as a string (must be 16 bytes)
   * @returns The decrypted text as a string
   */
  static aesDecrypt(encryptedText: string, sessionKey: string, iv: string): string {
    const keyBuffer = this.stringTo32BytesUsingHash(sessionKey);
    const ivBuffer = this.stringTo16BytesUsingHash(iv);

    const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Converts a string to a 16-byte (128-bit) Buffer using MD5.
   * @param input - The input string to convert
   * @returns A 16-byte Buffer
   */
  static stringTo16BytesUsingHash(input: string): Buffer {
    return crypto.createHash('md5').update(input, 'utf8').digest();
  }

  /**
   * Converts a string to a 32-byte (256-bit) Buffer using SHA-256.
   * @param input - The input string to convert
   * @returns A 32-byte Buffer
   */
  static stringTo32BytesUsingHash(input: string): Buffer {
    return crypto.createHash('sha256').update(input, 'utf8').digest();
  }

  /**
   * Converts a string to a hashed hex string using the specified algorithm.
   * @param input - The input string to convert
   * @param algo - The hash algorithm to use ('sha256', 'md5', 'sha512')
   * @returns The hashed string as a hexadecimal string
   */
  static stringToHash(input: string, algo: 'sha256' | 'md5' | 'sha512' = 'sha256'): string {
    return crypto.createHash(algo).update(input, 'utf8').digest('hex');
  }

  static encryptSessionKey(publicKey: string, sessionKey: string): string {
    const encryptedSessionKey = crypto.publicEncrypt(publicKey, Buffer.from(sessionKey, 'utf8'));
    return encryptedSessionKey.toString('base64');
  }

  static decryptSessionKey(privateKey: string, encryptedSessionKey: string): string {
    const decryptedSessionKey = crypto.privateDecrypt(privateKey, Buffer.from(encryptedSessionKey, 'base64'));
    return decryptedSessionKey.toString('utf8');
  }

  static generateUserKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    const PUBLIC_KEY = publicKey.toString();
    const PRIVATE_KEY = privateKey.toString();

    return {
      PUBLIC_KEY,
      PRIVATE_KEY,
    };
  }

  static stringToBase64(input: string): string {
    const buffer = Buffer.from(input, 'utf8');
    return buffer.toString('base64');
  }

  static stringToBuffer(input: string): Buffer {
    return Buffer.from(input, 'utf8');
  }

  static decodeBase64(base64String: string): Buffer {
    return Buffer.from(base64String, 'base64');
  }

  static bufferToUtf8String(buffer: Buffer): string {
    return buffer.toString('utf-8');
  }
}
