import { CollectionProps } from "./dtos";

export interface ICreateCollectionRepository {
  create(data: CollectionProps): Promise<void>;
}
