import "reflect-metadata";
import { ICreateCollectionRepository } from "../../../domain/repositories/collection/ICreateCollectionRepository";
import { inject, injectable } from "tsyringe";
import { CollectionProps } from "../../../domain/repositories/collection/dtos";

@injectable()
export class CollectionUseCase {
  constructor(
    @inject("CreateCollectionRepository")
    private createCollectionRepository: ICreateCollectionRepository
  ) {}

  async execute(data: CollectionProps): Promise<void> {
    await this.createCollectionRepository.create(data);
  }
}
