import {
  callExpression,
  stringLiteral,
  type Expression,
  type NumericLiteral,
  identifier,
} from "@babel/types";
import { type Transformer } from "../Transformer";
import { FRACTIAL_NUMBER_PARSER_FUNCTION_NAME } from "../Decoders";

export class NumericLiteralTransformer implements Transformer {
  transform(node: NumericLiteral): Expression {
    if (node.value.toString().includes(".")) {
      const newNode = callExpression(
        identifier(FRACTIAL_NUMBER_PARSER_FUNCTION_NAME),
        [stringLiteral(node.value.toString(16))]
      );

      return newNode;
    }

    node.end = undefined;
    node.loc = undefined;
    node.extra = undefined;
    node.value = `0x${node.value.toString(16)}` as any;

    return node;
  }
}
