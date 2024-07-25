import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { IIncrementIdCollectionRepository } from "../../../domain/repositories/incrementedId/IIncrementIdCollectionRepository";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

@injectable()
export class IncrementIdUseCase {
  constructor(
    @inject("IncrementIdCollectionRepository")
    private incrementIdCollectionRepository: IIncrementIdCollectionRepository
  ) {}

  async execute(snap: QueryDocumentSnapshot): Promise<void> {
    await this.incrementIdCollectionRepository.increment(snap);
  }
}
