/*
  access_token을 이용한 리다이렉트 hook모음
*/

import { useEffect } from "react";
import { useNavigate } from "react-router";

//To-Do 페이지에 access_token 토큰 없이 접근하면 로그인 페이지로 리다이렉트
export function useAuthTodo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/signin");
    }
  }, []);
}

//To-Do 페이지가 아닌, 페이지에 access_token이 있는 상태로 접근하면 todo로 리다이렉트
export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/todo");
    }
  }, []);
}
