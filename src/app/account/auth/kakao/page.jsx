"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from "@/components/Loading";

export default function KakaoLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const code = searchParams?.get("code");
      const state = searchParams?.get("state");

      if (code && state) {
        const requestUrl = `https://nossidev.run.goorm.site/account/social-login/callback/?code=${code}&state=${state}`;
        try {
          const response = await axios.get(requestUrl);
          // 응답 헤더 전체 출력
          console.log(response.headers);
          // 응답 헤더 중 Set-Cookie가 포함된 경우 확인
          console.log("Set-Cookie 헤더:", response.headers["set-cookie"]);
          // 추가 로직: 성공 후 원래 페이지로 리다이렉트 등
        } catch (error) {
          console.error("요청 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("code 파라미터가 URL에 없습니다.");
        setLoading(false);
      }
    }

    fetchToken();
  }, [searchParams]);

  useEffect(() => {
    // 로딩이 끝나면 홈페이지로 이동
    if (!loading) {
      router.push("/");
    }
  }, [loading, router]);

  if (loading) {
    return <Loading />;
  }

  return null;
}