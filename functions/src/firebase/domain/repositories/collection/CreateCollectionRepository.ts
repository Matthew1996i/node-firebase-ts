import { BadRequestError } from "../../../../shared/application/errors/bad-request-error";
import { AdminProvider } from "../../../application/provider/Admin/AdminProvider";
import { CollectionProps } from "./dtos";
import { ICreateCollectionRepository } from "./ICreateCollectionRepository";

class CreateCollectionRepository implements ICreateCollectionRepository {
  async create(props: CollectionProps): Promise<void> {
    const { name } = props;

    if (!name) throw new BadRequestError("Name not Provided");

    const db = new AdminProvider();

    await db.execute().collection("users").add({ name, createdAt: new Date() });
  }
}

export { CreateCollectionRepository };
