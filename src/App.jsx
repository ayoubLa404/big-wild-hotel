import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import NewUsers from './pages/Users';
import GlobalStyle from './GlobalStyled';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'cabins', element: <Cabins /> },
      { path: 'users', element: <NewUsers /> },
      { path: 'settings', element: <Settings /> },
      { path: 'account', element: <Account /> },
    ],
  },
  ////////////not in AppLayout
  { path: 'login', element: <Login /> },
  { path: '*', element: <PageNotFound /> },
]);

export default function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}
