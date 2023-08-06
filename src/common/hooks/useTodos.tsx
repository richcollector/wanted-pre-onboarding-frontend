/*
  To-Do List 필요한 hook 모음
*/

import axios from "../../service/api";
import { Modal } from "antd";
import { IData, IProps } from "pages/todo/Todo.types";
import { useNavigate } from "react-router";

export const useTodos = (props: IProps) => {
  const navigate = useNavigate();

  // 토큰 값 가져오기
  const access_token = localStorage.getItem("access_token");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/json",
    },
  };
  const { todo } = props;

  // To-Do를 추가하는 API 호출
  const onClickCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!todo) return;

    axios
      .post(`/todos`, { todo }, tokenConfig)
      .then((res) => {
        props.setTodo("");
        props.setChange(!props.change);
      })
      .catch((err) => {
        Modal.error({
          title: "This is an error message",
          content: "등록에 실패하였습니다.",
        });
      });
  };

  // 새로운 To-Do 입력 값 세팅
  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTodo(event.currentTarget.value);
  };

  // 수정 input 입력 시 저장 되는 곳
  const todoup = {
    todo: "",
    isCompleted: false,
  };

  // 이미 입력된 To-Do의 수정 값 세팅
  const onChangeUpdateTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    todoup.todo = event.currentTarget.value;
  };

  // 완료된 To-Do CheckBox 선택 시 수정 값 세팅 및 수정 API 호출
  const onChangeUpdate =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updateTodo: IData[] = props.data?.filter(
        (el: IData) => el.id === id
      );

      todoup.isCompleted = !updateTodo[0].isCompleted;
      todoup.todo = updateTodo[0].todo;

      axios
        .put(`/todos/${id}`, todoup, tokenConfig)
        .then((res) => {
          props.setChange(!props.change);
        })
        .catch((err) => {
          Modal.error({
            title: "This is an error message",
            content: "수정에 실패하였습니다.",
          });
        });
    };

  // To-Do 수정 API 호출
  const onClickUpdate =
    (id: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      if (props.edit === id) {
        if (!todoup.todo) {
          props.setEdit(0);
          return;
        }
        axios
          .put(`/todos/${id}`, todoup, tokenConfig)
          .then((res) => {
            props.setEdit(0);
            props.setChange(!props.change);
          })
          .catch((err) => {
            Modal.error({
              title: "This is an error message",
              content: "수정에 실패하였습니다.",
            });
          });
      } else if (props.edit !== id) {
        props.setEdit(id);
      }
    };

  // To-Do 삭제 API 호출
  const onClickDelete =
    (id: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      if (props.edit === id) {
        props.setEdit(0);
      } else if (props.edit !== id) {
        axios
          .delete(`/todos/${id}`, tokenConfig)
          .then((res) => {
            props.setChange(!props.change);
          })
          .catch((err) => {
            Modal.error({
              title: "This is an error message",
              content: "삭제에 실패하였습니다.",
            });
          });
      }
    };

  // 로그아웃 후 로그인 페이지로 리다이렉트
  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  return {
    onChangeTodo,
    onClickCreate,
    onChangeUpdateTodo,
    onChangeUpdate,
    onClickUpdate,
    onClickDelete,
    onClickLogout,
  };
};
