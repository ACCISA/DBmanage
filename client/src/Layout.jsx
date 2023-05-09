import { Outlet } from "react-router-dom";
import Header from './components/Header';

export default function Layout() {
  return (
    <main>
      <Header className="relative" />
      <Outlet />
    </main>
  );
}