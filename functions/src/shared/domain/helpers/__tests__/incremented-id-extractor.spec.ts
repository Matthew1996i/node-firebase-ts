// import { NotFoundError } from "@/shared/application/errors/not-found-error";
import { IdExtractor } from "../incremented-id-extractor";

type StubProps = {
  name?: string;
  id?: number | null;
};

class StubExtractor extends IdExtractor<StubProps> {}

describe("IdExtractor unit tests", () => {
  let sut: StubExtractor;

  beforeEach(() => {
    sut = new StubExtractor();
  });

  it("Should return error when not provided data", async () => {
    await expect(sut.extract([], "id")).toEqual("Data not provided or empty");
  });

  it("Should return error when not provided field", async () => {
    await expect(sut.extract([{ name: "faker" }], "")).toEqual(
      "Field not provided"
    );
  });

  it("Should return 1 when field not in object data", async () => {
    await expect(sut.extract([{ name: "faker" }], "teste")).toEqual(1);
  });

  it("Should return last id + 1, ignoring the last object created", async () => {
    await expect(
      sut.extract([{ name: "faker", id: 1 }, { name: "faker" }], "id")
    ).toEqual(2);
  });
});
