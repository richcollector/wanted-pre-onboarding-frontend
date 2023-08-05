import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { config } from "../../service/api";
import { schema } from "./Signin.validation";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import * as S from "../../common/styles/Sing.styles";

export default function SignIn() {
  useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data: any) => {
    return axios
      .post(`/auth/signin`, data, config)
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

  return (
    <>
      <S.SignWrapper>
        <S.SignBox>
          <S.SignLink to={"/signup"}>회원가입</S.SignLink>
        </S.SignBox>
        <S.LogoBox>
          <S.ImgBox src="/logo.png" />
          <S.ToDoTile>SignIn Page</S.ToDoTile>
        </S.LogoBox>
        <S.Form onSubmit={handleSubmit(onClickSubmit)}>
          <S.InputBox>
            <S.Input
              data-testid="email-input"
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            <S.ErrorBox>{formState.errors.email?.message}</S.ErrorBox>
            <S.Input
              data-testid="password-input"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
            />
            <S.ErrorBox>{formState.errors.password?.message}</S.ErrorBox>
          </S.InputBox>
          <S.LogBox>
            <S.LogBtn
              data-testid="signin-button"
              style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
              disabled={!formState.isValid}
              type="submit"
            >
              로그인하기
            </S.LogBtn>
          </S.LogBox>
        </S.Form>
      </S.SignWrapper>
    </>
  );
}
