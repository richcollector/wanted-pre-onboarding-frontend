import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useAuthTodo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/signin");
    }
  }, []);
}

export function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/todo");
    }
  }, []);
}
