import {
  type BooleanLiteral,
  type Expression,
  type BinaryExpression,
} from "@babel/types";
import { type Transformer } from "../Transformer";
import {
  getFalseExpression,
  getTrueExpression,
  nodeBuilder,
} from "../Decoders";

export class BooleanLiteralTransformer implements Transformer {
  transform(node: BooleanLiteral): Expression {
    const expression: BinaryExpression = node.value
      ? this.getTrueExpression()
      : this.getFalseExpression();

    return expression;
  }

  getTrueExpression(): BinaryExpression {
    return nodeBuilder(getTrueExpression());
  }

  getFalseExpression(): BinaryExpression {
    return nodeBuilder(getFalseExpression());
  }
}
