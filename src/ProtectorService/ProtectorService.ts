import { type File } from "@babel/types";
import { SourceCodeParser } from "./moduls/ParserModule";
import { TransformModule } from "./moduls/TransformModule/TransformModule";
import { BasicNodeVisitor } from "./moduls/TransformModule/NodeVisitor";
import generate from "@babel/generator";
import {
  ASCII_DECODER_FUNCTION,
  FRACTIAL_NUMBER_PARSER_FUNCTION,
  nodeBuilder,
} from "./moduls/TransformModule/transformers/Decoders";

export class ProtectorService {
  parser = new SourceCodeParser();
  visitor = new BasicNodeVisitor();
  transformer = new TransformModule(this.visitor);

  syntaxTree: File | undefined;

  protect(sourceCode: string): void {
    this.setup();

    this.syntaxTree = this.parser.createSyntaxTree(sourceCode);
    console.log("==========PROTECTING==========");

    this.syntaxTree.program.body = this.transformer.transform(
      this.syntaxTree.program.body
    ) as any;

    this.addDecodersToBody();
  }

  generateSourceCode(): string {
    if (!this.syntaxTree) throw new Error("Don't have syntax tree");

    return generate(this.syntaxTree).code;
  }

  private setup(): void {
    this.visitor.setTransformModule(this.transformer);
  }

  private addDecodersToBody(): void {
    if (!this.syntaxTree) throw new Error("Don't have syntax tree");

    const stringDecoder = nodeBuilder(ASCII_DECODER_FUNCTION);
    const fractionalDecoder = nodeBuilder(FRACTIAL_NUMBER_PARSER_FUNCTION);
    this.syntaxTree.program.body.push(stringDecoder);
    this.syntaxTree.program.body.push(fractionalDecoder);
  }
}
