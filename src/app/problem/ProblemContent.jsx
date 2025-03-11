'use client'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ProblemNav from "@/app/problem/ProblemNav";
import {createContext, useRef, useState} from "react";
import CodeEditor from "@/app/problem/CodeEditor";
import CodeEditorNavbar from "@/app/problem/CodeEditorNavbar";
import Console from "@/app/problem/Console";
import api from "@/axios/axiosConfig";

export const ProblemContext = createContext(null);

// initCode의 형태는
// {language: {language, languageId, code}}

// 그럼 결과에서는 그 번호를 받아서 랜더링을 해야하는데..
// 그럼 애초에 이것도 하나 만들어 두어야 할 거 같기도 하고..

export default function ProblemContent({ children, problemDetail, initCode = {}, title}) {
  const languages = useRef(Object.keys(initCode));
  const codes = useRef(JSON.parse(JSON.stringify(initCode)));
  const [curLanguage, setCurLanguage] = useState(languages.current[0]);
  const curCode = codes?.current?.[curLanguage]?.code;

  console.log('모든 언어', codes.current);

  const handleRunClick = async () => {

    const data = {problem_id:problemDetail?.problem_id, language_id: codes.current[curLanguage].languageId, submitted_code: codes.current[curLanguage].code}
    try {
      const response = await api.post(`cote/v1/submissions?type=run`, data);
      console.log('실행 결과임', response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitClick = async () => {

    const data = {problem_id:problemDetail?.problem_id, language_id: codes.current[curLanguage].languageId, submitted_code: codes.current[curLanguage].code}
    try {
      const response = await api.post(`cote/v1/submissions?type=submit`, data);
      console.log('제출 결과임', response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLanguageChange = (language) => {
    setCurLanguage(language);
  }

  const setCurCode = code => {
    if (codes && codes.current) {
      codes.current[curLanguage].code = code;
    }
  }

  return (
    <ProblemContext.Provider value={{ onSubmitClick: handleSubmitClick, onRunClick:handleRunClick, title, problemId:problemDetail?.problem_id, description:problemDetail?.description, runTestCase:problemDetail?.run_testcase, submitTestCase:problemDetail?.submit_testcase}}>
      {/*{여긴 데스크톱}*/}
      <div className="hidden md:block h-full p-3">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30} className="flex flex-col rounded-lg h-full bg-[#FFFAF0] shadow-md">
            <ProblemNav/>
            {children}
          </Panel>
          <PanelResizeHandle className="w-2.5 min-w-2.5 hidden md:block"/>
          <CodeEditorContainer curCode={curCode} languages={languages.current} curLanguage={curLanguage} onLanguageChange={handleLanguageChange} setCurCode={setCurCode} />
        </PanelGroup>
      </div>

      {/*{여긴 모바일}*/}
      <div className="block md:hidden bg-[#FFFAF0] mt-3 h-full">
        <div className="border-b-gray-300 border-b-2 h-full overflow-y-scroll">
          <ProblemNav/>
          {children}
        </div>
        <div className="border-b-gray-300 border-b-2">
          <CodeEditorNavbar languages={languages.current} curLanguage={curLanguage} onLanguageChange={handleLanguageChange}/>
          <CodeEditor curLanguage={curLanguage} curCode={curCode} setCurCode={setCurCode}/>
        </div>
        <div className="bg-[#FFFAF0]">
          <Console/>
        </div>
      </div>
    </ProblemContext.Provider>
  )
}

function CodeEditorContainer({ languages, curLanguage, onLanguageChange: handleLanguageChange, curCode, setCurCode}) {

  console.log('여기는 컨테이너', curCode);

  return (
    <Panel defaultSize={50} minSize={30} className="hidden md:block">
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={30} className="rounded-lg flex flex-col shadow-lg">
          <CodeEditorNavbar languages={languages} curLanguage={curLanguage} onLanguageChange={handleLanguageChange}/>
          <CodeEditor curLanguage={curLanguage} curCode={curCode} setCurCode={setCurCode}/>
        </Panel>
        <PanelResizeHandle className="h-2.5 min-h-2.5" />
        <Panel defaultSize={50} minSize={20} className="bg-[#FFFAF0] rounded-lg shadow-lg">
          {/* templateCode 상태를 Console에도 전달 */}
          <Console />
        </Panel>
      </PanelGroup>
    </Panel>
  );
}