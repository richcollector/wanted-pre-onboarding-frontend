import { lazy } from "react";

const Layout = lazy(() => import("../layouts/Layout"));
const SignUp = lazy(() => import("../pages/signup/Singup"));
const Main = lazy(() => import("../pages/main/Main"));

const ThemeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
];

export default ThemeRoutes;
