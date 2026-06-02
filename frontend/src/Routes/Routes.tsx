import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/user/Home";
import AboutUs from "../pages/user/AboutUs";
import Properties from "../pages/user/Properties";
import Services from "../pages/user/Services";
import Blogs from "../pages/user/Blogs";
import Wrapper from "../layout/User/Wrapper";
import ErrorBoundary from "../pages/ErrorBoundary";
import Contact from "../pages/user/Contact";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import AdminWrapper from "../layout/admin/AdminWrapper";
import Dashboard from "../pages/admin/Dashboard";
import PublicRoute from "../components/PublicRoute";
import AdminRoute from "../components/AdminRoute";
import UserDashboard from "../pages/user/UserDashboard";
import Wishlist from "../pages/user/Wishlist";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NotFound from "../pages/NotFound";
import OnGoingProject from "../pages/user/OnGoingProject";
import PropertyById from "../pages/user/PropertyById";
import AgentById from "../pages/user/AgentById";
import UserDashboardWrapper from "../layout/userDashboard/UserDashboardWrapper";
import MyBookings from "../pages/user/MyBookings";
import MyInquiries from "../pages/user/MyInquiries";
import SavedProperties from "../pages/user/SavedProperties";
import Notification from "../pages/user/Notification";
import UserProtectedRoute from "../components/UserProtectedRoute";
import LogedInUserDashboard from "../pages/user/LogedInUserDashboard";

const Routes = createBrowserRouter([
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Navigate to="/signup/user" replace />,
      },
      {
        path: "/signup/user",
        element: <Signup />,
      },
      {
        path: "/signup/agent",
        element: <Signup />,
      },
      {
        path: "/signup/super-admin",
        element: <Signup />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
    ],
  },

  {
    path: "/",
    element: <Wrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      {
        path: "property",
        element: <Properties />,
        errorElement: <ErrorBoundary />,
      },
      { path: "service", element: <Services /> },
      { path: "blog", element: <Blogs /> },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "ongoingProject",
        element: <OnGoingProject />,
      },
      {
        path: "property/:id",
        element: <PropertyById />,
      },
      {
        path: "agent",
        element: <AgentById />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <UserProtectedRoute />,
    children: [
      {
        element: <UserDashboardWrapper />,
        children: [
          {
            path: "",
            element: <LogedInUserDashboard />,
          },
          {
            path: "myBookings",
            element: <MyBookings />,
          },
          {
            path: "myInquiries",
            element: <MyInquiries />,
          },
          {
            path: "savedProperties",
            element: <SavedProperties />,
          },
          {
            path: "notifications",
            element: <Notification />,
          },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default Routes;
