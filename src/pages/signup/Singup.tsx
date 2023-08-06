import * as S from "../../common/styles/Sing.styles";
import axios, { config } from "../../service/api";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "common/hooks/useAuth";
import { useState } from "react";

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

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    setInput((prev) => ({ ...prev, [type]: value }));
    isCheck(type, value);
  };

  const isCheck = (type: string, value: string) => {
    if (type === "email") {
      const emailRegex = /^.+@+.+$/;
      setIsValid((prev) => ({ ...prev, email: emailRegex.test(value) }));
      if (!emailRegex.test(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          email: "이메일 형식을 지켜주세요.",
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          email: "",
        }));
      }
    } else if (type === "password") {
      setIsValid((prev) => ({ ...prev, password: value.length >= 8 }));
      if (value.length < 8) {
        setErrorMessage((prev) => ({
          ...prev,
          password: "비밀번호를 8글자 이상입력해주세요.",
        }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  const onClickSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return axios
      .post(`/auth/signup`, input, config)
      .then((res) => {
        navigate("/signin");
        console.log("res::", res);
      })
      .catch((err) => {
        Modal.error({
          title: "This is an error message",
          content: "존재하는 아이디 입니다.",
        });
      });
  };

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
              onClick={onClickSubmit}
            >
              회원가입하기
            </S.LogBtn>
          </S.LogBox>
        </S.FormBox>
      </S.SignWrapper>
    </>
  );
}
