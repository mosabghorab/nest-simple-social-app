import { randomBytes } from 'crypto';

export abstract class Helpers {
  // extract token from header.
  static extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers?.['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  // generate unique file name.
  static generateUniqueFileName(originalName: string): string {
    const timestamp: number = Date.now();
    const randomString: string = randomBytes(8).toString('hex');
    const fileExtension: string = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${fileExtension}`;
  }
}
