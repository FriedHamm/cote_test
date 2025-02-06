'use client';

import {Provider, useDispatch} from "react-redux";
import {store} from '@/store/store'
import {useEffect} from "react";
import {checkAuth} from "@/store/slices/authSlice";

export default function ProviderWrapper({children}) {

  return (
    <Provider store={store}>
      {children}
      <LoginChecker/>
    </Provider>
  )
}

function LoginChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return null;
}