'use client'
import { useState } from 'react';
import TextEditor from "@/components/texteditor/TextEditor";
import CodeEditor from "@/app/problem/CodeEditor";

export default function CreateProblem() {
  // CreateProblem에서 모든 상태를 관리
  const [problemName, setProblemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [exampleTestCases, setExampleTestCases] = useState("");
  const [internalTestCases, setInternalTestCases] = useState("");

  // TextEditor에서 호출할 콜백 함수
  const handleDescriptionChange = (description) => {
    setProblemDescription(description);
  };

  const handleSubmit = () => {
    // 상태값을 콘솔에 출력 (필요시 실제 제출 로직 추가)
    console.log({
      problemName,
      problemDescription,
      exampleTestCases,
      internalTestCases,
    });
  };

  return (
    <div className="flex h-screen">
      <ProblemInputForm
        problemName={problemName}
        setProblemName={setProblemName}
        handleDescriptionChange={handleDescriptionChange}
        exampleTestCases={exampleTestCases}
        setExampleTestCases={setExampleTestCases}
        internalTestCases={internalTestCases}
        setInternalTestCases={setInternalTestCases}
        handleSubmit={handleSubmit}
      />
      <ProblemPreview problemDescription={problemDescription} />
    </div>
  );
}

function ProblemInputForm({
                            problemName,
                            setProblemName,
                            handleDescriptionChange,
                            exampleTestCases,
                            setExampleTestCases,
                            internalTestCases,
                            setInternalTestCases,
                            handleSubmit
                          }) {
  return (
    <div className="p-6 bg-white rounded border-r shadow-md w-2/5 min-w-96 overflow-y-auto flex gap-4 flex-col">
      {/* 문제 이름 */}
      <div>
        <label htmlFor="problemName" className="block text-gray-700 font-medium mb-2">
          문제 이름
          <input
            type="text"
            id="problemName"
            placeholder="문제 이름을 입력하세요"
            value={problemName}
            onChange={(e) => setProblemName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </label>
      </div>

      {/* 문제 설명 */}
      <div>
        <label htmlFor="problemDescription" className="block text-gray-700 font-medium mb-2">
          문제 설명
          <TextEditor
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="문제 설명을 입력하세요"
            onChange={handleDescriptionChange}
          />
        </label>
      </div>

      {/* 언어 선택 및 템플릿 코드 */}
      <div>
        <p className="text-gray-700 font-medium mb-2">언어 선택 및 템플릿 코드</p>
        <ul className="flex flex-col gap-2">
          <LanguageItem languageName="C" />
          <LanguageItem languageName="C++" />
          <LanguageItem languageName="Java" />
          <LanguageItem languageName="Javascript" />
          <LanguageItem languageName="Python" />
        </ul>
      </div>

      {/* 예시 테스트 케이스 */}
      <div>
        <label htmlFor="exampleTestCases" className="block text-gray-700 font-medium mb-2">
          예시 테스트 케이스
          <textarea
            id="exampleTestCases"
            placeholder="예시 테스트 케이스를 입력하세요"
            rows="4"
            value={exampleTestCases}
            onChange={(e) => setExampleTestCases(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </label>
      </div>

      {/* 내부 테스트 케이스 */}
      <div>
        <label htmlFor="internalTestCases" className="block text-gray-700 font-medium mb-2">
          내부 테스트 케이스
          <textarea
            id="internalTestCases"
            placeholder="내부 테스트 케이스를 입력하세요"
            rows="4"
            value={internalTestCases}
            onChange={(e) => setInternalTestCases(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </label>
      </div>

      {/* 제출 버튼 */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        문제 추가
      </button>
    </div>
  );
}

function ProblemPreview({ problemDescription }) {
  return (
    <div className="bg-[#FFFAF0] w-3/5 flex flex-col border-l">
      <p className="bg-[#F7F7F7] opacity-55 p-2 border-b">문제 미리보기</p>
      <div className="flex-1 flex">
        <div
          className="flex-1 border-r p-4 overflow-y-scroll prose"
          dangerouslySetInnerHTML={{ __html: problemDescription }}
        ></div>
        <div className="flex flex-col flex-1 border-l">
          <div className="flex-1 border-b"></div>
          <div className="flex-1 border-t"></div>
        </div>
      </div>
    </div>
  );
}

// LanguageItem 컴포넌트는 언어 이름과 토글 버튼을 보여주며,
// 토글 버튼을 누르면 모달이 나타나고, 모달 안에서 CodeEditor를 통해 템플릿 코드를 작성할 수 있습니다.
function LanguageItem({ languageName }) {
  const [enabled, setEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    setEnabled((prev) => !prev);
    // 토글을 활성화할 때 모달을 열고, 비활성화하면 닫습니다.
    if (!enabled) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <li className="flex items-center justify-between border p-4 rounded">
        <div className="flex items-center gap-2">
          <span>{languageName}</span>
        </div>
        <button
          onClick={toggle}
          className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none
            ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform 
              ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">{languageName} Template Code</h2>
          <CodeEditor language={languageName} />
        </Modal>
      )}
    </>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* 모달 내용 */}
      <div className="relative bg-white p-6 rounded shadow-lg z-10 w-11/12 md:w-1/2">
        {children}
      </div>
    </div>
  );
}