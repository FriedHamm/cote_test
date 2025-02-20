'use client'
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {solarizedLight, solarizedDark, solarizedLightStyle} from "@uiw/codemirror-themes-all";
import {autocompletion} from "@codemirror/autocomplete";

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

export default function CodeEditor({
                                     curLanguage = 'JavaScript',
                                     curCode = '',
                                     setCurCode
                                   }) {
  // templateCode와 현재 사용중인 언어의 CodeMirror extension 상태
  const languageExtension = languageExtensions[curLanguage];

  const handleCodeChange = (value) => {
    setCurCode(value);
  };

  return (
    <CodeMirror
      className="overflow-y-scroll flex-grow"
      value={curCode}
      onChange={handleCodeChange}
      editable={true}
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
      extensions={[languageExtension, disableAutocomplete]}
      theme={solarizedLight}
    />
  );
}