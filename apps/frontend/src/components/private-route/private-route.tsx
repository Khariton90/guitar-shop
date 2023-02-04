import { Navigate } from "react-router-dom";
import { AppRoute, AuthStatus } from "../../consts";
import { useAppSelector } from "../../hooks";

type PrivateRouteProps = {
  children: JSX.Element
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const autorizationStatus = useAppSelector(({ userReducer }) => userReducer.autorizationStatus);

  if (autorizationStatus === AuthStatus.Auth) {
    return children;
  }

  return <Navigate to={AppRoute.Login} />
}