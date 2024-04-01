import {
  type LVal,
  type OptionalMemberExpression,
  type Expression,
  type Statement,
  type ArgumentPlaceholder,
  type JSXNamespacedName,
  type SpreadElement,
  type V8IntrinsicIdentifier,
  type PrivateName,
} from "@babel/types";
import { type NodeVisitor } from "./NodeVisitor";

export class TransformModule {
  visitor: NodeVisitor;

  constructor(visitor: NodeVisitor) {
    this.visitor = visitor;
  }

  getVisitor(): NodeVisitor {
    return this.visitor;
  }

  transform(
    nodes: Array<
      | Expression
      | Statement
      | OptionalMemberExpression
      | LVal
      | SpreadElement
      | JSXNamespacedName
      | ArgumentPlaceholder
      | V8IntrinsicIdentifier
      | PrivateName
    >,
  ): Array<
    | Expression
    | Statement
    | OptionalMemberExpression
    | LVal
    | SpreadElement
    | JSXNamespacedName
    | ArgumentPlaceholder
    | V8IntrinsicIdentifier
    | PrivateName
  > {
    return nodes.map((node) => {
      try {
        node = this.traverseSourceTree(node);
      } catch (error) {
        throw new Error(`Failed to traverse ${node.type}`);
      }
      return node;
    });
  }

  transformSingle(
    node:
      | Expression
      | Statement
      | OptionalMemberExpression
      | LVal
      | SpreadElement
      | JSXNamespacedName
      | ArgumentPlaceholder
      | V8IntrinsicIdentifier
      | PrivateName,
  ):
    | Expression
    | Statement
    | OptionalMemberExpression
    | LVal
    | SpreadElement
    | JSXNamespacedName
    | ArgumentPlaceholder
    | V8IntrinsicIdentifier
    | PrivateName {
    try {
      node = this.traverseSourceTree(node);
    } catch (error) {
      throw new Error(`Failed to traverse ${node.type}`);
    }
    return node;
  }

  private traverseSourceTree(
    node:
      | Expression
      | Statement
      | OptionalMemberExpression
      | LVal
      | SpreadElement
      | JSXNamespacedName
      | ArgumentPlaceholder
      | V8IntrinsicIdentifier
      | PrivateName,
  ):
    | Expression
    | Statement
    | OptionalMemberExpression
    | LVal
    | SpreadElement
    | JSXNamespacedName
    | ArgumentPlaceholder
    | V8IntrinsicIdentifier
    | PrivateName {
    switch (node.type) {
      case "VariableDeclaration":
        return this.visitor.visitVariableDeclaration(node);
      case "NumericLiteral":
        return this.visitor.visitNumericLiteral(node);
      case "BooleanLiteral":
        return this.visitor.visitBooleanLiteral(node);
      case "StringLiteral":
        return this.visitor.visitStringLiteral(node);
      case "FunctionDeclaration":
        return this.visitor.visitFunctionDeclaration(node);
      case "ForStatement":
        return this.visitor.visitForStatement(node);
      case "IfStatement":
        return this.visitor.visitIfStatement(node);
      case "BlockStatement":
        return this.visitor.visitBlockStatement(node);
      case "WhileStatement":
        return this.visitor.visitWhileStatement(node);
      case "ForOfStatement":
        return this.visitor.visitForOfStatement(node);
      case "DoWhileStatement":
        return this.visitor.visitDoWhileStatement(node);
      case "ExpressionStatement":
        return this.visitor.visitExpressionStatement(node);
      case "ReturnStatement":
        return this.visitor.visitReturnStatement(node);
      case "LogicalExpression":
        return this.visitor.visitLogicalExpression(node);
      case "CallExpression":
        return this.visitor.visitCallExpression(node);
      case "BinaryExpression":
        return this.visitor.visitBinaryExpression(node);
      case "UnaryExpression":
        return this.visitor.visitUnaryExpression(node);
      case "AssignmentExpression":
        return this.visitor.visitAssignmentExpression(node);
      case "ArrayExpression":
        return this.visitor.visitArrayExpression(node);

      default:
        return node;
    }
  }
}
