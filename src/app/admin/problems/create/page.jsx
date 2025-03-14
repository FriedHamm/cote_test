'use client';
import {Controller, FormProvider, useFieldArray, useForm, useFormContext, useWatch} from "react-hook-form";
import TextEditor from "@/components/texteditor/TextEditor";
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Switch} from '@headlessui/react'
import CodeEditor from "@/app/problem/CodeEditor";
import api from "@/axios/axiosConfig";
import {formatLanguages} from "@/app/utils/formatLanguages";
import codeEditor from "@/app/problem/CodeEditor";
import {useDispatch} from "react-redux";
import {addAlert} from "@/store/slices/alertSlice";
import {PhotoIcon} from "@heroicons/react/16/solid";

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

// 기본 메모리 설정?..


// 분리를 해야하는데
// api를 받아야 하고..
// 음... method 부분에서 셋팅을 해야할듯
function ProblemCreationForm() {
  const {control, register, handleSubmit, formState: {errors}, reset, setValue} = useFormContext();

  const [languages, setLanguages] = useState(testLanguages);

  const dispatch = useDispatch();

  const onSubmit = async form => {

    console.log(form);
    // initcode의 경우에는 form에서 배열 형태로 관리되기 때문에, 필터링을 거쳐서 제대로된 배열로 수정함. template_code랑 language가 모두 작성되어 있어야 함.
    // const initcode = form.initcode ? form.initcode.filter(item => item && item.template_code && item.language) : [];
    // if (!initcode.length) {
    //   dispatch(addAlert({type: 'warning', message: "최소 한 언어에 대한 템플릿 코드를 작성해야 합니다."}));
    //   return;
    // }
    // // maxconstraint도 마찬가지임. 하나의 필드라도 입력하지 않았다면 maxconstraint에 들어가지 않음
    const maxconstraint = form.maxconstraint?.map(({language, max_run_time, max_memory}) => {
      return {language, max_run_time, max_memory: max_memory * 1024}
    })

    console.log(maxconstraint)

    if (!maxconstraint) {
      dispatch(addAlert({type: 'warning', message: "제한사항을 입력해야 합니다."}));
      return;
    }

    if (!form.variables.length) {
      dispatch(addAlert({type: 'warning', message: "최소 한개 이상의 매개변수를 포함해야 합니다."}));
      return;
    }

    let run_testcase = {};

    for (let index = 0; index < form.run_testcase.length; index++) {
      const test = form.run_testcase[index];
      const inputObject = {};
      for (let varIndex = 0; varIndex < form.variables.length; varIndex++) {
        try {
          inputObject[form.variables[varIndex].name] = JSON.parse(test.input[varIndex]);
        } catch (error) {
          dispatch(addAlert({
            type: 'warning',
            message: `예제 테스트케이스 ${index}번째 ${form.variables[varIndex].name}의 형식이 잘못되었습니다.`
          }));
          return;
        }
      }

      try {
        run_testcase[String(index + 1)] = {
          input: inputObject,
          output: JSON.parse(test.output),
        };
      } catch (error) {
        dispatch(addAlert({type: 'warning', message: `예제 테스트케이스 ${index}반쩨 츨략깂의 형식이 잘못되었습니다.`}));
      }
    }

    let submit_testcase = {};

    for (let index = 0; index < form.submit_testcase.length; index++) {
      const test = form.submit_testcase[index];
      const inputObject = {};
      for (let varIndex = 0; varIndex < form.variables.length; varIndex++) {
        try {
          inputObject[form.variables[varIndex].name] = JSON.parse(test.input[varIndex]);
        } catch (error) {
          dispatch(addAlert({
            type: 'warning',
            message: `실행 테스트케이스 ${index}번째 ${form.variables[varIndex].name}의 형식이 잘못되었습니다.`
          }));
          return;
        }
      }

      try {
        submit_testcase[String(index + 1)] = {
          input: inputObject,
          output: JSON.parse(test.output),
        };
      } catch (error) {
        dispatch(addAlert({type: 'warning', message: `실행 테스트케이스 ${index}번째 출력값의 형식이 잘못되었습니다.`}));
        return;
      }
    }

    const {variables, ...rest} = form;
    const finalForm = {
      ...rest,
      initcode,
      maxconstraint,
      run_testcase,
      submit_testcase,
      editorial: '',
      apply_db_constraints: true,
      tags: []
    };

    try {
      const response = await api.post('administrator/v1/cote/problems', finalForm);
      dispatch(addAlert({type: 'info', message: '문제가 정상적으로 등록되었습니다.'}));
      reset();
      setValue('variables', []);
    } catch (error) {
      if (error.response) {
        if (error.status === 403 || error.status === 401) {
          dispatch(addAlert({type: 'warning', message: '권한 없는 유저입니다.'}))
          // 라우팅을 해야하긴 함. 근데 말이 안되는 상황임.. 여기까지 어떻게 접근?..
        } else if (error.status === 403) {
          dispatch(addAlert({type: 'warning', message: '문제 제목이 중복이 아닌지 혹은 입력한 데이터가 정상적인지 확인 바랍니다.'}))
        } else if (error.status === 500) {
          dispatch(addAlert({type: 'warning', message: '내부 서버 에러입니다. 다시 시도해주세요.'}));
        }
      } else if (error.request) {
        dispatch(addAlert({type: 'warning', message: '네트워크를 먼저 확인하신 후 해결이 안된다면 문의 바랍니다.'}));
      } else {
        dispatch(addAlert({type: 'warning', message: error.message}));
      }
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
          {/*<button type="button" className="text-sm/6 font-semibold text-gray-900">*/}
          {/*  Cancel*/}
          {/*</button>*/}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            제출하기
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
            rules={{required: true}}
            render={({field: {onChange, value}, fieldState: {error}}) => {
              const editorRef = useRef(null);

              useEffect(() => {
                if (error && editorRef.current) {
                  editorRef.current.focus();
                }


              }, [error])
              return (
                <CodeEditor
                  ref={editorRef}
                  curCode={value}
                  setCurCode={onChange}
                  curLanguage={formattedLanguage}
                />
              )
            }}
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
  const {setValue} = useFormContext();

  useEffect(() => {
    setValue(`maxconstraint[${index}].max_run_time`, 1000);
    setValue(`maxconstraint[${index}].max_memory`, 200);
  },[]);

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
          {...register(`maxconstraint[${index}].max_run_time`,
            {
              valueAsNumber: true,
              required: true,
            })}
          placeholder="단위는 ms 입니다."
        />
      </label>
      <label>
        메모리 제한:
        <input
          type="number"
          {...register(`maxconstraint[${index}].max_memory`,
            {
              valueAsNumber: true,
              required: true,
            })}
          placeholder="단위는 mb 입니다."
        />
      </label>
    </fieldset>
  )
}

function JsonFileUpload({fieldName}) {
  const dispatch = useDispatch();
  const {setValue, watch} = useFormContext();

  async function handleJsonUpload(e) {

    const file = e.target.files[0];
    let text;

    try {
      text = await file.text();
    } catch (error) {
      dispatch(addAlert({type: 'warning', message: '파일을 읽는 중에 문제가 발생했습니다.'}));
      return;
    }

    let jsonObject;
    try {
      jsonObject = JSON.parse(text);
    } catch (error) {
      dispatch(addAlert({type: 'warning', message: '파일을 파싱하는 과정에서 문제가 발생했습니다.'}));
    }

    if (
      typeof jsonObject !== "object" ||
      Array.isArray(jsonObject) ||
      jsonObject === null
    ) {
      dispatch(addAlert({type: 'warning', message: 'JSON은 객체 형태여야 합니다.'}));
      return;
    }

    // props로 전달받은 filedName을 이용해 초기화 (예: run_testcase)
    setValue(fieldName, []);

    // JSON 객체에서 테스트 케이스 배열 추출
    const testCases = Object.values(jsonObject);

    if (testCases.length === 0) {
      dispatch(addAlert({type: 'warning', message: '업로드된 JSON에 테스트케이스가 없습니다.'}));
      return;
    }

// 첫 번째 테스트케이스의 input에서 변수 이름을 추출하여 variables 필드를 초기화
    const firstTestCase = testCases[0];
    if (!firstTestCase.hasOwnProperty('input') || typeof firstTestCase.input !== 'object' || firstTestCase.input === null || Array.isArray(firstTestCase.input)) {
      dispatch(addAlert({type: 'warning', message: '첫 번째 테스트케이스의 input 형식이 올바르지 않습니다.'}));
      return;
    }
    const variableKeys = Object.keys(firstTestCase.input);
    if (variableKeys.length === 0) {
      dispatch(addAlert({type: 'warning', message: '첫 번째 테스트케이스의 input에 변수가 없습니다.'}));
      return;
    }

// variables 필드를 JSON에서 추출한 변수명으로 초기화
    setValue('variables', [])
    setValue('variables', variableKeys.map(key => ({name: key})));

// props로 전달받은 filedName (예: run_testcase) 필드를 초기화
    setValue(fieldName, []);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      // input과 output 키가 모두 있는지 확인
      if (!testCase.hasOwnProperty("input") || !testCase.hasOwnProperty("output")) {
        dispatch(addAlert({
          type: "warning",
          message: `테스트 케이스 ${i + 1}에 input 또는 output 키가 존재하지 않습니다.`,
        }));
        return;
      }

      // input 값이 객체인지도 확인 (null은 객체가 아님)
      if (typeof testCase.input !== "object" || testCase.input === null || Array.isArray(testCase.input)) {
        dispatch(addAlert({type: "warning", message: `테스트 케이스 ${i + 1}의 input이 유효한 객체가 아닙니다.`}));
        return;
      }

      // 현재 테스트케이스의 input 키들을 추출하고 첫 번째 테스트케이스와 일치하는지 확인
      const currentKeys = Object.keys(testCase.input);
      if (currentKeys.length !== variableKeys.length || !variableKeys.every(key => currentKeys.includes(key))) {
        dispatch(addAlert({
          type: "warning",
          message: `테스트 케이스 ${i + 1}의 input 변수명이 일치하지 않습니다. 예상 변수: ${variableKeys.join(', ')}, 현재 변수: ${currentKeys.join(', ')}`
        }));
        return;
      }

      // input 객체의 값을 첫 번째 테스트케이스의 변수 순서대로 업데이트 (index 기반)
      for (let varIndex = 0; varIndex < variableKeys.length; varIndex++) {
        setValue(`${fieldName}.${i}.input.${varIndex}`, JSON.stringify(testCase.input[variableKeys[varIndex]]));
      }

      // output 값 업데이트: 예: run_testcase.0.output
      setValue(`${fieldName}.${i}.output`, JSON.stringify(testCase.output));
    }
  }

  return (
    <div>
      {/*<label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">*/}
      {/*  Cover photo*/}
      {/*</label>*/}
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="mx-auto size-12 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/>
          </svg>
          <div className="mt-4 flex text-sm/6 text-gray-600">
            <label
              htmlFor={`file-upload-${fieldName}`}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Json 형식으로 파일을 넣어보세요.</span>
              <input
                id={`file-upload-${fieldName}`}
                name={`file-upload-${fieldName}`}
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={handleJsonUpload}
              />
            </label>

          </div>
        </div>
      </div>
    </div>


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
        <JsonFileUpload fieldName="run_testcase"/>
        {runTestCaseFields.map((field, index) => (
          <div key={field.id} className="mt-2">
            <h4 className="text-sm/6 font-medium text-gray-900">{index + 1}</h4>
            <fieldset className="px-6 py-4">
              {variables.map((variable, varIndex) => (
                <label key={varIndex}>
                  <span className="text-nowrap text-sm/6 text-gray-600">{variable.name}</span>
                  <input
                    {...register(`run_testcase.${index}.input.${varIndex}`, {required: true})}
                    type="text"
                    className=" block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </label>

              ))}
              <label>
                <span className="text-nowrap text-sm/6 text-gray-600">출력값</span>
                <input
                  {...register(`run_testcase.${index}.output`, {required: true})}
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
        <JsonFileUpload fieldName="submit_testcase"/>
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
