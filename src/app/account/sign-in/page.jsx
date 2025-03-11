'use client';
import {useForm} from "react-hook-form";
import api from "@/axios/axiosConfig";
import {yupResolver} from "@hookform/resolvers/yup";
import SocialLoginForm from "@/app/account/SocialLoginForm";
import Link from "next/link";
import {useRef} from "react";
import loginScheme from "@/yup/loginScheme";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, logout} from "@/store/slices/authSlice";
import {addAlert} from "@/store/slices/alertSlice";

export default function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(loginScheme)
  });
  const formRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const previousUrl = useSelector(state => state.previousUrl.previousUrl);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("account/v1/auth/token", data);
      console.log(response);
      await dispatch(checkAuth(true)).unwrap();
      router.push("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.detail;
        // 430은 3개 api 모두에서 발생함 (이게 맞나 싶긴 함.. 뭐 전부 다 형식이 다르다는 식으로만 표시되어있음)
        if (status === 430) {
          dispatch(
            addAlert({
              type: "warning",
              message: "올바른 요청이 아닙니다. 다시 시도해주세요.",
            })
          );
        } else if (status === 401) {
          // 사실 이게 말이 되는 상황인가 싶기는 한데.. 뭐 존재는 한다고 함
          if (message === 'access token expired.') {
            dispatch(
              addAlert({
                type: "warning",
                message: "로그아웃 되었습니다. 지속적으로 발생 시 고객센터에 문의주시기 바랍니다.",
              }));
            dispatch(logout());
            router.push('/');
          }
          else {
            dispatch(
              addAlert({
                type: "warning",
                message: "잘못된 이메일 또는 비밀번호입니다.",
              })
            );
          }
        } else if (status === 404) {
          dispatch(
            addAlert({
              type: "warning",
              message: "해당 사용자가 존재하지 않습니다.",
            })
          );
        } else if (status === 500) {
          dispatch(
            addAlert({
              type: "warning",
              message: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주시거나, 문제가 지속된다면 고객센터에 문의해 주세요.",
            })
          );
        } else {
          // 403 요구 권한보다 낮은 권한의 유저가 접근하는 경우가 발생?.. 할 수는 없겠지?.. else는 그 경우 혹은 에러 명세서에 명시를 안한 것밖에 없음
          dispatch(
            addAlert({
              type: "warning",
              message: `알 수 없는 오류가 발생하였습니다. (Status: ${status}) 네트워크 연결 확인 후 해결이 안될 시 고객센터에 문의 바랍니다.`,
            })
          );
        }
      } else {
        dispatch(
          addAlert({
            type: "warning",
            message: `알 수 없는 오류가 발생하였습니다. 네트워크 연결 확인 후 해결이 안될 시 고객센터에 문의 바랍니다.`,
          })
        );
      }
    }
  };

  const onError = (errors) => {
    console.log("유효성 오류:", errors);
  };

  const handleKakaoLoginClick = () => {
    // ref를 통해 폼을 찾아서 제출
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          로그인
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
          <div className="mt-2">
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              {...register("password")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            로그인
          </button>
        </div>
      </form>

      <div>
        <div className="relative mt-10">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"/>
          </div>
          <div className="relative flex justify-center text-sm font-medium">
            <span className="bg-white px-6 text-gray-900">소셜 로그인</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="block mx-auto" onClick={handleKakaoLoginClick}>
            <img src="/kakao_login.png" alt="카카오 로그인"/>
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        회원이 아닌가요?{' '}
        <Link href="/account/sign-up" className="font-semibold text-indigo-600 hover:text-indigo-500">
          지금 바로 회원가입을 해보세요!
        </Link>
      </p>
      <SocialLoginForm ref={formRef} previousUrl={previousUrl}/>
    </>
  );
}