import { IIncrementIdCollectionRepository } from "./IIncrementIdCollectionRepository";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { AdminProvider } from "../../../application/provider/Admin/AdminProvider";
import { UserDataDTO } from "./dtos";

class IncrementIdCollectionRepository
  implements IIncrementIdCollectionRepository
{
  async increment(snap: QueryDocumentSnapshot): Promise<void> {
    const db = await new AdminProvider();
    const users: UserDataDTO[] = [];
    let incrementedId: number;

    const usersRefSnapshot = await db
      .execute()
      .collection("users")
      .orderBy("createdAt", "asc")
      .get();

    usersRefSnapshot.forEach((doc) => {
      users.push(doc.data() as UserDataDTO);
    });

    if (!users.length || !users[users.length - 2]?.incremented_id) {
      incrementedId = 1;
    } else {
      incrementedId = users[users.length - 2].incremented_id + 1;
    }

    await snap.ref.set({ incremented_id: incrementedId }, { merge: true });
  }
}

export { IncrementIdCollectionRepository };
