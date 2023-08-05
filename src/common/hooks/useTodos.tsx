import axios from "../../service/api";
import { Modal } from "antd";
import { IData, IProps } from "pages/todo/Todo.types";
import { useNavigate } from "react-router-dom";

export const useTodos = (props: IProps) => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/json",
    },
  };
  const { todo } = props;

  const todoup = {
    todo: "",
    isCompleted: false,
  };

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

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTodo(event.currentTarget.value);
  };

  const onChangeUpdateTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    todoup.todo = event.currentTarget.value;
  };

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
