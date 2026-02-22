import { useCart } from "../features/cart/useCart";
import "./Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} />

            <div className="info">
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>

            <div className="qty">
              <button onClick={() => decreaseQty(item.id)}>−</button>

              <span>{item.qty}</span>

              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>

            <button className="remove" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <h3>Total: ${total.toFixed(2)}</h3>

        <button className="clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
