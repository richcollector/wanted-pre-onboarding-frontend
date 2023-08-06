/*
  To-Do List 페이지
*/

import axios from "../../service/api";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useAuthTodo } from "../../common/hooks/useAuth";
import * as S from "./Todo.styles";
import { IData } from "./Todo.types";
import { useTodos } from "common/hooks/useTodos";

export default function Todo() {
  // access_token 값 검사 후 이동체크
  useAuthTodo();

  // access_token 값 가져오기
  const access_token = localStorage.getItem("access_token");
  const tokenConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-type": "application/json",
    },
  };

  // To-Do List 값
  const [data, setData] = useState([]);

  // 필요 시 렌더링 해주는 값
  const [change, setChange] = useState(true);

  // To-Do List Check ID 저장
  const [edit, setEdit] = useState(0);

  // To-Do 추가 입력 값
  const [todo, setTodo] = useState("");

  // To-Do List hooks 모음
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
              <li style={{ width: "100%", textAlign: "center" }}>
                <label>
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
                </label>
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
              </li>
            </S.ListItem>
          ))}
        </S.ListBox>
      </S.TodoBox>
    </>
  );
}
