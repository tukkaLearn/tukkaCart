import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../features/cart/useCart";
import { useAuth } from "../features/auth/useAuth";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { cart } = useCart();
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img src="/tkcart.svg" alt="tukka cart" width="80" />
      </NavLink>

      <div className="links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/products" className="link">
          Products
        </NavLink>
        <NavLink to="/cart" className="link">
          Cart{" "}
          <span className="badge">
            {cart.reduce((a, i) => a + i.quantity, 0)}
          </span>
        </NavLink>
      </div>

      <div className="auth">
        {!user ? (
          <Link to="/login" className="btn">
            Login
          </Link>
        ) : (
          <>
            <Link to="/profile" className="btn">
              Profile
            </Link>
            <button onClick={logout} className="btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
