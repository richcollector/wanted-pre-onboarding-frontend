import { lazy } from "react";

const Layout = lazy(() => import("../layouts/Layout"));
const SignUp = lazy(() => import("../pages/signup/Singup"));
const SignIn = lazy(() => import("../pages/signin/Singin"));
const Main = lazy(() => import("../pages/main/Main"));

const ThemeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
];

export default ThemeRoutes;
