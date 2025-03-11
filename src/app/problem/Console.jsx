'use client'
import {useContext, useRef, useState} from "react";
import {ProblemContext} from "@/app/problem/ProblemContent";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

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

// 런 테케
// 섭밋 테케
// 각 클릭시 핸들러
// 테스트 결과는 상위에서 받아야 할듯?..

export default function Console({testCases, testResult}) {
  const [selectedTestCase, setSelectedTestCase] = useState(0); // 선택된 테스트 케이스
  const [selectedTestResult, setSelectedTestResult] = useState(0); // 선택된 테스트 결과 케이스
  const [selectedConsoleTab, setSelectedConsoleTab] = useState(0); // 선택된 탭
  const [isRunLoading, setIsRunLoading] = useState(false); // 실행하기를 누르고 응답을 받기 전까지는 true 그렇지 않으면 false
  const [isSubmitLoading, setIsSubmitLoading] = useState(false); // 제출하기용
  const {onRunClick, onSubmitClick} = useContext(ProblemContext);

  const curSelectedTestCase = selectedConsoleTab === 0 ? selectedTestCase : selectedTestResult;

  const handleRunClick = async () => {
    setIsRunLoading(true);

    await onRunClick();
    setIsRunLoading(false);
    setSelectedConsoleTab(1);
    setSelectedTestResult(0);
  }

  const handleSubmitClick = async () => {
    setIsSubmitLoading(true);
    await onSubmitClick();
    setIsSubmitLoading(false);
  }

  const handleSelectedTestCaseChange = (selectedTestCase) => {
    if (selectedConsoleTab === 0) setSelectedTestCase(selectedTestCase);
    else setSelectedTestResult(selectedTestCase);
  }


  return (
    <div className="h-full p-4 flex flex-col overflow-y-scroll" aria-label="console">
      <ConsoleNav selectedConsoleTab={selectedConsoleTab} setSelectedConsoleTab={setSelectedConsoleTab}
                  isRunLoading={isRunLoading}/>
      <TestCaseViewer selectedConsoleTab={selectedConsoleTab} selectedTestCase={curSelectedTestCase}
                      onSelectedTestCaseChange={handleSelectedTestCaseChange}
                      isRunLoading={isRunLoading}/>
      <RunSubmitButtonContainer isRunLoading={isRunLoading} isSubmitLoading={isSubmitLoading}
                                onRunClick={handleRunClick} onSubmitClick={handleSubmitClick}/>
    </div>
  );
}

// 여기는 isSubmitLoaindg이 필요 없음
function ConsoleNav({selectedConsoleTab, setSelectedConsoleTab, isRunLoading}) {
  return (
    <div className="overflow-x-scroll shrink-0 -mx-4 -mt-4 py-2 px-4 flex gap-4 items-center bg-[#FBF9F4]"
         aria-label="console nav">
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

function RunSubmitButtonContainer({
                                    onRunClick: handleRunClick,
                                    onSubmitClick: handleSubmitClick,
                                    isRunLoading,
                                    isSubmitLoading
                                  }) {
  const { isLoggedIn } = useSelector(state => state.auth);
  const router = useRouter();

  // 로그인 여부에 따른 onClick 핸들러 결정
  const runButtonClick = !isLoggedIn
    ? () => router.push('/account/sign-in')
    : handleRunClick;

  const submitButtonClick = !isLoggedIn
    ? () => router.push('/account/sign-in')
    : handleSubmitClick;

  return (
    <div className="border-t border-t-gray-300 shrink-0 -mb-4 -mx-4 py-2 px-4 flex justify-end gap-4"
         aria-label="Run and Submit Button Container">
      <button
        aria-label={isLoggedIn ? "Run Button" : "Login Button"}
        type="button"
        onClick={runButtonClick}
        disabled={isRunLoading || isSubmitLoading}
        className="disabled:cursor-not-allowed flex gap-1 items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {(isRunLoading || isSubmitLoading) && <Loading />}
        {isLoggedIn ? "실행하기" : "로그인"}
      </button>
      <button
        aria-label={isLoggedIn ? "Submit Button" : "Sign In Button"}
        type="button"
        disabled={isRunLoading || isSubmitLoading}
        onClick={submitButtonClick}
        className="disabled:cursor-not-allowed flex gap-1 items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {(isRunLoading || isSubmitLoading) && <Loading />}
        {isLoggedIn ? "제출하기" : "하러가기"}
      </button>
    </div>
  );
}

// 여기는 로딩 중이면 pulse로 바꾸기
// 여기는 isSubmitLoading은 필요 없음
// 여기서 관건은 tab 번호가 뭔지에 따라서 다르게 랜더링 해야함
// 그리고

// 여기서 버튼을 누를텐데
// 상위에서 현재 탭이 무엇인지 판단해서 스위칭을 해줘야 함

function TestCaseViewer({
                          testCases = testTestCases,
                          testResult,
                          isRunLoading,
                          selectedConsoleTab,
                          selectedTestCase,
                          onSelectedTestCaseChange: handleSelectedTestCaseChange
                        }) {
  const { runTestCase } = useContext(ProblemContext);
  console.log(runTestCase);
  const convertedRunTestCase = useRef(
    Object.entries(runTestCase).map(
      ([id, {input, output}]) => {
        return {
          id, // id는 원래 객체의 key입니다.
          input: Object.entries(input).map(([key, value]) => ({key, value})),
          output
        };
      }
    ));


  return (
    <div aria-label="Test Case Viewer" className={`grow overflow-scroll py-2 ${isRunLoading && 'animate-pulse'}`}>
      {!testResult && selectedConsoleTab === 1 ? // 아직 run 안눌렀는데 결과 먼저 보려고 하는 경우
        <div className="my-auto text-center text-gray-500">코드 실행을 먼저 해주세요.</div>
        :
        <>
          <div className="flex gap-2 px-3">
            {convertedRunTestCase.current.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectedTestCaseChange(index)}
                className={`shrink-0 rounded-md  px-3 py-2 text-sm font-semibold text-indigo-600 ${selectedTestCase === index ? 'bg-indigo-50 shadow-sm' : undefined}  hover:bg-indigo-100`}
              >
                테스트케이스{index + 1}
              </button>
            ))}
          </div>
          <div className="px-3 mt-3">
            {convertedRunTestCase.current[selectedTestCase].input.map((input, index) => (
              <div className='mt-2' key={index}>
                <h4 className="text-sm text-gray-400">{input.key}</h4>
                <p
                  className="bg-gray-400 py-2 px-2 rounded-lg">{typeof input.value === 'object' ? JSON.stringify(input.value) : input.value}</p>
              </div>
            ))}
          </div>
        </>
      }
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

