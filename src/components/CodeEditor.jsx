`use client`
import CodeMirror from "@uiw/react-codemirror";
import {useCallback, useState} from "react";
import {material} from "@uiw/codemirror-theme-material"
import {javascript}  from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";

const languageExtensions = {
  javascript: javascript(),
  cpp: cpp(),
  c: cpp(),
  python: python(),
  java: java()
}
export default function CodeEditor({language = "javascript", templateCode = "const"}) {
  const [value, setValue] = useState(templateCode);
  const handleChange = useCallback((value, viewUpdate) => {
    setValue(value);
  }, []);
  const languageExtension = languageExtensions[language];

  return (
    <CodeMirror
      value={value}
      onChange={handleChange}
      height="100%"
      width="100%"
      editable={true}
      readOnly={false}
      indentWithTab={true}
      theme={material}
      extensions={[languageExtension]}
      basicSetup={
        {
          lineNumbers: true,
          highlightActiveLineGutter: true,
          history: true,
          drawSelection: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          highlightActiveLine: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
        }
      }
    />
  )
}