import { type StringLiteral, stringLiteral } from "@babel/types";
import { StringLiteralTransformer } from "./StringLiteralTransformer";
import generate from "@babel/generator";

describe("StringLiteralTransformer", () => {
  let transformer: StringLiteralTransformer;
  beforeEach(() => {
    transformer = new StringLiteralTransformer();
  });

  it("transforms string value correctly", () => {
    const numLiteral: StringLiteral = stringLiteral("Test String");

    const transformedValue = transformer.transform(numLiteral);

    expect(generate(transformedValue).code).toEqual(
      "decodeAsciiArray(84, 101, 115, 116, 32, 83, 116, 114, 105, 110, 103)",
    );
  });
});
