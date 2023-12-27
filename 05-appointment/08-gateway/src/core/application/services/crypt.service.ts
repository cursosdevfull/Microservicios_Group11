import * as bcrypt from "bcryptjs";

export class CryptService {
  static async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  static async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
