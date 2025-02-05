'use client';
import React, { useRef } from "react";
import Image from "next/image";

export default function LoginPage() {
  // 폼에 접근하기 위한 ref 생성
  const formRef = useRef(null);

  // 버튼 클릭 시 폼 제출
  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={handleButtonClick}>
        <Image
          src="/img/kakao_login_medium_narrow.png"
          alt="login_logo"
          width={183}
          height={45}
        />
      </button>
      <LoginForm ref={formRef} />
    </div>
  );
}

// forwardRef를 사용하여 ref 전달 허용
const LoginForm = React.forwardRef((props, ref) => {
  return (
    <form
      action={`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/v1/auth/social/token`}
      method="POST"
      className="hidden"
      ref={ref}
    >
      <input type="hidden" name="provider" value="kakao" />
      <input type="hidden" name="next" value="" />
    </form>
  );
});