'use client';
import {Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch} from "react-hook-form";
import TextEditor from "@/components/texteditor/TextEditor";
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Switch} from '@headlessui/react'
import CodeEditor from "@/app/problem/CodeEditor";
import api from "@/axios/axiosConfig";
import {formatLanguages} from "@/app/utils/formatLanguages";

const testLanguages = [
  {
    "id": 1,
    "language": "cpp"
  },
  {
    "id": 2,
    "language": "python"
  },
  {
    "id": 3,
    "language": "java"
  },
  {
    "id": 4,
    "language": "javascript"
  }
]

export default function ProblemCreationPage() {
  const method = useForm(
    {
      shouldUnregister: true,
      reValidateMode: 'onSubmit',
    }
  );

  return (
    <FormProvider {...method}>
      <ProblemCreationForm/>
    </FormProvider>
  )
}

function ProblemCreationForm(props) {
  const {control, register, handleSubmit, formState: {errors}, reset, setValue} = useFormContext();

  const [languages, setLanguages] = useState(testLanguages);

  const onSubmit = async form => {

    const initcode = form.initcode ? form.initcode.filter(item => item && item.template_code && item.language) : [];
    const maxconstraint = form.maxconstraint ? form.maxconstraint.filter(item => item && item.language && item.max_run_time && item.max_memory) : [];
    const run_testcase = form.run_testcase.reduce((acc, test, index) => {
      const inputObject = {};
      form.variables.forEach((variable, varIndex) => {
        // 입력값에 대해 무조건 JSON.parse를 시도
        inputObject[variable.name] = parseValue(test.input[varIndex] || '');
      });
      acc[String(index + 1)] = {
        input: inputObject,
        output: parseValue(test.output),
      };
      return acc;
    }, {});

    const submit_testcase = form.submit_testcase.reduce((acc, test, index) => {
      const inputObject = {};
      form.variables.forEach((variable, varIndex) => {
        // 입력값에 대해 무조건 JSON.parse를 시도
        inputObject[variable.name] = parseValue(test.input[varIndex] || '');
      });
      acc[String(index + 1)] = {
        input: inputObject,
        output: parseValue(test.output),
      };
      return acc;
    }, {});
    const { variables, ...rest } = form;
    const finalForm = {...rest, initcode, maxconstraint, run_testcase, submit_testcase, editorial: '', apply_db_constraints: true, tags: []};
    console.log('로그', finalForm);

    try {
      const response = api.post('administrator/v1/cote/problems', finalForm);
      console.log(response);
    } catch (error) {
      console.log('문제 넣는 과정에서 에러 발생', error);
    }

  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const {data} = await api.get('/cote/v1/languages');
        setLanguages(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLanguages();
  }, []);

  useEffect(() => {
    // editorValue가 TextEditor의 현재 값 (예: 에디터 인스턴스에서 가져온 값)
    setValue('description', '', {shouldValidate: true});
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">새로운 문제 만들기</h2>

        <div className="flex flex-col gap-6 mt-6">
          <section>
            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
              문제 제목
            </label>
            <input
              {...register('title', {required: '문제 제목을 입력해주세요.'})}
              id="title"
              type="text"
              placeholder="문제 제목을 입력하세요."
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </section>

          <section>
            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
              문제 설명
            </label>
            <div className="mt-2">
              <Controller
                id="description"
                name="description"
                defaultValue=""
                control={control}
                rules={{
                  required: '내용을 입력해주세요',
                  validate: (value) => {
                    if (value === undefined) return "내용을 입력해주세요."
                    // 1. DOMParser를 사용해 전달된 HTML 문자열을 파싱합니다.
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(value, 'text/html');

                    // 2. 파싱된 문서의 body에서 텍스트를 추출하고 앞뒤 공백을 제거합니다.
                    const text = doc.body.textContent.trim();

                    // 3. 텍스트가 비어있으면 false 대신 에러 메시지를 반환합니다.
                    return text !== "" || "내용을 입력해주세요.";
                  },
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <TextEditor
                    placeholder="문제의 내용을 입력해주세요."
                    onChange={onChange}
                    value={value}
                    error={error}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                )}
              />
            </div>
          </section>
          <VariableSection/>
          <LanguageSection languages={languages}/>
          <RunTestCaseSection/>
          <SubmitTestCaseSection/>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

function LanguageSection({languages}) {
  const formattedLanguages = formatLanguages(languages);

  return (
    <section className="overflow-hidden rounded-md bg-white shadow">
      <h3 className="block text-sm/6 font-medium text-gray-900">언어 선택</h3>
      <ul role="list" className="divide-y divide-gray-200 mt-2">
        {formattedLanguages.map((lang, index) => (
          <li key={lang.language} className="px-6 py-4 transition-all duration-1000 ease-in-out">
            <LanguageItem formattedLanguage={lang.formattedLanguage} language={lang.language} index={index}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

function LanguageItem({language, formattedLanguage, index}) {
  const {control, register} = useFormContext();
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 실제로 필드를 렌더링할지 여부
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  // 토글 on이면 바로 isMounted를 true로 만들어 DOM에 렌더링
  useLayoutEffect(() => {
    if (toggleEnabled) {
      setIsMounted(true);
    }
  }, [toggleEnabled]);

  // isMounted가 true일 때 실제 높이를 측정
  useLayoutEffect(() => {
    if (isMounted) {
      requestAnimationFrame(() => {
        setHeight(200);
      });
    }
  }, [isMounted]);

  const handleToggle = (isEnabled) => {
    if (!isEnabled) {
      // 닫을 때: 높이를 0으로 설정해 collapse 애니메이션 실행
      setHeight(0);
      setToggleEnabled(false);
    } else {
      // 열 때: 토글 on 상태를 먼저 변경하면, useLayoutEffect에서 isMounted를 true로 만듦
      setToggleEnabled(true);
    }
  };

  // transition이 끝나면, 토글이 off인 경우 DOM에서 제거
  const handleTransitionEnd = () => {
    if (!toggleEnabled) {
      setIsMounted(false);
    }
  };

  return (
    <section className="space-y-2">
      <div className="flex justify-between items-center">
        <h4>{formattedLanguage}</h4>
        <ToggleButton enabled={toggleEnabled} setEnabled={handleToggle}/>
      </div>

      {isMounted && (
        <div
          ref={contentRef}
          style={{
            height: height, // 숫자 값, 예: 200
            overflow: 'hidden',
            transition: 'height 500ms ease-in-out'
          }}
          className="flex flex-col"
          onTransitionEnd={handleTransitionEnd}
        >
          <input
            type="hidden"
            {...register(`initcode[${index}].language`)}
            value={language}
          />
          <Controller
            name={`initcode[${index}].template_code`}
            control={control}
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <CodeEditor
                curCode={value}
                setCurCode={onChange}
                curLanguage={formattedLanguage}
              />
            )}
          />
          <MaxConstraintItem index={index} language={language}/>
        </div>
      )}
    </section>
  );
}

function ToggleButton({enabled, setEnabled}) {

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
  )
}

function MaxConstraintItem({formattedLanguage, language, index}) {
  const {register} = useFormContext();
  return (
    <fieldset>
      <legend>제한 설정</legend>
      <input
        type="hidden"
        {...register(`maxconstraint[${index}].language`)}
        value={language}
      />
      <label>
        시간 제한:
        <input
          type="number"
          {...register(`maxconstraint[${index}].max_run_time`, {valueAsNumber: true})}
          placeholder="단위는 ms 입니다."
        />
      </label>
      <label>
        메모리 제한:
        <input
          type="number"
          {...register(`maxconstraint[${index}].max_memory`, {valueAsNumber: true})}
          placeholder="단위는 byte 입니다."
        />
      </label>
    </fieldset>
  )
}

function VariableSection() {
  const {register, control, watch} = useFormContext();
  const {fields: variableFields, append: appendVariable, remove: removeVariable} = useFieldArray({
    control,
    name: 'variables',
  });

  return (
    <section>
      <fieldset className="overflow-hidden rounded-md bg-white">
        <legend className="block text-sm/6 font-medium text-gray-900">매개 변수명</legend>
        {variableFields?.map((variable, index) => (
          <div className="flex gap-4 items-center mt-2" key={index}>
            <input
              {...register(`variables.${index}.name`, {required: '변수명을 입력하세요.'})}
              type="text"
              placeholder="변수명을 입력하세요."
              className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button type="button" onClick={() => removeVariable(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </button>
          </div>
        ))}
      </fieldset>
      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mt-2"
        onClick={() => appendVariable({name: ''})}
      >
        변수 추가하기
      </button>
    </section>
  )
}

const parseValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    // JSON.parse에 실패하면, 입력값이 유효한 JSON이 아니므로 원래 문자열 그대로 반환합니다.
    return value;
  }
};

function RunTestCaseSection() {
  const {register, control} = useFormContext();
  const variables = useWatch({
    control,
    name: 'variables'
  });
  const {fields: runTestCaseFields, append: runAppendTestCase, remove: runRemoveTestCase} = useFieldArray({
    control,
    name: 'run_testcase',
  });

  return (
    <section>
      <div className="divide-y divide-gray-200">
        <h3 className="text-base/7 font-semibold text-gray-900">예제 테스트케이스</h3>
        {runTestCaseFields.map((field, index) => (
          <div key={field.id} className="mt-2">
            <h4 className="text-sm/6 font-medium text-gray-900">{index + 1}</h4>
            <fieldset className="px-6 py-4">
              {variables.map((variable, varIndex) => (
                <label key={varIndex}>
                  <span className="text-nowrap text-sm/6 text-gray-600">{variable.name}</span>
                  <input
                    {...register(`run_testcase.${index}.input.${varIndex}`)}
                    type="text"
                    className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </label>

              ))}
              <label>
                <span className="text-nowrap text-sm/6 text-gray-600">출력값</span>
                <input
                  {...register(`run_testcase.${index}.output`)}
                  placeholder="Output"
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </label>
            </fieldset>
            <button type="button" onClick={() => runRemoveTestCase(index)} className="ml-auto block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mt-2"
        onClick={() => runAppendTestCase({input: [], output: ''})}
      >
        테스트케이스 추가하기
      </button>
    </section>
  )
}

function SubmitTestCaseSection() {
  const {register, control} = useFormContext();
  const variables = useWatch({
    control,
    name: 'variables'
  });
  const {fields: submitTestCaseFields, append: submitAppendTestCase, remove: submitRemoveTestCase} = useFieldArray({
    control,
    name: 'submit_testcase',
  });

  return (
    <section>
      <div className="divide-y divide-gray-200">
        <h3 className="text-base/7 font-semibold text-gray-900">제출용 테스트케이스</h3>
        {submitTestCaseFields.map((field, index) => (
          <div key={field.id} className="mt-2">
            <h4 className="text-sm/6 font-medium text-gray-900">{index + 1}</h4>
            <fieldset className="px-6 py-4">

              {variables.map((variable, varIndex) => (
                <label key={varIndex}>
                  <span className="text-nowrap text-sm/6 text-gray-600">{variable.name}</span>
                  <input
                    {...register(`submit_testcase.${index}.input.${varIndex}`)}
                    type="text"
                    className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </label>

              ))}
              <label>
                <span className="text-nowrap text-sm/6 text-gray-600">출력값</span>
                <input
                  {...register(`submit_testcase.${index}.output`)}
                  placeholder="Output"
                  className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </label>
            </fieldset>
            <button type="button" onClick={() => submitRemoveTestCase(index)} className="ml-auto block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mt-2"
        onClick={() => submitAppendTestCase({input: [], output: ''})}
      >
        테스트케이스 추가하기
      </button>
    </section>
  )
}
