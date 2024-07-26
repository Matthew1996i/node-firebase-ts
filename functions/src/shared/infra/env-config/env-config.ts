import "dotenv/config";

import { EnvConfig } from "./env-config.interface";

export class EnvConfiguration implements EnvConfig {
  getDocument(): string {
    return String(process.env.DATABASE_DOCUMENT);
  }
}
