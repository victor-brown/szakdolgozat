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
}
