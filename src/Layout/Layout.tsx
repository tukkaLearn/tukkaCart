import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import "./Layout.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <Navbar />

      <main className="content">{children}</main>

      <footer className="footer">
        <p> Made with ❤️ || सीता राम जी ||</p>
        <p>© tukka cart 2026</p>
        <p>|| राम नाम सत्य है ||</p>
      </footer>
    </div>
  );
}
