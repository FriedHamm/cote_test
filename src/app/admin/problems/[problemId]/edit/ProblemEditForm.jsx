'use client';
import {FormProvider, useForm} from "react-hook-form";
import ProblemForm from "@/app/admin/problems/ProblemForm";

export default function ProblemEditFormClient({
                                                defaultValue,
                                                problemId,
                                                initCode
                                              }) {
  const formMethods = useForm({
    shouldUnregister: true,
    reValidateMode: "onSubmit",
    defaultValues: defaultValue
  });

  const values = {...formMethods, initCode}

  return (
    <FormProvider {...values} >
      <ProblemForm
        endpoint={`/administrator/v1/cote/problem${problemId}`}
        method={'put'}
        successMessage={'문제가 정상적으로 수정되었습니다.'}
        // initCode={initCode}
      />
    </FormProvider>
  );
}