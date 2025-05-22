export type HttpExceptionInstance = {
  statusCode: number;
  message: string | string[];
  error?: string;
};

export class HttpExceptionModel {
  readonly statusCode: number;
  private readonly message: string | string[];
  private readonly error?: string;

  constructor({ statusCode, message, error }: HttpExceptionInstance) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }

  getMessages() {
    if (Array.isArray(this.message)) return this.message.join(', ');
    return this.message ?? '';
  }

  getError() {
    if (this.error) return this.error;
    return Array.isArray(this.message) ? this.message[0] : this.message;
  }
}
