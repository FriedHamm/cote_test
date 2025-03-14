import {fetchInitCode, fetchLanguage, fetchProblemDetail} from "@/app/problem/[problemId]/layout";
import ErrorGuard from "@/components/ErrorGuard";
import ProblemEditFormClient from "@/app/admin/problems/[problemId]/edit/ProblemEditForm";

export default async function ProblemEditPage({params}) {
  const {problemId} = await params;
  let errorMessage = [];
  let problemDetail;
  let initCode;
  let languages;

  try {
    problemDetail = await fetchProblemDetail(problemId);
  } catch (error) {
    errorMessage.push(error.message);
  }

  try {
    initCode = await fetchInitCode(problemId);
  } catch (error) {
    errorMessage.push(error.message);
  }

  try {
    languages = await fetchLanguage();
  } catch (error) {
    errorMessage.push(error.message);
  }

  if (errorMessage.length) {
    return <ErrorGuard errorMessage={errorMessage} redirectUrl={`/problems/1`}/>;
  }

  initCode = initCode.map(code => {
    const langData = languages.find(lang => lang.id === code.language_id);
    // language 키가 있거나 name 키가 있는지 확인합니다.
    const languageName = langData?.language;
    return {
      language: languageName,
      template_code: code.template_code
    };
  });

  const variables = Object.keys(problemDetail.problemDetail.run_testcase['1'].input).map(key => {
    return {name: key}
  });

  // 첫 번째 테스트케이스의 input 키 순서를 가져옵니다.
  const variableKeys = Object.keys(problemDetail.problemDetail.run_testcase['1'].input);

// run_testcase 배열 생성
  const run_testcase = Object.values(problemDetail.problemDetail.run_testcase).map((testCase, i) => {
    const inputArray = [];
    // 각 변수 순서대로 input 값을 JSON 문자열로 변환
    for (let varIndex = 0; varIndex < variableKeys.length; varIndex++) {
      inputArray[varIndex] = JSON.stringify(testCase.input[variableKeys[varIndex]]);
    }
    return {
      input: inputArray,
      output: JSON.stringify(testCase.output)
    };
  });

// submit_testcase 배열 생성
  const submit_testcase = Object.values(problemDetail.problemDetail.submit_testcase).map((testCase, i) => {
    const inputArray = [];
    for (let varIndex = 0; varIndex < variableKeys.length; varIndex++) {
      inputArray[varIndex] = JSON.stringify(testCase.input[variableKeys[varIndex]]);
    }
    return {
      input: inputArray,
      output: JSON.stringify(testCase.output)
    };
  });
  const defaultValue = {
    title: problemDetail.title,
    description: problemDetail.problemDetail.description,
    level: problemDetail.level,
    variables,
    run_testcase,
    submit_testcase,
    initcode: initCode
  };

  return (
    <ProblemEditFormClient
      defaultValue={defaultValue}
      problemId={problemId}
      initCode={initCode}
    />
  );
}