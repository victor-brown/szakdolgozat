import { type NumericLiteral, numericLiteral } from "@babel/types";
import { NumericLiteralTransformer } from "./NumericLiteralTransformer";
import generate from "@babel/generator";

describe("NumericLiteralTransformer", () => {
  let transformer: NumericLiteralTransformer;
  beforeEach(() => {
    transformer = new NumericLiteralTransformer();
  });

  it("transforms positive value correctly", () => {
    const numLiteral: NumericLiteral = numericLiteral(15);

    const transformedValue = transformer.transform(numLiteral);

    expect(generate(transformedValue).code).toEqual("0xf");
  });

  it("transforms decimal value correctly", () => {
    const numLiteral: NumericLiteral = numericLiteral(15.5);

    const transformedValue = transformer.transform(numLiteral);

    expect(generate(transformedValue).code).toEqual('parseFractial("f.8")');
  });
});
