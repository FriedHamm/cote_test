import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <a href="https://nossidev.run.goorm.site/account/social-login?provider=kakao&next=/">
        <Image
          src="/img/kakao_login_medium_narrow.png"
          alt="login_logo"
          width={183}
          height={45}
        />
      </a>
    </div>
  );
}