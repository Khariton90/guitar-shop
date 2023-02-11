import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import Footer from "../footer/footer";
import Header from "../header/header";

export function Layout(): JSX.Element {
  const productsCountToCart = useAppSelector(({cartReducer}) => cartReducer.cart);
  const user = useAppSelector(({userReducer}) => userReducer.user);

  return (
   <div className="wrapper">
    <Header productsCountToCart={productsCountToCart.length} user={user}/>
    <Outlet />
    <Footer />
   </div>
  );
}
