import type { ReactNode } from "react";
import Navbar from "../Navbar";
import "./Layout.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Navbar cartCount={2} isLoggedIn={false} />

      <main className="content">{children}</main>

      <footer className="footer">
        © tukka cart 2026 . All rights reserved.
      </footer>
    </div>
  );
}
