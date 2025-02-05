import { useState } from "react";

function getButtonClass({ index, selected, selectedConsoleTab, testResult }) {
  let baseClass = "p-2 rounded-lg transition-all duration-500 ";

  if (selectedConsoleTab === 0) {
    // 테스트 케이스 탭: hover 효과와 선택된 버튼 배경 처리
    baseClass += `hover:bg-[#D7FF86] ${selected === index ? "bg-[#E2FFA9]" : ""}`;
  } else if (selectedConsoleTab === 1 && testResult) {
    const result = testResult[index];
    baseClass += result?.status === "success"
      ? `hover:bg-[#6A9BFF] ${selected === index ? "bg-[#ABC7FF]" : ""}`
      : `hover:bg-[#FF869E] ${selected === index ? "bg-[#FFA9BA]" : ""}`;
  }

  return baseClass;
}

function TestCaseButtons({
                           testCases = [],
                           selected,
                           onSelect,
                           testResult,
                           selectedConsoleTab,
                         }) {
  // 결과 탭인데 testResult가 없으면 렌더링하지 않음
  if (!testResult && selectedConsoleTab === 1) return null;

  return (
    <div className="flex items-center gap-4">
      {testCases?.map((testCase, i) => {
        const result = testResult ? testResult[i] : null;
        return (
          <button
            key={i}
            className={getButtonClass({
              index: i,
              selected,
              selectedConsoleTab,
              testResult,
            })}
            onClick={() => onSelect(i)}
          >
            테스트 {i + 1}
            {selectedConsoleTab === 1 && result && result.status === "success" && (
              <span className="ml-2 text-green-500">✓</span>
            )}
            {selectedConsoleTab === 1 && result && result.status !== "success" && (
              <span className="ml-2 text-red-500">✗</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function Console({ testCases, onRunClick, onSubmitClick, testResult }) {
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [selectedTestResult, setSelectedTestResult] = useState(0);
  const [selectedConsoleTab, setSelectedConsoleTab] = useState(0);

  // 현재 탭에 따른 선택 인덱스 결정
  const currentSelected = selectedConsoleTab === 0 ? selectedTestCase : selectedTestResult;

  const handleSelect = (caseNum) => {
    if (selectedConsoleTab === 0) {
      setSelectedTestCase(caseNum);
    } else {
      setSelectedTestResult(caseNum);
    }
  };

  const handleRunClick = async () => {
    try {
      await onRunClick(); // 상위 컴포넌트의 요청 완료 대기
      setSelectedConsoleTab(1); // 요청 완료 후 결과 탭으로 전환
      setSelectedTestResult(0);
    } catch (error) {
      console.error("요청 중 에러 발생:", error);
      // 에러 처리 로직 추가 가능
    }
  };

  // 탭에 따라 현재 보여줄 데이터를 미리 선택합니다.
  const currentTestCase =
    selectedConsoleTab === 0
      ? testCases && testCases[selectedTestCase]
      : testResult && selectedTestResult !== -1
        ? testCases && testCases[selectedTestResult]
        : null;

  const currentTestResult =
    selectedConsoleTab === 0
      ? null
      : testResult && selectedTestResult !== -1
        ? testResult[selectedTestResult]
        : null;

  return (
    <div className="h-full w-full p-4 flex flex-col overflow-y-scroll gap-4">
      <ConsoleNav selectedConsoleTab={selectedConsoleTab} setSelectedConsoleTab={setSelectedConsoleTab} />

      <TestCaseButtons
        testCases={testCases}
        selected={currentSelected}
        onSelect={handleSelect}
        testResult={testResult}
        selectedConsoleTab={selectedConsoleTab}
      />

      {/* 항상 같은 TestCase 인스턴스를 렌더링 (key 고정) */}
      <div className="flex-1">
        {currentTestCase ? (
          <TestCase key="test-case" testCase={currentTestCase} testResult={currentTestResult} />
        ) : (
          <div className="p-4 text-center text-gray-500">
            먼저 실행하기 버튼을 눌러주세요.
          </div>
        )}
      </div>

      <ActionButtons onRunClick={handleRunClick} onSubmitClick={onSubmitClick} />
    </div>
  );
}

function ConsoleNav({ selectedConsoleTab, setSelectedConsoleTab }) {
  return (
    <div className="w-full -mx-4 -mt-4 py-2 px-4 flex gap-4 items-center bg-[#FBF9F4]">
      <button
        className={`${selectedConsoleTab !== 0 && "opacity-55"}`}
        onClick={() => setSelectedConsoleTab(0)}
      >
        테스트 케이스
      </button>
      <button
        className={`${selectedConsoleTab !== 1 && "opacity-55"}`}
        onClick={() => setSelectedConsoleTab(1)}
      >
        테스트 케이스 결과
      </button>
    </div>
  );
}

function TestCase({ testCase, testResult }) {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(testCase).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <p className="opacity-55 flex items-center">{key}</p>
          <pre
            className={`p-3 rounded-lg transition-all duration-500 ${
              testResult
                ? testResult.status === "success"
                  ? "bg-[#ABC7FF]"
                  : "bg-[#FFA9BA]"
                : "bg-[#E2FFA9]"
            }`}
          >
            {typeof value === "object" ? JSON.stringify(value) : value}
          </pre>
        </div>
      ))}
    </div>
  );
}

function ActionButtons({ onRunClick, onSubmitClick }) {
  return (
    <div className="w-full -mx-4 -mt-4 py-2 px-4 flex gap-6 items-center bg-[#FBF9F4] mt-auto -mb-4 justify-end">
      <button
        className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded font-medium"
        onClick={onRunClick}
      >
        실행하기
      </button>
      <button
        className="py-2 px-4 bg-[#FFA9BA] hover:bg-[#FF869E] rounded font-medium"
        onClick={onSubmitClick}
      >
        제출하기
      </button>
    </div>
  );
}