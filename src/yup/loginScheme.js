import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일을 입력해주세요.")
    .required("이메일은 필수 입력입니다."),
  password: yup
    .string()
    .required("비밀번호는 필수 입력입니다.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 20자 이하이어야 합니다.")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      "비밀번호는 대문자, 숫자, 특수문자를 최소 1개 이상 포함해야 하며, 영문자, 숫자, 특수문자만 사용 가능합니다."
    )
});

export default loginSchema;