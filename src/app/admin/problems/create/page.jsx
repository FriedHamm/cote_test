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
import ProblemForm from "@/app/admin/problems/ProblemForm";

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
      <ProblemForm endpoint="/administrator/v1/cote/problems" method="post" successMessage="문제가 정상적으로 등록되었습니다."/>
    </FormProvider>
  )
}

// 기본 메모리 설정?..


// 분리를 해야하는데
// api를 받아야 하고..
// 음... method 부분에서 셋팅을 해야할듯
// 404 에러의 경우도 처리해야 함
// 정상 제출되었을 때 문구도 달리 해야하고..

