'use client'
import {useState} from "react";

const testTestCases = [
  {
    nums: [2, 7, 11, 15],
    target: 9
  },
  {
    nums: [3, 2, 4],
    target: 6
  },
  {
    nums: [3, 3],
    target: 6
  }
]

export default function Console({testCases, onRunClick, onSubmitClick, testResult}) {
  const [selectedTestCase, setSelectedTestCase] = useState(0); // 선택된 테스트 케이스
  const [selectedTestResult, setSelectedTestResult] = useState(0); // 선택된 테스트 결과 케이스
  const [selectedConsoleTab, setSelectedConsoleTab] = useState(0); // 선택된 탭
  const [isRunLoading, setIsRunLoading] = useState(false); // 실행하기를 누르고 응답을 받기 전까지는 true 그렇지 않으면 false
  const [isSubmitLoading, setIsSubmitLoading] = useState(false); // 제출하기용

  const curSelectedTestCase = selectedConsoleTab === 0 ? selectedTestCase : selectedTestResult;

  const handleRunClick = async () => {
    setIsRunLoading(true);
    // onRunClick();
    setTimeout(() => {
      setIsRunLoading(false);
      setSelectedConsoleTab(1);
      setSelectedTestResult(0);
    }, 2000); // 2초 후에 false로 설정
  }

  const handleSubmitClick = async () => {
    setIsSubmitLoading(true);
    // onSubmitClick();
    setTimeout(() => {
      setIsSubmitLoading(false);
    }, 2000)
  }

  const handleSelectedTestCaseChange = (selectedTestCase) => {
    if (selectedConsoleTab === 0) setSelectedTestCase(selectedTestCase);
    else setSelectedTestResult(selectedTestCase);
  }



  return (
    <div className="h-full p-4 flex flex-col overflow-y-scroll" aria-label="console">
      <ConsoleNav selectedConsoleTab={selectedConsoleTab} setSelectedConsoleTab={setSelectedConsoleTab} isRunLoading={isRunLoading}/>
      <TestCaseViewer selectedConsoleTab={selectedConsoleTab} selectedTestCase={curSelectedTestCase} onSelectedTestCaseChange={handleSelectedTestCaseChange}
      isRunLoading={isRunLoading} />
      <RunSubmitButtonContainer isRunLoading={isRunLoading} isSubmitLoading={isSubmitLoading} onRunClick={handleRunClick} onSubmitClick={handleSubmitClick} />
    </div>
  );
}

// 여기는 isSubmitLoaindg이 필요 없음
function ConsoleNav({selectedConsoleTab, setSelectedConsoleTab, isRunLoading}) {
  return (
    <div className="overflow-x-scroll shrink-0 -mx-4 -mt-4 py-2 px-4 flex gap-4 items-center bg-[#FBF9F4]" aria-label="console nav">
      <button
        className={`${selectedConsoleTab !== 0 && "opacity-55"} flex items-center gap-1 text-sm shrink-0`}
        onClick={() => setSelectedConsoleTab(0)}
        aria-current={selectedConsoleTab === 0 ? 'tab' : undefined}
      >
        <TestCaseIcon/>테스트 케이스
      </button>
      <button
        className={`${selectedConsoleTab !== 1 && "opacity-55"} flex items-center gap-1 text-sm shrink-0`}
        onClick={() => setSelectedConsoleTab(1)}
        aria-current={selectedConsoleTab === 1 ? 'tab' : undefined}
      >
        {isRunLoading && <Loading/>}테스트 케이스 결과
      </button>
    </div>
  );
}

function RunSubmitButtonContainer({onRunClick: handleRunClick, onSubmitClick: handleSubmitClick, isRunLoading, isSubmitLoading}) {
  return (
    <div className="border-t border-t-gray-300 shrink-0 -mb-4 -mx-4 py-2 px-4 flex justify-end gap-4"
         aria-label="Run and Submit Button Container">
      <button
        aria-label="Run Button"
        type="button"
        onClick={handleRunClick}
        disabled={isRunLoading || isSubmitLoading}
        className="disabled:cursor-not-allowed flex gap-1 items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {(isRunLoading || isSubmitLoading) && <Loading/>}실행하기
      </button>
      <button
        aria-label="Submit Button"
        type="button"
        disabled={isRunLoading || isSubmitLoading}
        onClick={handleSubmitClick}
        className="disabled:cursor-not-allowed flex gap-1 items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {(isRunLoading || isSubmitLoading) && <Loading/>}제출하기
      </button>
    </div>
  )
}

// 여기는 로딩 중이면 pulse로 바꾸기
// 여기는 isSubmitLoading은 필요 없음
// 여기서 관건은 tab 번호가 뭔지에 따라서 다르게 랜더링 해야함
// 그리고

// 여기서 버튼을 누를텐데
// 상위에서 현재 탭이 무엇인지 판단해서 스위칭을 해줘야 함

function TestCaseViewer({testCases = testTestCases, testResult, isRunLoading, selectedConsoleTab, selectedTestCase, onSelectedTestCaseChange: handleSelectedTestCaseChange}) {

  return (
    <div aria-label="Test Case Viewer" className={`flex-grow overflow-scroll py-2 ${isRunLoading && 'animate-pulse'}`}>
      <div className="flex gap-2 px-3">
        {testCases.map((_, index) => (

          <button
            key={index}
            type="button"
            onClick={() => handleSelectedTestCaseChange(index)}
            className={`shrink-0 rounded-md  px-3 py-2 text-sm font-semibold text-indigo-600 ${selectedTestCase === index ? 'bg-indigo-50 shadow-sm' : undefined}  hover:bg-indigo-100`}
          >
            테스트케이스{index+1}
          </button>
        ))}
      </div>
      <div>
        {testCases.map}
      </div>
    </div>
  )
}

function Loading() {
  return (

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="size-4 animate-spin">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
    </svg>

  )
}

function Success() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>

  )
}

function Failure() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>

  )
}

function TestCaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>
    </svg>

  )
}

