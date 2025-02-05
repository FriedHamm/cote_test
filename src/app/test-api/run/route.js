import { NextResponse } from 'next/server';

export async function POST(request) {
  const { testCaseCount } = await request.json();

  // 결과 케이스 정의 (컴파일/런타임 에러 제외)
  const outcomes = [
    { status: 'success', message: '테스트 케이스 통과' },
    { status: 'failure', message: '테스트 케이스 실패' },
    { status: 'timeout', message: '테스트 케이스 시간 초과' },
  ];

  // 각 테스트 케이스별로 랜덤한 결과 생성
  const results = Array.from({ length: testCaseCount }, (_, index) => {
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    return {
      testCase: index + 1, // 테스트 케이스 번호
      ...randomOutcome,
    };
  });

  // 실제 실행하는 것처럼 약간의 지연 추가 (예: 500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 전체 테스트 케이스 결과를 JSON 형태로 반환
  return NextResponse.json({ results });
}