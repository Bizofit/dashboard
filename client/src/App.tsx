import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/DashboardNew";
import AuthCallback from "./pages/AuthCallback";
import CompanySetup from "./pages/CompanySetup";
import ProfileSetup from "./pages/ProfileSetup";
import IndividualDashboard from "./pages/IndividualDashboard";
import CompaniesPage from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import ProductsPage from "./pages/Products";
import AddProductPage from "./pages/AddProduct";
import EditProductPage from "./pages/EditProduct";
import ViewProductPage from "./pages/ViewProduct";
import JobsPage from "./pages/Jobs";
import PostJobPage from "./pages/PostJob";
import JobDetailPage from "./pages/JobDetail";
import EditJobPage from "./pages/EditJob";
import ProjectsPage from "./pages/Projects";
import CandidatesPage from "./pages/Candidates";
import TimesheetsPage from "./pages/Timesheets";
import InvoicesPage from "./pages/Invoices";
import TeamPage from "./pages/Team";
import SettingsPage from "./pages/Settings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/companies" component={CompaniesPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/products/add" component={AddProductPage} />
        <Route path="/products/:productId/edit">
          {(params) => <EditProductPage productId={params.productId} />}
        </Route>
        <Route path="/products/:productId/view">
          {(params) => <ViewProductPage productId={params.productId} />}
        </Route>
        <Route path="/jobs" component={JobsPage} />
        <Route path="/post-job" component={PostJobPage} />
        <Route path="/jobs/:jobId/edit" component={EditJobPage} />
        <Route path="/jobs/:jobId" component={JobDetailPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/candidates" component={CandidatesPage} />
        <Route path="/timesheets" component={TimesheetsPage} />
        <Route path="/invoices" component={InvoicesPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/auth/callback" component={AuthCallback} />
        <Route path="/company-setup" component={CompanySetup} />
        <Route path="/profile-setup" component={ProfileSetup} />
        <Route path="/individual-dashboard" component={IndividualDashboard} />
        <Route path="/companies/:companyId">
          {(params) => <CompanyDetails companyId={params.companyId} />}
        </Route>
        <Route path="/company/:companyId">
          {(params) => <CompanyDetails companyId={params.companyId} />}
        </Route>
        <Route>
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
              <a
                href="/dashboard"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
