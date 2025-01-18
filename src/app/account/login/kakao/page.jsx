"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/Loading";

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) return; // code가 없으면 콜백 처리할 수 없으므로 아무것도 하지 않음

    axios
      .get(`https://nossidev.run.goorm.site/account/social-login/callback/?code=${code}&state=${state}`, {
        withCredentials: true, // 쿠키 주고받기 설정
      })
      .then((res) => {
        // 요청 성공 시
        console.log("response headers:", res.headers);
        console.log("Set-Cookie:", res.headers["set-cookie"]); // 일부 환경에서 undefined일 수도 있음

        // 홈으로 이동 (원하는 경로가 있다면 수정)
        router.replace("/");
      })
      .catch((err) => {
        // 요청 실패 시
        console.error("로그인 실패:", err);
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");

        // 실패 시에도 홈으로 보낼지, 다른 처리를 할지 결정
        router.replace("/");
      });
  }, [searchParams, router]);

  return <Loading />;
}