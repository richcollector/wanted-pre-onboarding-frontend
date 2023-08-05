import { lazy } from "react";

const Layout = lazy(() => import("../layouts/Layout"));
const SignUp = lazy(() => import("../pages/signup/Singup"));
const SignIn = lazy(() => import("../pages/signin/Singin"));
const Todo = lazy(() => import("../pages/todo/Todo"));
const Main = lazy(() => import("../pages/main/Main"));

const ThemeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/todo", element: <Todo /> },
    ],
  },
];

export default ThemeRoutes;
