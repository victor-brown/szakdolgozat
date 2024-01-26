import { type Expression } from "@babel/types";

export interface Transformer {
  transform: (node: any) => Expression;
}
