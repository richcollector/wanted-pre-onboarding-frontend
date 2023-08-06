/*
  Layout 페이지 
*/

import * as S from "./Layout.styles";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <S.Container>
        <S.Wrapper>
          <Outlet />
        </S.Wrapper>
      </S.Container>
    </>
  );
}
