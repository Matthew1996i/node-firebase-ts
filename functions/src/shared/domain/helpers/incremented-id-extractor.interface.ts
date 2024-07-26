export type FieldsErrors = {
  [field: string]: string[] | null;
};

export interface IncrementedIdExtractor<T> {
  extract(data: T[], field: string): number | string;
}
