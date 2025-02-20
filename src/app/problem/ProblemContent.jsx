'use client'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ProblemNav from "@/app/problem/ProblemNav";
import {useState} from "react";
import CodeEditor from "@/app/problem/CodeEditor";
import CodeEditorNavbar from "@/app/problem/CodeEditorNavbar";
import Console from "@/app/problem/Console";

async function fetch() {

}

const languages = ['JavaScript', 'C++', 'C', 'Python', 'Java'];

// JavaScript, C++, C, Python, Java
export default function ProblemContent({ children }) {
  const [language, setLanguage] = useState(languages[0]);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  }

  return (
      <PanelGroup direction="horizontal" className="h-full pt-3 md:p-3">
        <Panel defaultSize={50} minSize={30} className="flex flex-col rounded-lg h-full bg-[#FFFAF0]">
          <ProblemNav/>
          {children}
        </Panel>
        <PanelResizeHandle className="w-2.5 min-w-2.5 hidden md:block"/>
        <CodeEditorContainer language={language} onLanguageChange={handleLanguageChange} />
      </PanelGroup>

  )
}

function CodeEditorContainer({ language, onLanguageChange:handleLanguageChange }) {

  return (
    <Panel defaultSize={50} minSize={30} className="hidden md:block">
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={30} className="rounded-lg flex flex-col">
          <CodeEditorNavbar language={language} onLanguageChange={handleLanguageChange} />
          <CodeEditor />
        </Panel>
        <PanelResizeHandle className="h-2.5 min-h-2.5" />
        <Panel defaultSize={50} minSize={20} className="bg-[#FFFAF0] rounded-lg">
          {/* templateCode 상태를 Console에도 전달 */}
          <Console />
        </Panel>
      </PanelGroup>
    </Panel>
  );
}