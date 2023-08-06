/*
  Router 모음집 
*/

import { lazy } from "react";

// 동적으로 불러오기 위한 lazy 사용
const Layout = lazy(() => import("../layouts/Layout"));
const SignUp = lazy(() => import("../pages/signup/Singup"));
const SignIn = lazy(() => import("../pages/signin/Singin"));
const Todo = lazy(() => import("../pages/todo/Todo"));
const Main = lazy(() => import("../pages/main/Main"));
const Error = lazy(() => import("../pages/error/Error"));

// 페이지 값 세팅
const ThemeRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/todo", element: <Todo /> },
      { path: "*", element: <Error /> },
    ],
  },
];

export default ThemeRoutes;
