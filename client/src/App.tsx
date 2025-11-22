import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/auth/callback" component={AuthCallback} />
        <Route>
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
