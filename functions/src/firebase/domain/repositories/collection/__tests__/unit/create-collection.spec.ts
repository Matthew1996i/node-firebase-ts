import { BadRequestError } from "@/shared/application/errors/bad-request-error";
import { CreateCollectionRepository } from "../../CreateCollectionRepository";
import { CollectionProps } from "../../dtos";

class CollectionStub extends CreateCollectionRepository {}

describe("CreateCollectionRepository unit test", () => {
  let stub: CreateCollectionRepository;

  beforeEach(() => {
    stub = new CollectionStub();
  });

  it("Should be defined", () => {
    expect(stub).toBeDefined();
  });

  it("Should throw error when dont recieved name", () => {
    expect(stub.create({} as CollectionProps)).rejects.toThrow(
      new BadRequestError("Name not Provided")
    );
  });
});
