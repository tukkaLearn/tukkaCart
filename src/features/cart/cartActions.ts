import type { Product } from "../../types/product";

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number };
