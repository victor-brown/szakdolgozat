import { type Expression, type Statement } from "@babel/types";
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
    nodes: Array<Expression | Statement>
  ): Array<Expression | Statement> {
    return nodes.map((node) => {
      node = this.traverseSourceTree(node);

      return node;
    });
  }

  transformSingle(node: Expression | Statement): Expression | Statement {
    node = this.traverseSourceTree(node);
    return node;
  }

  private traverseSourceTree(
    node: Expression | Statement
  ): Expression | Statement {
    switch (node.type) {
      case "VariableDeclaration":
        return this.visitor.visitVariableDeclaration(node);
      case "NumericLiteral":
        return this.visitor.visitNumericLiteral(node);
      case "BooleanLiteral":
        return this.visitor.visitBooleanLiteral(node);
      case "StringLiteral":
        return this.visitor.visitStringLiteral(node);
      default:
        return node;
    }
  }
}
