export interface FunctionUseCase<Snap, Context> {
  execute(snap: Snap, context: Context): Promise<unknown>;
}
