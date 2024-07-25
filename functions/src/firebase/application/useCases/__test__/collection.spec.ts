/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";

import { container } from "tsyringe";
import { CollectionUseCase } from "../firestore/collectionUseCase";
import { CreateCollectionRepository } from "@/firebase/domain/repositories/collection/CreateCollectionRepository";
import { ICreateCollectionRepository } from "@/firebase/domain/repositories/collection/ICreateCollectionRepository";
import { BadRequestError } from "../../../../shared/application/errors/bad-request-error";

describe("CollectionUseCase unit test", () => {
  let sut: CollectionUseCase;

  beforeEach(() => {
    container.registerSingleton<ICreateCollectionRepository>(
      "CreateCollectionRepository",
      CreateCollectionRepository
    );

    sut = container.resolve(CollectionUseCase);
  });

  it("Should throw error when name not provided", async () => {
    await expect(() => sut.execute({ name: null as any })).rejects.toThrow(
      new BadRequestError("Name not Provided")
    );
  });
});
