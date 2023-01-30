import { Outlet } from "react-router-dom";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export function Layout(): JSX.Element {
  return (
   <div className="wrapper">
    <Header />
    <Outlet />
    <Footer />
   </div>
  );
}
