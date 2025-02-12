'use client'
import { useState } from 'react';
import TextEditor from "@/components/texteditor/TextEditor";
import CodeEditor from "@/app/problem/CodeEditor";
import CodeEditorNavbar from "@/app/problem/CodeEditorNavbar";

export default function CreateProblem() {
  // 문제 관련 상태
  const [problemName, setProblemName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [exampleTestCases, setExampleTestCases] = useState("");
  const [internalTestCases, setInternalTestCases] = useState("");

  // 각 언어별 템플릿 코드 상태
  const [c, setC] = useState("");
  const [cpp, setCpp] = useState("");
  const [python, setPython] = useState("");
  const [java, setJava] = useState("");
  const [javascript, setJavascript] = useState("");

  // TextEditor에서 호출할 콜백 함수
  const handleDescriptionChange = (description) => {
    setProblemDescription(description);
  };

  const handleSubmit = () => {
    // 모든 상태값을 콘솔에 출력 (필요시 실제 제출 로직 추가)
    console.log({
      problemName,
      problemDescription,
      exampleTestCases,
      internalTestCases,
      c,
      cpp,
      python,
      java,
      javascript,
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
        // 추가: 언어별 상태와 set 함수 전달
        c={c}
        setC={setC}
        cpp={cpp}
        setCpp={setCpp}
        java={java}
        setJava={setJava}
        javascript={javascript}
        setJavascript={setJavascript}
        python={python}
        setPython={setPython}
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
                            handleSubmit,
                            // 언어 관련 props 추가
                            c,
                            setC,
                            cpp,
                            setCpp,
                            java,
                            setJava,
                            javascript,
                            setJavascript,
                            python,
                            setPython,
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
          <LanguageItem languageName="C" code={c} onCodeChange={setC} />
          <LanguageItem languageName="C++" code={cpp} onCodeChange={setCpp} />
          <LanguageItem languageName="Java" code={java} onCodeChange={setJava} />
          <LanguageItem languageName="Javascript" code={javascript} onCodeChange={setJavascript} />
          <LanguageItem languageName="Python" code={python} onCodeChange={setPython} />
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

function LanguageItem({ languageName, code, onCodeChange }) {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => {
    setEnabled((prev) => !prev);
  };

  return (
    <li className="flex flex-col gap-2">
      <div className="flex flex-col border p-4 rounded">
        <div className="flex items-center justify-between">
          <span>{languageName}</span>
          <button
            onClick={toggle}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none
              ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div
          className={`p-4 ${
            enabled ? "block" : "hidden"
          }`}
        >
          <CodeEditor language={languageName} code={code} onCodeChange={onCodeChange} />
        </div>
      </div>
    </li>
  );
}

function ProblemPreview({ problemDescription }) {
  return (
    <div className="bg-[#FFFAF0] w-3/5 flex flex-col border-l min-w-[600px]">
      <p className="bg-[#F7F7F7] opacity-55 p-2 border-b">문제 미리보기</p>
      <div className="flex-1 flex">
        <div
          className="flex-1 border-r p-4 overflow-y-scroll prose"
          dangerouslySetInnerHTML={{ __html: problemDescription }}
        ></div>
        <div className="flex flex-col flex-1 border-l">
          <div className="flex-1 border-b flex flex-col">
            <CodeEditorNavbar/>
            <CodeEditor language="C" />
          </div>
          <div className="flex-1 border-t"></div>
        </div>
      </div>
    </div>
  );
}