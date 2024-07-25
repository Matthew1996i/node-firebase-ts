export class MethodRequestError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "Method Not Allowed";
  }
}
