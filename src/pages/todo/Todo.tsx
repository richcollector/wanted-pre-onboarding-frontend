import axios from "../../service/api";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAuthTodo } from "../../common/hooks/useAuth";
import * as S from "./Todo.styles";
import { IData } from "./Todo.types";
import { useTodos } from "common/hooks/useTodos";

export default function Todo() {
  useAuthTodo();
  const access_token = localStorage.getItem("access_token");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/json",
    },
  };

  const [data, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [edit, setEdit] = useState(0);
  const [todo, setTodo] = useState("");

  const {
    onChangeTodo,
    onChangeUpdateTodo,
    onChangeUpdate,
    onClickCreate,
    onClickDelete,
    onClickUpdate,
    onClickLogout,
  } = useTodos({ todo, setTodo, change, setChange, edit, setEdit, data });

  useEffect(() => {
    if (access_token) {
      axios
        .get(`/todos`, tokenConfig)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          Modal.error({
            title: "This is an error message",
            content: "등록에 실패하였습니다.",
          });
        });
    }
  }, [change]);

  return (
    <>
      <S.TodoBox>
        <S.LogoutBox>
          <S.LogoutBtn onClick={onClickLogout}>로그아웃</S.LogoutBtn>
        </S.LogoutBox>
        <S.LogoBox>
          <S.ImgBox src="/logo.png" />
          <S.ToDoTile>To-Do List</S.ToDoTile>
        </S.LogoBox>
        <S.InputBox>
          <S.InsertInput
            data-testid="new-todo-input"
            onChange={onChangeTodo}
            value={todo}
            type="text"
          />
          <S.InputBtn data-testid="new-todo-add-button" onClick={onClickCreate}>
            추가
          </S.InputBtn>
        </S.InputBox>
        <S.ListBox>
          {data.map((el: IData) => (
            <S.ListItem key={el.id}>
              <S.ItemLi>
                <S.ItemLabel>
                  <S.ItemCheckBox
                    onChange={onChangeUpdate(el.id)}
                    defaultChecked={el.isCompleted}
                    type="checkbox"
                  />
                  {edit === el.id ? (
                    <S.ItemInput
                      data-testid="modify-input"
                      onChange={onChangeUpdateTodo}
                      defaultValue={el.todo}
                      type="text"
                    />
                  ) : (
                    <S.ItemSpan>{el.todo}</S.ItemSpan>
                  )}
                </S.ItemLabel>
                {edit === el.id ? (
                  <S.ItemBtn
                    data-testid="submit-button"
                    onClick={onClickUpdate(el.id)}
                  >
                    제출
                  </S.ItemBtn>
                ) : (
                  <S.ItemBtn
                    data-testid="modify-button"
                    onClick={onClickUpdate(el.id)}
                  >
                    수정
                  </S.ItemBtn>
                )}
                {edit === el.id ? (
                  <S.ItemBtn
                    data-testid="cancel-button"
                    onClick={onClickDelete(el.id)}
                  >
                    취소
                  </S.ItemBtn>
                ) : (
                  <S.ItemBtn
                    data-testid="delete-button"
                    onClick={onClickDelete(el.id)}
                  >
                    삭제
                  </S.ItemBtn>
                )}
              </S.ItemLi>
            </S.ListItem>
          ))}
        </S.ListBox>
      </S.TodoBox>
    </>
  );
}
