'use client'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import CodeEditor from "@/components/problem page/CodeEditor";

export default function ProblemLayout({children}) {
  return (
    <div className="bg-[#FFF0F0] h-screen p-4">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={30} minSize={20} className="rounded-lg flex flex-col overflow-y-scroll">
          {children}
        </Panel>
        <PanelResizeHandle className="w-2.5"/>
        <Panel defaultSize={30} minSize={20} className="rounded-lg">
          <PanelGroup direction="vertical">
            <Panel defaultSize={30} minSize={30}>
              <CodeEditor/>
            </Panel>
            <PanelResizeHandle/>
            <Panel defaultSize={30} minSize={20}>
              right
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}

