export interface IAdminProvider {
  execute(): FirebaseFirestore.Firestore;
}
