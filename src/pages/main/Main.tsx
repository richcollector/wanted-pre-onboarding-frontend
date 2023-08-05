import { useNavigate } from "react-router-dom";
import * as S from "./Main.styles";

export default function Main() {
  const navigate = useNavigate();

  const onClickMove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.currentTarget.id === "signin") navigate("/signin");
    else if (event.currentTarget.id === "signup") navigate("/signup");
  };

  return (
    <>
      <S.MainBox>
        <S.LogoBox>
          <S.ImgBox src="/logo.png"></S.ImgBox>
        </S.LogoBox>
        <S.BtnBox>
          <S.Btn id="signin" onClick={onClickMove}>
            로그인하기
          </S.Btn>
          <S.Btn id="signup" onClick={onClickMove}>
            회원가입
          </S.Btn>
        </S.BtnBox>
      </S.MainBox>
    </>
  );
}
