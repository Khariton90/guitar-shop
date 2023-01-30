import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { AppRoute } from '../consts';
import { MainPage } from '../pages/main-page/main-page';
import { LoginPage } from '../pages/login-page/login-page';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route path={AppRoute.Main} element={<MainPage />}/>
        <Route path={AppRoute.Login} element={<LoginPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
