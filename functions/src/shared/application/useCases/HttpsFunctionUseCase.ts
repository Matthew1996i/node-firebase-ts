export interface HttpsFunctionUseCase<Request, Response> {
  execute(req: Request, res: Response): Promise<unknown>;
}
