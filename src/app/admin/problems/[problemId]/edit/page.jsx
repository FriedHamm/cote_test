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

  // run_testcase.${index}.input.${varIndex} // index는 테케 varIndex는 변수
  const run_testcase = Object.values(problemDetail.problemDetail.run_testcase).map(({input, output}, index) => {
    const inputObj = Object.values(input);
    return {
      input: inputObj,
      output
    }
  })

  const submit_testcase = Object.values(problemDetail.problemDetail.submit_testcase).map(({input, output}, index) => {
    const inputObj = Object.values(input);
    return {
      input: inputObj,
      output
    }
  })
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