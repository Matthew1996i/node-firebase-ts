import * as admin from "firebase-admin";
import { IAdminProvider } from "./IAdminProvider";

admin.initializeApp();

export class AdminProvider implements IAdminProvider {
  execute(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}
