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
    // 아래 정규식은
    // (?=.*[A-Z])   -> 최소 1개 이상의 대문자,
    // (?=.*\d)      -> 최소 1개 이상의 숫자,
    // (?=.*[!@#$%^&*]) -> 최소 1개 이상의 특수문자 (여기서는 !@#$%^&* 만 허용),
    // [A-Za-z\d!@#$%^&*]+ -> 전체 문자는 영문자, 숫자, 그리고 !@#$%^&* 만 사용 가능함을 의미합니다.
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      "비밀번호는 대문자, 숫자, 특수문자를 최소 1개 이상 포함해야 하며, 영문자, 숫자, 특수문자만 사용 가능합니다."
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수입니다.'),

  tosAgree: yup
    .boolean()
    .oneOf([true], "서비스 이용약관에 동의해 주세요."),
  
  privacyAgree: yup
    .boolean()
    .oneOf([true], "개인정보 처리방침에 동의해 주세요.")
});

export default loginSchema;