import * as yup from "yup";
export const schema = yup.object({
  email: yup.string().email("이메일 형식에 적합하지 않습니다."),
  password: yup.string().min(8, "비밀번호는 최소 8자리 이상 입력해주세요."),
});
