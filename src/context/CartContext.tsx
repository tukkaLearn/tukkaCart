import { createContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../features/auth/useAuth";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartMap = Record<string, CartItem[]>;

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  /* ---- store ALL users carts ---- */
  const [carts, setCarts] = useState<CartMap>(() => {
    const stored = localStorage.getItem("carts");
    return stored ? JSON.parse(stored) : {};
  });

  /* ---- persist carts ---- */
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  /* ---- DERIVED CART (NO STATE) ---- */
  const cart: CartItem[] = user ? carts[user.email] || [] : [];

  function addToCart(item: Omit<CartItem, "qty">) {
    console.log(item);
    if (!user) return;

    setCarts((prev) => {
      const userCart = prev[user.email] || [];

      const exist = userCart.find((p) => p.id === item.id);

      const updatedCart = exist
        ? userCart.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
        : [...userCart, { ...item, qty: 1 }];

      return {
        ...prev,
        [user.email]: updatedCart,
      };
    });
  }

  function removeFromCart(id: number) {
    if (!user) return;

    setCarts((prev) => ({
      ...prev,
      [user.email]: (prev[user.email] || []).filter((p) => p.id !== id),
    }));
  }

  function clearCart() {
    if (!user) return;

    setCarts((prev) => ({
      ...prev,
      [user.email]: [],
    }));
  }

  function increaseQty(id: number) {
    if (!user) return;

    setCarts((prev) => {
      const updated = (prev[user.email] || []).map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      );

      return { ...prev, [user.email]: updated };
    });
  }

  function decreaseQty(id: number) {
    if (!user) return;

    setCarts((prev) => {
      const updated = (prev[user.email] || [])
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0);

      return { ...prev, [user.email]: updated };
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
