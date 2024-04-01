import generate from "@babel/generator";
import { BooleanLiteralTransformer } from "./BooleanLiteralTransformer";
import {
  type BinaryExpression,
  type BooleanLiteral,
  booleanLiteral,
} from "@babel/types";
import { SourceCodeParser } from "../../../ParserModule";

describe("BooleanLiteralTransformer", () => {
  let transformer: BooleanLiteralTransformer;
  const parser: SourceCodeParser = new SourceCodeParser();
  beforeEach(() => {
    transformer = new BooleanLiteralTransformer();
  });

  it("transforms true literal to true expression", () => {
    const trueLiteral: BooleanLiteral = booleanLiteral(true);

    transformer.transform = jest
      .fn()
      .mockReturnValue(parser.nodeBuilder("undefined != typeof any;"));

    const transformedExpression: BinaryExpression = transformer.transform(
      trueLiteral,
    ) as BinaryExpression;

    expect(transformer.transform).toHaveBeenCalledWith(trueLiteral);
    expect(generate(transformedExpression).code).toEqual(
      "undefined != typeof any;",
    );
  });

  it("transforms false literal to false expression", () => {
    const falseLiteral: BooleanLiteral = booleanLiteral(false);

    transformer.transform = jest
      .fn()
      .mockReturnValue(parser.nodeBuilder("[] === undefined;"));

    const transformedExpression: BinaryExpression = transformer.transform(
      falseLiteral,
    ) as BinaryExpression;

    expect(transformer.transform).toHaveBeenCalledWith(falseLiteral);
    expect(generate(transformedExpression).code).toEqual("[] === undefined;");
  });
});
