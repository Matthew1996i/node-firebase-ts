import { container } from "tsyringe";

import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { FunctionUseCase } from "../../../shared/application/useCases/FunctionUseCase";
import { EventContext } from "firebase-functions/v1";
import { IncrementIdUseCase } from "../../application/useCases/firestore/incrementIdUseCase";

export class IncrementIdFunction
  implements FunctionUseCase<QueryDocumentSnapshot, EventContext>
{
  async execute(snap: QueryDocumentSnapshot) {
    try {
      const collection = container.resolve(IncrementIdUseCase);

      await collection.execute(snap);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }
}
