import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface IIncrementIdCollectionRepository {
  increment(snap: QueryDocumentSnapshot): Promise<void>;
}
