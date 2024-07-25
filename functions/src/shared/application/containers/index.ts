import "reflect-metadata";

import { container } from "tsyringe";

import { CreateCollectionRepository } from "../../../firebase/domain/repositories/collection/CreateCollectionRepository";
import { ICreateCollectionRepository } from "../../../firebase/domain/repositories/collection/ICreateCollectionRepository";

import { IncrementIdCollectionRepository } from "../../../firebase/domain/repositories/incrementedId/IncrementIdCollectionRepository";
import { IIncrementIdCollectionRepository } from "../../../firebase/domain/repositories/incrementedId/IIncrementIdCollectionRepository";

container.registerSingleton<ICreateCollectionRepository>(
  "CreateCollectionRepository",
  CreateCollectionRepository
);

container.registerSingleton<IIncrementIdCollectionRepository>(
  "IncrementIdCollectionRepository",
  IncrementIdCollectionRepository
);
