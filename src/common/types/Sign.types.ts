/*
  로그인 / 로그아웃시 공통된 type 모음
*/

export interface IProps {
  input: {
    email: string;
    password: string;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}
