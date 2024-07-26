import { IncrementedIdExtractor } from "./incremented-id-extractor.interface";

export class IdExtractor<T extends object>
  implements IncrementedIdExtractor<T>
{
  extract(data: T[], field: string): number | string {
    if (!data.length) return "Data not provided or empty";
    if (!field) return "Field not provided";

    data.splice(data.length - 1, 1);

    const lastData = data[data.length - 1];

    if (!lastData || !Object.hasOwnProperty.call(lastData, field)) {
      return Number(1);
    }
    const fieldValue = data[data.length - 1][field];

    return Number(fieldValue) + 1;
  }
}
