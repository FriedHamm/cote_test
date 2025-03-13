'use client'
import {useContext} from "react";
import {ProblemContext} from "@/app/problem/ProblemContent";
import {resultMappingObject} from "@/app/problem/Console";
import CodeEditor from "@/app/problem/CodeEditor";

// const submitResult = {
//   "id": 4,
//   "user_id": 70,
//   "problem_id": 1,
//   "language_id": 2,
//   "final_result": "SOL",
//   "submitted_code": "# 2. 메모이제이션\ndef solution(m, n):\n    a=1/(m-n)\n    memo = [[-1] * n for _ in range(m)]\n\n    def dp(r, c):\n        # basecase\n        if r == 0 or c == 0:\n            memo[r][c] = 1\n        # memoization\n        elif memo[r][c] == -1:\n            memo[r][c] = dp(r - 1, c) + dp(r, c - 1)\n        # 저장된 값 반환\n        return memo[r][c]\n\n    return dp(m - 1, n - 1)",
//   "result_detail": {
//     "max_run_time": 0,
//     "max_memory": 12056,
//     "1": {
//       "message": "WRO",
//       "result": 28,
//       "run_time": 0,
//       "memory": 12056,
//       "stdout": "",
//       "stderr": null // 여기에 에러 내용이 문자열로 들어감
//     },
//     "2": {
//       "message": "SOL",
//       "result": 3,
//       "run_time": 0,
//       "memory": 12056,
//       "stdout": "",
//       "stderr": null
//     },
//     "3": {
//       "message": "SOL",
//       "result": 1,
//       "run_time": 0,
//       "memory": 12056,
//       "stdout": "",
//       "stderr": null
//     }
//   },
//   "submitted_at": "2025-03-10T15:56:50.666871"
// }

export default function SubmissionDetail() {
  const {submitResult} = useContext(ProblemContext);

  if (!submitResult) {
    return (
      <p className="text-center text-gray-500">코드 제출을 먼저 해주세요.</p>
    )
  }

  // ISO 8601 형식의 문자열
  const isoString = "2025-03-10T15:56:50.666871";

// 문자열을 Date 객체로 변환
  const date = new Date(isoString);

// 월은 0부터 시작하므로 +1 해줘야 함
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
  console.log(formattedDate);

  return (
    <div className="w-full mt-4 px-4 sm:px-6 lg:px-8">

      <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow text-center">
        <p className={`text-2xl font-semibold ${
          submitResult.final_result === "WRO" ? 'text-red-500' :
            submitResult.final_result === "SOL" ? 'text-green-500' : 'text-red-700'
        }`}>
          {resultMappingObject[submitResult.final_result]}
        </p>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
      <CodeEditor editable={false} curCode={submitResult.submitted_code}/>

      {(submitResult.final_result === "SOL" || submitResult.final_result === "WRO") && (
        <div className="mt-4 flex gap-4">
          <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg shadow">
            <p className="text-sm font-medium text-green-700">실행 시간</p>
            <p className="text-xl font-bold text-green-900">{submitResult.result_detail.max_run_time} ms</p>
          </div>
          <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
            <p className="text-sm font-medium text-blue-700">메모리 사용</p>
            <p
              className="text-xl font-bold text-blue-900">{(submitResult.result_detail.max_memory / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      )}
    </div>
  )
}

// 일단 필요한건
// 언어 정보
// 최종 결과
// 제출 코드
// 런타임
// 메모리
// 제출 일시

// SOL과 WRO일 때에만 런타임 메모리를 보여줌
