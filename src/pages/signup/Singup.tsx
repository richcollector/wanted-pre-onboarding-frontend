import * as S from "../../common/styles/Sing.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { config } from "../../service/api";
import { schema } from "./Signup.validation";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data: any) => {
    const { passwordConfirm, ...finalData } = data;
    return axios
      .post(`/auth/signup`, finalData, config)
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
              data-testid="signup-button"
              style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
              disabled={!formState.isValid}
              type="submit"
            >
              회원가입하기
            </S.LogBtn>
          </S.LogBox>
        </S.Form>
      </S.SignWrapper>
    </>
  );
}
