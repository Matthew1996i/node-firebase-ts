import "reflect-metadata";
import { container } from "tsyringe";

import { Response } from "firebase-functions/v1";
import { Request } from "firebase-functions/v1/https";
import { HttpsFunctionUseCase } from "../../../shared/application/useCases/HttpsFunctionUseCase";
import { CollectionUseCase } from "../../application/useCases/firestore/collectionUseCase";
import { MethodRequestError } from "../../../shared/application/errors/method-error";

export class FireStoreFunction
  implements HttpsFunctionUseCase<Request, Response>
{
  async execute(req: Request, res: Response) {
    try {
      if (req.method !== "POST")
        throw new MethodRequestError("Method Not Allowed");

      const data = req.body;
      const collection = container.resolve(CollectionUseCase);

      await collection.execute(data);

      res.status(200).send({ status: 200, message: "data created" });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).send(error);
    }
  }
}
