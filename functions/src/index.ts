import * as functions from "firebase-functions";

import "./shared/application/containers";

import { FireStoreFunction } from "./shared/infra/functions";
import { IncrementIdFunction } from "./firebase/infrastructure/controllers/incrementId.function";
import { EnvConfiguration } from "./shared/infra/env-config/env-config";

const environment = new EnvConfiguration();

const fireStoreFunction = functions.https.onRequest((req, res) => {
  new FireStoreFunction().execute(req, res);
});

const onDataCreatedFunction = functions.firestore
  .document(`/${environment.getDocument()}/{documentId}`)
  .onCreate(async (snap) => {
    new IncrementIdFunction().execute(snap);
  });

export { fireStoreFunction, onDataCreatedFunction };
