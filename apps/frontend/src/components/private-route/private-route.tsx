import { UserRole } from "@guitar-shop/shared-types";
import { useAppSelector } from "../../hooks";
import { LoginPage } from "../../pages/login-page/login-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";

type PrivateRouteProps = {
  children: JSX.Element,
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const user = useAppSelector(( {userReducer}) => userReducer.user);

  if (user && user.userRole === UserRole.Admin) {
    return children;
  }

  if (user && user.userRole === UserRole.User) {
    return <NotFoundPage />
  }

  return <LoginPage />
}
