'use client';
import { useForm } from "react-hook-form";
import api from "@/axios/axiosConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import signupScheme from "@/yup/signupScheme";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupScheme),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/account/v1/auth/token/registration", data);
      if (response.status === 201) {
        alert("회원가입에 성공하셨습니다.");
        window.location.href = "https://cote.nossi.dev";
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 430) {
          alert("입력하신 데이터의 형식이 올바르지 않습니다. 다시 확인해주세요.");
        } else if (status === 409) {
          alert("이미 가입된 이메일입니다.");
        } else if (status === 500) {
          alert("요청에 실패하였습니다. 다시 시도해주세요.");
        } else {
          alert(`알 수 없는 오류가 발생하였습니다. (Status: ${status})`);
        }
      } else {
        alert("네트워크 오류가 발생하였습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          회원가입
        </h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            이메일
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="이메일을 입력해 주세요."
              {...register("email")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            패스워드
          </label>
          <div className="mt-2 flex flex-col gap-2">
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="대문자, 숫자, 특수문자 포함 8~20자"
              {...register("password")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="비밀번호를 확인해 주세요."
              {...register("confirmPassword")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            회원가입
          </button>
        </div>
      </form>

      <div>
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium">
            <span className="bg-white px-6 text-gray-900">소셜 회원가입</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="block mx-auto">
            <img src="/kakao_login.png" alt="카카오 로그인" />
          </button>
        </div>
      </div>
    </>
  );
}