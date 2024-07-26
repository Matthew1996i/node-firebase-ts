import { EnvConfiguration } from "../env-config";

class StubEnvConfigurator extends EnvConfiguration {}

describe("EnvConfigService unit tests", () => {
  let sut: EnvConfiguration;

  beforeEach(() => {
    sut = new StubEnvConfigurator();
  });

  it("Should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should return the variable PORT", () => {
    expect(sut.getDocument()).toBe("users");
  });
});
