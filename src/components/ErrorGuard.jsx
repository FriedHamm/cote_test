'use client'
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addAlert} from "@/store/slices/alertSlice";

export default function ErrorGuard({errorMessage = [], redirectUrl='/'}) {
  const router  = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    router.push(redirectUrl);
    errorMessage.forEach((error) => {
      dispatch(addAlert({type: 'warning', message: error}));
    })
  })

  return null;
}