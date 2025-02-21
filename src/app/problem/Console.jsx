'use client'
import { useState } from "react";
import TextEditor from "@/components/texteditor/TextEditor";

export default function Console({ testCases, onRunClick, onSubmitClick, testResult }) {
  const [selectedTestCase, setSelectedTestCase] = useState(0); // 선택된 테스트 케이스
  const [selectedTestResult, setSelectedTestResult] = useState(0); // 선택된 테스트 결과 케이스
  const [selectedConsoleTab, setSelectedConsoleTab] = useState(0); // 선택된 탭


  return (
    <div className="h-full p-4 flex flex-col overflow-y-scroll" aria-label="console">
      <ConsoleNav selectedConsoleTab={selectedConsoleTab} setSelectedConsoleTab={setSelectedConsoleTab} />
      <TestCaseViewer/>
      <RunSubmitButtonContainer/>
    </div>
  );
}

function ConsoleNav({ selectedConsoleTab, setSelectedConsoleTab }) {
  return (
    <div className="shrink-0 -mx-4 -mt-4 py-2 px-4 flex gap-4 items-center bg-[#FBF9F4]" aria-label="console nav">
      <button
        className={`${selectedConsoleTab !== 0 && "opacity-55"}`}
        onClick={() => setSelectedConsoleTab(0)}
        aria-current={selectedConsoleTab === 0 ? 'tab' : undefined}
      >
        테스트 케이스
      </button>
      <button
        className={`${selectedConsoleTab !== 1 && "opacity-55"}`}
        onClick={() => setSelectedConsoleTab(1)}
        aria-current={selectedConsoleTab === 1 ? 'tab' : undefined}
      >
        테스트 케이스 결과
      </button>
    </div>
  );
}

function RunSubmitButtonContainer({}) {
  return (
    <div className="border-t border-t-gray-300 shrink-0 -mb-4 -mx-4 py-2 px-4 flex justify-end gap-4" aria-label="Run and Submit Button Container">
      <button
        aria-label="Run Button"
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        실행하기
      </button>
      <button
        aria-label="Submit Button"
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        제출하기
      </button>
    </div>
  )
}

function TestCaseViewer() {
  return (
    <div aria-label="Test Case Viewer" className="flex-grow overflow-scroll py-2">

    </div>
  )
}

