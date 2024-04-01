import {
  type VariableDeclaration,
  type NumericLiteral,
  type BooleanLiteral,
  type StringLiteral,
  type Expression,
  type Statement,
  type FunctionDeclaration,
  type ForStatement,
  type IfStatement,
  type BlockStatement,
  type WhileStatement,
  type ForOfStatement,
  type DoWhileStatement,
  type ExpressionStatement,
  type ReturnStatement,
  type LogicalExpression,
  type CallExpression,
  type BinaryExpression,
  type UnaryExpression,
  type AssignmentExpression,
  type ArrayExpression,
  type LVal,
  type OptionalMemberExpression,
  type PrivateName,
  type ArgumentPlaceholder,
  type JSXNamespacedName,
  type SpreadElement,
  type V8IntrinsicIdentifier,
} from "@babel/types";
import { type TransformModule } from "./TransformModule";
import { StringLiteralTransformer } from "./transformers/LiteralTransformers/StringLiteralTransformer";
import { NumericLiteralTransformer } from "./transformers/LiteralTransformers/NumericLiteralTransformer";
import { BooleanLiteralTransformer } from "./transformers/LiteralTransformers/BooleanLiteralTransformer";

export interface NodeVisitor {
  visitVariableDeclaration: (
    node: VariableDeclaration,
  ) => Expression | Statement;
  visitNumericLiteral: (node: NumericLiteral) => Expression | Statement;
  visitBooleanLiteral: (node: BooleanLiteral) => Expression | Statement;
  visitStringLiteral: (node: StringLiteral) => Expression | Statement;
  setTransformModule: (transformModule: TransformModule) => void;
  visitFunctionDeclaration: (
    node: FunctionDeclaration,
  ) => Expression | Statement;
  visitForStatement: (node: ForStatement) => Expression | Statement;
  visitIfStatement: (node: IfStatement) => Expression | Statement;
  visitBlockStatement: (node: BlockStatement) => Expression | Statement;
  visitWhileStatement: (node: WhileStatement) => Expression | Statement;
  visitForOfStatement: (node: ForOfStatement) => Expression | Statement;
  visitDoWhileStatement: (node: DoWhileStatement) => Expression | Statement;
  visitExpressionStatement: (
    node: ExpressionStatement,
  ) => Expression | Statement;
  visitReturnStatement: (node: ReturnStatement) => Expression | Statement;
  visitLogicalExpression: (node: LogicalExpression) => Expression | Statement;
  visitCallExpression: (node: CallExpression) => Expression | Statement;
  visitBinaryExpression: (node: BinaryExpression) => Expression | Statement;
  visitUnaryExpression: (node: UnaryExpression) => Expression | Statement;
  visitAssignmentExpression: (
    node: AssignmentExpression,
  ) => Expression | Statement;
  visitArrayExpression: (node: ArrayExpression) => Expression | Statement;
}

export class BasicNodeVisitor implements NodeVisitor {
  transformModule!: TransformModule;

  setTransformModule(transformModule: TransformModule): void {
    this.transformModule = transformModule;
  }

  visitVariableDeclaration(node: VariableDeclaration): Expression | Statement {
    console.log("Transforming a VariableDeclaration...");
    if (node.declarations.length !== 1) {
      throw new Error(`Bad declaration ${node.start}`);
    }

    if (node.declarations[0].init)
      node.declarations[0].init = this.transformModule.transformSingle(
        node.declarations[0].init,
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

  visitFunctionDeclaration(node: FunctionDeclaration): Expression | Statement {
    console.log("Transforming a FunctionDeclaration...");

    return this.transformModule.transformSingle(node.body) as Expression;
  }

  visitForStatement(node: ForStatement): Expression | Statement {
    console.log("Transforming a ForStatement...");

    if (node.init)
      node.init = this.transformModule.transformSingle(node.init) as Expression;
    if (node.test)
      node.test = this.transformModule.transformSingle(node.test) as Expression;
    if (node.update)
      node.update = this.transformModule.transformSingle(
        node.update,
      ) as Expression;

    node.body = this.transformModule.transformSingle(node.body) as Statement;

    return node;
  }

  visitIfStatement(node: IfStatement): Expression | Statement {
    console.log("Transforming an IfStatement...");

    node.test = this.transformModule.transformSingle(node.test) as Expression;
    node.consequent = this.transformModule.transformSingle(
      node.consequent,
    ) as Statement;

    return node;
  }

  visitBlockStatement(node: BlockStatement): Expression | Statement {
    console.log("Transforming a FunctionDeclaration...");

    node.body = this.transformModule.transform(node.body) as Statement[];
    return node;
  }

  visitWhileStatement(node: WhileStatement): Expression | Statement {
    console.log("Transforming a WhileStatement...");

    node.test = this.transformModule.transformSingle(node.test) as Expression;
    node.body = this.transformModule.transformSingle(node.body) as Statement;

    return node;
  }

  visitForOfStatement(node: ForOfStatement): Expression | Statement {
    console.log("Transforming a ForOfStatement...");

    node.right = this.transformModule.transformSingle(node.right) as Expression;
    console.log("AAAAAAAAAAAAA");
    node.left = this.transformModule.transformSingle(node.left) as
      | VariableDeclaration
      | LVal;
    console.log("BBBBBBBBBBBBBBBBB");
    node.body = this.transformModule.transformSingle(node.body) as Statement;
    console.log("CCCCCCCCCCCCC");
    return node;
  }

  visitDoWhileStatement(node: DoWhileStatement): Expression | Statement {
    console.log("Transforming a DoWhileStatement...");

    node.test = this.transformModule.transformSingle(node.test) as Expression;
    node.body = this.transformModule.transformSingle(node.body) as Statement;

    return node;
  }

  visitExpressionStatement(node: ExpressionStatement): Expression | Statement {
    console.log("Transforming an ExpressionStatement...");

    node.expression = this.transformModule.transformSingle(
      node.expression,
    ) as Expression;
    return node;
  }

  visitReturnStatement(node: ReturnStatement): Expression | Statement {
    console.log("Transforming an ReturnStatement...");

    if (node.argument)
      node.argument = this.transformModule.transformSingle(
        node.argument,
      ) as Expression;

    return node;
  }

  visitLogicalExpression(node: LogicalExpression): Expression | Statement {
    console.log("Transforming a LogicalExpression...");

    node.left = this.transformModule.transformSingle(node.left) as Expression;
    node.right = this.transformModule.transformSingle(node.right) as Expression;

    return node;
  }

  visitCallExpression(node: CallExpression): Expression | Statement {
    console.log("Transforming a CallExpression...");

    node.arguments = this.transformModule.transform(node.arguments) as Array<
      Expression | SpreadElement | JSXNamespacedName | ArgumentPlaceholder
    >;
    node.callee = this.transformModule.transformSingle(node.callee) as
      | Expression
      | V8IntrinsicIdentifier;

    return node;
  }

  visitBinaryExpression(node: BinaryExpression): Expression | Statement {
    console.log("Transforming a LogicalExpression...");

    node.left = this.transformModule.transformSingle(node.left) as
      | Expression
      | PrivateName;
    node.right = this.transformModule.transformSingle(node.right) as Expression;

    return node;
  }

  visitUnaryExpression(node: UnaryExpression): Expression | Statement {
    console.log("Transforming an UnaryExpression...");

    node.argument = this.transformModule.transformSingle(
      node.argument,
    ) as Expression;

    return node;
  }

  visitAssignmentExpression(
    node: AssignmentExpression,
  ): Expression | Statement {
    console.log("Transforming an AssignmentExpression...");

    node.left = this.transformModule.transformSingle(node.left) as
      | OptionalMemberExpression
      | LVal;

    node.right = this.transformModule.transformSingle(node.right) as Expression;
    return node;
  }

  visitArrayExpression(node: ArrayExpression): Expression | Statement {
    console.log("Transforming an ArrayExpression...");

    if (node.elements)
      node.elements = this.transformModule.transform(
        node.elements as Array<Expression | SpreadElement>,
      ) as Array<Expression | SpreadElement | null>;

    return node;
  }
}
