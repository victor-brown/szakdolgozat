import {
  identifier,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import { SourceCodeParser } from "./ParserModule";
import * as babelParser from "@babel/parser";

jest.mock("@babel/parser");
describe("ParserModule", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const parser: SourceCodeParser = new SourceCodeParser();

  it("should createSyntaxTree", () => {
    const validCode = "const test='testString';";
    const expectedSyntaxTree = variableDeclaration("const", [
      variableDeclarator(identifier("test"), stringLiteral("testString")),
    ]);

    (babelParser.parse as jest.Mock).mockReturnValue(expectedSyntaxTree);

    const result = parser.createSyntaxTree(validCode);

    expect(result).toEqual(expectedSyntaxTree);
    expect(babelParser.parse).toHaveBeenCalledWith(validCode);
  });

  it("createSyntaxTree should return error", () => {
    const sourceCode = "notvalid";

    (babelParser.parse as jest.Mock).mockImplementation(() => {
      throw Error("Failed to parse soruce code");
    });

    expect(() => parser.createSyntaxTree(sourceCode)).toThrow();

    expect(babelParser.parse).toHaveBeenCalledWith(sourceCode);
  });

  it("nodeBuilder should return error", () => {
    const sourceCode = "notvalid";

    (babelParser.parse as jest.Mock).mockImplementation(() => {
      throw Error("Failed to parse soruce code");
    });

    expect(() => parser.nodeBuilder(sourceCode)).toThrow();

    expect(babelParser.parse).toHaveBeenCalledWith(sourceCode);
  });
});
