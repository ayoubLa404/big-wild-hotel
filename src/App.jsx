import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
import { Toaster } from 'react-hot-toast';

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

const queryClient = new QueryClient({
  defaultOptions: {
    // this is the time btw 2 fetch (btw 2 stale data) in ms
    queries: { staleTime: 0 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <RouterProvider router={router} />
      {/* toaster easy notifications */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
