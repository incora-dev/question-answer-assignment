import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PATHS } from '@constants/paths';
import { ErrorPage, LoginPage, QuestionsPage } from '@pages';
import { IState } from '@store/types';
import { ILoginState } from '@store/login';

const routes = (isLoggedIn: boolean) => [
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.LOGIN,
        element: isLoggedIn ? <Navigate to="/" /> : <LoginPage />,
      },
      {
        path: PATHS.HOME,
        element: isLoggedIn ? <QuestionsPage /> : <Navigate to="/login" />,
      },
    ],
  },
];


export function Router() {
  const { isLoggedIn } = useSelector<IState, ILoginState>(({ login }) => login);

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <>
      {routing}
    </>
  );
}
