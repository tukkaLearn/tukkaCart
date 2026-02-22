import type { CartAction, CartItem } from "./cartActions";

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.payload.id);

      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);

    case "INCREASE":
      return state.map((i) =>
        i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
      );

    case "DECREASE":
      return state
        .map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0);

    default:
      return state;
  }
}
