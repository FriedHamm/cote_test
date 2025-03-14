'use client';
import {useContext} from "react";
import {CodeExecutionContext} from "@/app/problem/CodeExcutionContext";
import {resultMappingObject} from "@/app/problem/Console";
import CodeEditor from "@/app/problem/CodeEditor";

export default function SubmissionResult(props) {
  return (
    <div className="px-4 h-full overflow-y-scroll">
      <SubmissionDetail/>
    </div>
  )
}

function SubmissionDetail() {
  const {submitResult} = useContext(CodeExecutionContext);

  if (!submitResult) {
    return (
      <p className="text-center text-gray-500">코드 제출을 먼저 해주세요.</p>
    )
  }



// 문자열을 Date 객체로 변환
  const date = new Date(submitResult.submitted_at);

// 월은 0부터 시작하므로 +1 해줘야 함
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;

  return (
    <div className="w-full my-4 px-4 sm:px-6 lg:px-8">

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