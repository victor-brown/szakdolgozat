import {
  type BooleanLiteral,
  type Expression,
  type BinaryExpression,
} from "@babel/types";
import { type Transformer } from "../Transformer";
import { getFalseExpression, getTrueExpression } from "../Decoders";
import { SourceCodeParser } from "src/ProtectorService/moduls/ParserModule";

export class BooleanLiteralTransformer implements Transformer {
  parser = new SourceCodeParser();

  transform(node: BooleanLiteral): Expression {
    const expression: BinaryExpression = node.value
      ? this.getTrueExpression()
      : this.getFalseExpression();

    return expression;
  }

  getTrueExpression(): BinaryExpression {
    return this.parser.nodeBuilder(getTrueExpression());
  }

  getFalseExpression(): BinaryExpression {
    return this.parser.nodeBuilder(getFalseExpression());
  }
}
