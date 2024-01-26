import {
  type VariableDeclaration,
  type NumericLiteral,
  type BooleanLiteral,
  type StringLiteral,
  type Expression,
  type Statement,
} from "@babel/types";
import { type TransformModule } from "./TransformModule";
import { StringLiteralTransformer } from "./transformers/LiteralTransformers/StringLiteralTransformer";
import { NumericLiteralTransformer } from "./transformers/LiteralTransformers/NumericLiteralTransformer";
import { BooleanLiteralTransformer } from "./transformers/LiteralTransformers/BooleanLiteralTransformer";

export interface NodeVisitor {
  visitVariableDeclaration: (
    node: VariableDeclaration
  ) => Expression | Statement;
  visitNumericLiteral: (node: NumericLiteral) => Expression | Statement;
  visitBooleanLiteral: (node: BooleanLiteral) => Expression | Statement;
  visitStringLiteral: (node: StringLiteral) => Expression | Statement;
  setTransformModule: (transformModule: TransformModule) => void;
}

export class BasicNodeVisitor implements NodeVisitor {
  transformModule!: TransformModule;

  setTransformModule(transformModule: TransformModule): void {
    this.transformModule = transformModule;
  }

  visitVariableDeclaration(node: VariableDeclaration): Expression | Statement {
    console.log("Transforming a VariableDeclaration...");
    if (node.declarations.length !== 1 || !node.declarations[0].init) {
      throw new Error(`Bad declaration ${node.start}`);
    }

    node.declarations[0].init = this.transformModule.transformSingle(
      node.declarations[0].init
    ) as Expression;
    return node;
  }

  visitNumericLiteral(node: NumericLiteral): Expression | Statement {
    console.log("Transforming a NumericLiteral...");

    return new NumericLiteralTransformer().transform(node);
  }

  visitBooleanLiteral(node: BooleanLiteral): Expression | Statement {
    console.log("Transforming a BooleanLiteral...");

    return new BooleanLiteralTransformer().transform(node);
  }

  visitStringLiteral(node: StringLiteral): Expression | Statement {
    console.log("Transforming a StringLiteral...");

    return new StringLiteralTransformer().transform(node);
  }
}
