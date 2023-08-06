import * as S from "../../common/styles/Sing.styles";
import axios, { config } from "../../service/api";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "common/hooks/useAuth";
import { useState } from "react";
import { useSigns } from "common/hooks/useSigns";

export default function SignUp() {
  useAuth();
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const { onChangeInput, onClickSubmitSignUp } = useSigns({
    input,
    setInput,
    setIsValid,
    setErrorMessage,
  });

  return (
    <>
      <S.SignWrapper>
        <S.SignBox>
          <S.SignLink to={"/signin"}>로그인</S.SignLink>
        </S.SignBox>
        <S.LogoBox>
          <S.ImgBox src="/logo.png" />
          <S.ToDoTile>SignUp Page</S.ToDoTile>
        </S.LogoBox>
        <S.FormBox>
          <S.InputBox>
            <S.Input
              data-testid="email-input"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeInput}
              value={input.email}
            />
            <S.ErrorBox>{errorMessage.email}</S.ErrorBox>
            <S.Input
              data-testid="password-input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={onChangeInput}
              value={input.password}
            />
            <S.ErrorBox>{errorMessage.password}</S.ErrorBox>
          </S.InputBox>
          <S.LogBox>
            <S.LogBtn
              data-testid="signup-button"
              style={{
                backgroundColor:
                  isValid.email && isValid.password ? "yellow" : "",
              }}
              disabled={!isValid.email || !isValid.password}
              onClick={onClickSubmitSignUp}
            >
              회원가입하기
            </S.LogBtn>
          </S.LogBox>
        </S.FormBox>
      </S.SignWrapper>
    </>
  );
}
