import { parse } from "@babel/parser";
import { type File } from "@babel/types";

export class SourceCodeParser {
  createSyntaxTree(sourceCode: string): File {
    try {
      return parse(sourceCode);
    } catch (error) {
      throw new Error("Failed to parse soruce code");
    }
  }

  nodeBuilder(sourceCode: string): any {
    try {
      const ast = parse(sourceCode);

      if (!ast.program.body?.[0]) {
        throw new Error("Missing program body");
      }

      return ast.program.body[0];
    } catch (error) {
      throw new Error("Failed to parse soruce code");
    }
  }
}
