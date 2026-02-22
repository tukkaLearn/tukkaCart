import { createContext, useEffect, useReducer, type ReactNode } from "react";
import { cartReducer } from "../features/cart/cartReducer";
import type { CartItem, CartAction } from "../features/cart/cartActions";

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
