/*
  회원가입 페이지
*/

import * as S from "../../common/styles/Sing.styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "common/hooks/useAuth";
import { useState } from "react";
import { useSigns } from "common/hooks/useSigns";

export default function SignUp() {
  // access_token 값 검사 후 이동체크
  useAuth();

  // 유효성 검사 후 로그인 button 활성화 체크
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  // 입력 값 저장
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // 에러 값 저장
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  //hook 모음집
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
