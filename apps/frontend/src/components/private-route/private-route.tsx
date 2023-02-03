import { useState } from "react"
import { Navigate } from "react-router-dom";
import { AppRoute } from "../../consts";

type PrivateRouteProps = {
  children: JSX.Element
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const [authStatus, setAuthStatus] = useState(false);

  if (authStatus) {
    return children;
  }

  return <Navigate to={AppRoute.Login} />
}