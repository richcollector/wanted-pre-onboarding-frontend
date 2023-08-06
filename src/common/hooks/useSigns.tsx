/*
  회원가입 / 로그인 시 필요한 hook 모음
*/

import axios, { config } from "../../service/api";
import { Modal } from "antd";
import { IProps } from "common/types/Sign.types";
import { useNavigate } from "react-router-dom";

export const useSigns = (props: IProps) => {
  const navigate = useNavigate();

  // 이메일, 비밀번호 입력 시 값 저장
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    props.setInput((prev) => ({ ...prev, [type]: value }));
    isCheck(type, value);
  };

  // 이메일(@), 비밀번호(8자리이상) 유효성에 맞는지 검사
  const isCheck = (type: string, value: string) => {
    if (type === "email") {
      const emailRegex = /^.+@+.+$/;
      props.setIsValid((prev) => ({ ...prev, email: emailRegex.test(value) }));
      if (!emailRegex.test(value)) {
        props.setErrorMessage((prev) => ({
          ...prev,
          email: "이메일 형식을 지켜주세요.",
        }));
      } else {
        props.setErrorMessage((prev) => ({
          ...prev,
          email: "",
        }));
      }
    } else if (type === "password") {
      props.setIsValid((prev) => ({ ...prev, password: value.length >= 8 }));
      if (value.length < 8) {
        props.setErrorMessage((prev) => ({
          ...prev,
          password: "비밀번호를 8글자 이상입력해주세요.",
        }));
      } else {
        props.setErrorMessage((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  // 로그인 API호출
  const onClickSubmitLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    axios
      .post(`/auth/signin`, props.input, config)
      .then((res) => {
        const access_token = res.data?.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/todo");
      })
      .catch((err) => {
        Modal.error({
          title: "This is an error message",
          content: "로그인 정보가 틀렸습니다.",
        });
      });
  };

  // 회원가입 API 호출
  const onClickSubmitSignUp = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    return axios
      .post(`/auth/signup`, props.input, config)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        Modal.error({
          title: "This is an error message",
          content: "존재하는 아이디 입니다.",
        });
      });
  };

  return {
    onChangeInput,
    onClickSubmitLogin,
    onClickSubmitSignUp,
  };
};
