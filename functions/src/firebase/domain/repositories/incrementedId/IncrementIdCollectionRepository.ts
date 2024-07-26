import { IIncrementIdCollectionRepository } from "./IIncrementIdCollectionRepository";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { AdminProvider } from "../../../application/provider/Admin/AdminProvider";
import { UserDataDTO } from "./dtos";
import { IdExtractor } from "../../../../shared/domain/helpers/incremented-id-extractor";

class IncrementIdCollectionRepository
  extends IdExtractor<UserDataDTO>
  implements IIncrementIdCollectionRepository
{
  async increment(snap: QueryDocumentSnapshot): Promise<void> {
    const db = await new AdminProvider();
    const users: UserDataDTO[] = [];

    const usersRefSnapshot = await db
      .execute()
      .collection("users")
      .orderBy("createdAt", "asc")
      .get();

    usersRefSnapshot.forEach((doc) => {
      users.push(doc.data() as UserDataDTO);
    });

    const incrementedId = this.extract(users, "incremented_id");

    await snap.ref.set({ incremented_id: incrementedId }, { merge: true });
  }
}

export { IncrementIdCollectionRepository };
