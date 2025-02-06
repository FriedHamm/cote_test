import CodeMirror from "@uiw/react-codemirror";
import {useEffect, useState} from "react";
import {javascript} from "@codemirror/lang-javascript";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {java} from "@codemirror/lang-java";
import {solarizedLight} from "@uiw/codemirror-themes-all";
import {autocompletion} from "@codemirror/autocomplete";

// languageExtensions 객체의 키는 상위 컴포넌트에서 내려줄 language prop과 일치해야 합니다.
const languageExtensions = {
  Javascript: javascript(),
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
                                     language,
                                     templateCode,
                                     onTemplateCodeChange: setTemplateCode,
                                     C,
                                     Javascript,
                                     Java,
                                     Python,
                                     "C++": Cpp,
                                   }) {
  // templateCode와 현재 사용중인 언어의 CodeMirror extension 상태
  const [languageExtension, setLanguageExtension] = useState(languageExtensions[language]);

  // language 혹은 템플릿 코드 props가 변경될 때마다 templateCode 업데이트
  useEffect(() => {
    if (setTemplateCode) {
      switch (language) {
        case "C":
          setTemplateCode(C);
          break;
        case "C++":
          setTemplateCode(Cpp);
          break;
        case "Python":
          setTemplateCode(Python);
          break;
        case "Java":
          setTemplateCode(Java);
          break;
        case "Javascript":
        default:
          setTemplateCode(Javascript);
          break;
      }
    }

  }, [language, C, Cpp, Python, Java, Javascript]);

  // language prop이 바뀔 때마다 해당 언어에 맞는 CodeMirror extension 업데이트
  useEffect(() => {
    setLanguageExtension(languageExtensions[language]);
  }, [language]);

  // onChange 콜백은 CodeMirror에서 전달하는 값(코드 텍스트)을 받아 templateCode 상태를 업데이트합니다.
  const handleChange = (value) => {
    setTemplateCode(value);
  };

  return (
    <CodeMirror
      className="overflow-y-scroll flex-grow"
      value={templateCode}
      onChange={handleChange}
      height="100%"
      width="100%"
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