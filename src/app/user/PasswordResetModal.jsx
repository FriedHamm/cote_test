'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useForm} from "react-hook-form";
import passwordResetScheme from "@/yup/passwordResetScheme";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect} from "react";
import api from "@/axios/axiosConfig";
import {useDispatch} from "react-redux";
import {addAlert} from "@/store/slices/alertSlice";

export default function PasswordResetModal({open = false, setOpen}) {
  const {register, handleSubmit, formState: {errors}, reset} = useForm(
    {
      resolver: yupResolver(passwordResetScheme)
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async data => {
    const password = data.password;
    try {
      const response = await api.patch('/account/v1/user', { password });
      console.log(response);
      setOpen(false);
      dispatch(addAlert({type: 'info', message: '비밀번호가 정상적으로 변경되었습니다.'}));
    } catch (error) {
      const status = error.response?.status;

      if (status === 430) {
        dispatch(addAlert({type: 'warning', message: '올바른 요청이 아닙니다. 다시 시도해주세요.'}));
      } else if (status === 409) {
        // 이메일을 변경할 때에만 발생하는 케이스임. 지금은 신경 안써도 ㄱㅊ
      } else if (status === 500) {
        dispatch(addAlert({type: 'warning', message: '서버 에러가 발생하였습니다. 다시 시도해주세요.'}))
      }
        else {
          dispatch(addAlert({type: 'warning', message: '알 수 없는 에러가 발생하였습니다. 지속적으로 발생 시 문의 바랍니다.'}))
        }
      }
    }


  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                패스워드
              </label>
              <div className="mt-2 flex flex-col gap-2">
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="대문자, 숫자, 특수문자 포함 8~20자"
                  {...register("password")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="비밀번호를 확인해 주세요."
                  {...register("confirmPassword")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  비밀번호 변경하기
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
