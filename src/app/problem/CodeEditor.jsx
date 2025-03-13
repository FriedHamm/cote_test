'use client'
import CodeMirror, {EditorView} from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {solarizedLight, solarizedDark, solarizedLightStyle} from "@uiw/codemirror-themes-all";
import {autocompletion} from "@codemirror/autocomplete";
import {forwardRef, useImperativeHandle, useRef} from "react";

const languageExtensions = {
  JavaScript: javascript(),
  "C++": cpp(),
  C: cpp(),
  Python: python(),
  Java: java()
};

const disableAutocomplete = autocompletion({
  override: [
    (context) => {
      return {from: context.pos, options: []};
    }
  ]
});

const CodeEditor = forwardRef(({editable = true, curLanguage = 'JavaScript', curCode = '', setCurCode = () => {}}, ref) => {
  // templateCode와 현재 사용중인 언어의 CodeMirror extension 상태
  const languageExtension = languageExtensions[curLanguage];
  const editorRef = useRef(null);

  const handleCodeChange = (value) => {
    setCurCode(value);
  };

  useImperativeHandle(ref, () => ({
    focus() {

      if (editorRef.current && editorRef.current.view) {
        editorRef.current.view.focus();
      }
    },
  }));

  return (
    <CodeMirror
      ref={editorRef}
      className="overflow-y-scroll flex-grow"
      value={curCode}
      onChange={handleCodeChange}
      editable={editable}
      readOnly={false}
      indentWithTab={true}
      basicSetup={{
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
      }}
      extensions={[languageExtension, disableAutocomplete, EditorView.lineWrapping]}
      theme={solarizedLight}
    />
  );
});

export default CodeEditor;