import {
  type Expression,
  callExpression,
  identifier,
  type NumericLiteral,
  numericLiteral,
  type StringLiteral,
} from "@babel/types";
import { type Transformer } from "../Transformer";
import { ASCII_DECODER_FUNCTION_NAME } from "../Decoders";

export class StringLiteralTransformer implements Transformer {
  transform(node: StringLiteral): Expression {
    const newNode = callExpression(
      identifier(ASCII_DECODER_FUNCTION_NAME),
      this.stringEncoder(node.value)
    );

    return newNode;
  }

  private stringEncoder(value: string): NumericLiteral[] {
    const asciiValues: NumericLiteral[] = [];

    for (const c of value) {
      asciiValues.push(numericLiteral(c.charCodeAt(0)));
    }

    return asciiValues;
  }
}
