import * as functions from "firebase-functions";

import "./shared/application/containers";

import { FireStoreFunction } from "./shared/infra/functions";
import { IncrementIdFunction } from "./firebase/infrastructure/controllers/incrementId.function";

const fireStoreFunction = functions.https.onRequest((req, res) => {
  new FireStoreFunction().execute(req, res);
});

const onDataCreatedFunction = functions.firestore
  .document("/users/{documentId}")
  .onCreate(async (snap) => {
    new IncrementIdFunction().execute(snap);
  });

export { fireStoreFunction, onDataCreatedFunction };
