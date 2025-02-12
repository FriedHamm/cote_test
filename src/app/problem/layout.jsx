'use client'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import CodeEditor from "@/app/problem/CodeEditor";
import ProblemNav from "@/app/problem/ProblemNav";
import {useEffect, useState} from "react";
import CodeEditorNavbar from "@/app/problem/CodeEditorNavbar";
import Console from "@/app/problem/Console";
import axios from "axios";
import BreadCrumb from "@/app/problem/BreadCrumb";

export default function ProblemLayout({children}) {
  const [language, setLanguage] = useState('Javascript');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  }
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="bg-[#FFF0F0] h-full pt-8">
      {/*problemName 나중에 백엔드에서 데이터 받아와서 처리해야함*/}
      <BreadCrumb problemName="Two Sum"/>
      <PanelGroup direction="horizontal" className="h-full p-3">
        <Panel defaultSize={50} minSize={30} className="rounded-lg w-full h-full bg-[#FFFAF0]">
          <ProblemNav/>
          {children}
        </Panel>
        <PanelResizeHandle className="w-2.5 min-w-2.5 hidden md:block"/>
        <CodeEditorContainer language={language} onLanguageChange={handleLanguageChange}/>
      </PanelGroup>
    </div>
  )
}

function CodeEditorContainer({ language, onLanguageChange }) {
  // API로부터 받아온 템플릿 데이터를 저장하는 상태
  const [templates, setTemplates] = useState({
    C: "",
    Javascript: "",
    Java: "",
    Python: "",
    "C++": ""
  });
  const [testCases, setTestCases] = useState(null);
  const [templateCode, setTemplateCode] = useState("");
  const [testResult, setTestResult] = useState(null);

  const handleRunClick = async () => {
    try {
      const testCaseCount = 3; // 예시: 3개의 테스트케이스 결과 요청
      const { data } = await axios.post('/test-api/run', { testCaseCount });
      setTestResult(data.results);
    } catch (error) {
      console.error('Error in execution:', error);
    }
  };

  useEffect(() => {
    async function fetchProblemDetail() {
      try {
        const { data } = await axios.get("/test-api/problem-detail");
        setTemplates({
          C: data.c,
          Javascript: data.javascript,
          Java: data.java,
          Python: data.python,
          "C++": data.cpp,
        });
        setTestCases(data.testCases);
        // 예시: 기본 언어가 Javascript라면 해당 템플릿을 초기 templateCode로 설정
        setTemplateCode(data.javascript);
      } catch (error) {
        console.error("Error fetching problem detail:", error);
      }
    }
    fetchProblemDetail();
  }, []);

  return (
    <Panel defaultSize={50} minSize={30} className="rounded-lg hidden md:block">
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={30} className="w-full h-full rounded-lg flex flex-col">
          <CodeEditorNavbar onLanguageChange={onLanguageChange} />
          <CodeEditor
            language={language}
            templateCode={templateCode}                // 현재 templateCode 전달
            onCodeChange={setTemplateCode}       // 상태 변경 콜백 전달
            C={templates.C}
            Javascript={templates.Javascript}
            Java={templates.Java}
            Python={templates.Python}
            {...{ "C++": templates["C++"] }}
          />
        </Panel>
        <PanelResizeHandle className="h-2.5 min-h-2.5" />
        <Panel defaultSize={50} minSize={20} className="w-full h-full bg-[#FFFAF0] rounded-lg">
          {/* templateCode 상태를 Console에도 전달 */}
          <Console testResult={testResult} testCases={testCases} templateCode={templateCode} onRunClick={handleRunClick} />
        </Panel>
      </PanelGroup>
    </Panel>
  );
}