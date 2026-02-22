import { NavLink } from "react-router-dom";
import "./Navbar.css";

type Props = {
  cartCount: number;
  isLoggedIn: boolean;
};

export default function Navbar({ cartCount, isLoggedIn }: Props) {
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
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </div>

      <div className="auth">
        {isLoggedIn ? (
          <NavLink to="/profile" className="btn">
            Profile
          </NavLink>
        ) : (
          <NavLink to="/login" className="btn">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
