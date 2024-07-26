import { EnvConfiguration } from "@/shared/infra/env-config/env-config";
import { BadRequestError } from "../../../../shared/application/errors/bad-request-error";
import { AdminProvider } from "../../../application/provider/Admin/AdminProvider";
import { CollectionProps } from "./dtos";
import { ICreateCollectionRepository } from "./ICreateCollectionRepository";

class CreateCollectionRepository implements ICreateCollectionRepository {
  async create(props: CollectionProps): Promise<void> {
    const environment = new EnvConfiguration();
    const { name } = props;

    if (!name) throw new BadRequestError("Name not Provided");

    const db = new AdminProvider();

    await db
      .execute()
      .collection(environment.getDocument())
      .add({ name, createdAt: new Date() });
  }
}

export { CreateCollectionRepository };
