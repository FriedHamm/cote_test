'use client'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ProblemNav from "@/app/problem/ProblemNav";
import {createContext, memo,  useRef, useState} from "react";
import CodeEditor from "@/app/problem/CodeEditor";
import CodeEditorNavbar from "@/app/problem/CodeEditorNavbar";
import Console from "@/app/problem/Console";
import {ConsoleProvider} from "@/app/problem/ConsoleContext";
import {CodeExecutionProvider} from "@/app/problem/CodeExcutionContext";
import dynamic from "next/dynamic";
import {usePathname} from "next/navigation";

export const ProblemContext = createContext(null);

// initCode의 형태는
// {language: {language, languageId, code}}

const Description = dynamic(() => import("@/app/problem/[problemId]/Description"));
const SubmissionResult = dynamic(() => import("@/app/problem/[problemId]/SubmissionResult"));

export default function ProblemContent({children, problemDetail, initCode = {}, title}) {
  const pathname = usePathname();
  const curTab = pathname.split("/").pop();
  const languages = useRef(Object.keys(initCode)); // EditorNav에서 사용함
  const codes = useRef(JSON.parse(JSON.stringify(initCode)));
  const [curLanguage, setCurLanguage] = useState(languages.current[0]); // setCurLanguage는 EditorNav에서 사용
  const [curCode, setCurCode] = useState(codes?.current?.[curLanguage]?.code);

  const handleResetClick = () => {
    codes.current[curLanguage].code = initCode[curLanguage].code;
    setCurCode(initCode[curLanguage].code);
  }

  const handleCodeChange = (code) => {
    setCurCode(code);
    codes.current[curLanguage].code = code;
  }

  const handleLanguageChange = (language) => {
    // 현재 언어의 코드를 먼저 저장합니다.
    codes.current[curLanguage].code = curCode;

    // 언어를 변경합니다.
    setCurLanguage(language);

    // 새 언어에 저장된 코드를 불러옵니다.
    setCurCode(codes.current[language].code);
  }

  let CurTabComponent;

  if (curTab === 'description') {
    CurTabComponent = <Description/>;
  } else if (curTab === 'submission-result') {
    CurTabComponent = <SubmissionResult/>;
  } else {
    CurTabComponent = <Description/>;
  }

  return (
    <ProblemContext.Provider value={{
      languages: languages.current,
      title,
      problemId: problemDetail?.problem_id,
      description: problemDetail?.description,
      runTestCase: problemDetail?.run_testcase,
      submitTestCase: problemDetail?.submit_testcase
    }}>
      <ConsoleProvider>
        <CodeExecutionProvider curLanguage={curLanguage} codes={codes} problemId={problemDetail?.problem_id}>
          {/*{여긴 데스크톱}*/}
          <DesktopView curLanguage={curLanguage} curCode={curCode} handleResetClick={handleResetClick} handleLanguageChange={handleLanguageChange} handleCodeChange={handleCodeChange}>
            {CurTabComponent}
          </DesktopView>

          <MobileView curLanguage={curLanguage} curCode={curCode} handleResetClick={handleResetClick} handleLanguageChange={handleLanguageChange} handleCodeChange={handleCodeChange}>
            {CurTabComponent}
          </MobileView>
        </CodeExecutionProvider>
      </ConsoleProvider>
    </ProblemContext.Provider>
  )
}

function DesktopView({children, curLanguage, handleLanguageChange, curCode, handleCodeChange, handleResetClick}) {
  return (
    <div className="hidden md:block h-full p-3">
      <PanelGroup direction="horizontal">
        <DesktopProblemInfoSection>
          {children}
        </DesktopProblemInfoSection>
        <PanelResizeHandle className="w-2.5 min-w-2.5 hidden md:block"/>
        <Panel defaultSize={50} minSize={30} className="hidden md:block">
          <PanelGroup direction="vertical">
            <DesktopCodeEditorSection curLanguage={curLanguage} handleLanguageChange={handleLanguageChange} curCode={curCode} setCurCode={handleCodeChange} handleResetClick={handleResetClick} />
            <PanelResizeHandle className="h-2.5 min-h-2.5"/>
            <DesktopConsoleSection/>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}

const DesktopProblemInfoSection = memo(({children}) => {
  return (
    <Panel defaultSize={50} minSize={30} className="flex flex-col rounded-lg h-full bg-[#FFFAF0] shadow-md">
      <ProblemNav/>
      {children}
    </Panel>
  )
})

function DesktopCodeEditorSection({curLanguage, handleLanguageChange, curCode, setCurCode, handleResetClick}) {
  return (
    <Panel defaultSize={50} minSize={30} className="rounded-lg flex flex-col shadow-lg">
      <CodeEditorNavbar curLanguage={curLanguage} onLanguageChange={handleLanguageChange} onResetClick={handleResetClick} />
      <CodeEditor curLanguage={curLanguage} curCode={curCode} setCurCode={setCurCode}/>
    </Panel>
  )
}

const DesktopConsoleSection = memo(({}) => {
  return (
    <Panel defaultSize={50} minSize={20} className="bg-[#FFFAF0] rounded-lg shadow-lg">
      {/* templateCode 상태를 Console에도 전달 */}
      <Console/>
    </Panel>
  )
})

function MobileView({children, curLanguage, handleLanguageChange, curCode, handleCodeChange, handleResetClick}) {
  return (
    <div className="flex flex-col md:hidden bg-[#FFFAF0] mt-3 min-h-full">
      <MobileProblemInfoSection>
        {children}
      </MobileProblemInfoSection>
      <MobileCodeEditorSection curLanguage={curLanguage} handleLanguageChange={handleLanguageChange} curCode={curCode} setCurCode={handleCodeChange} handleResetClick={handleResetClick}/>
      <MobileConsoleSection/>
    </div>
  )
}

const MobileProblemInfoSection = memo(({children}) => {
  return (
    <div className="grow border-b-gray-300 border-b-2">
      <ProblemNav/>
      {children}
    </div>
  )
})

function MobileCodeEditorSection({curLanguage, handleLanguageChange, curCode, setCurCode, handleResetClick}) {
  return (
    <div className="border-b-gray-300 border-b-2">
      <CodeEditorNavbar curLanguage={curLanguage} onLanguageChange={handleLanguageChange} onResetClick={handleResetClick} />
      <CodeEditor curLanguage={curLanguage} curCode={curCode} setCurCode={setCurCode}/>
    </div>
  )
}

const MobileConsoleSection = memo(({}) => {
  return (
    <div className="bg-[#FFFAF0]">
      <Console/>
    </div>
  )

})