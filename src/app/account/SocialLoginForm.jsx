import React, { forwardRef } from 'react';

const SocialLoginForm = forwardRef(function SocialLoginForm({ provider = null, previousUrl = '' }, ref) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL; // 환경 변수 이름 확인!

  return (
    <form
      ref={ref}
      method="post"
      action={`${backend}/account/v1/auth/token`}
      className="hidden"
    >
      <input type="hidden" name="provider" value="kakao"/>
      <input type="hidden" name="next" value={previousUrl}/>
    </form>
  );
});

export default SocialLoginForm;