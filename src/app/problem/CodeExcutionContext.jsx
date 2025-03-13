'use client';
import {createContext, useState, useCallback, useContext} from 'react';
import api from '@/axios/axiosConfig';

export const CodeExecutionContext = createContext({
  runResult: null,
  submitResult: null,
  setRunResult: () => {},
  setSubmitResult: () => {},
  onRunClick: async () => {},
  onSubmitClick: async () => {},
});

export const CodeExecutionProvider = ({ children, codes, curLanguage, problemId }) => {
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);


  const handleRunClick = useCallback(async () => {
    const data = {
      problem_id: problemId,
      language_id: codes.current[curLanguage].languageId,
      submitted_code: codes.current[curLanguage].code,
    };

    try {
      const response = await api.post(`cote/v1/submissions?type=run`, data);
      setRunResult(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response || error.request) {
        throw new Error(`코드를 실행하는데 문제가 발생하였습니다. ${error.status}`);
      } else {
        throw error;
      }
    }
  }, [codes, curLanguage]);

  const handleSubmitClick = useCallback(async () => {
    const data = {
      problem_id: problemId,
      language_id: codes.current[curLanguage].languageId,
      submitted_code: codes.current[curLanguage].code,
    };

    try {
      const response = await api.post(`cote/v1/submissions?type=submit`, data);
      setSubmitResult(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response || error.request) {
        throw new Error(`코드를 제출하는데 문제가 발생하였습니다. ${error.status}`);
      } else {
        throw error;
      }
    }
  }, [codes, curLanguage]);

  const contextValue = {
    runResult,
    submitResult,
    setRunResult,
    setSubmitResult,
    onRunClick: handleRunClick,
    onSubmitClick: handleSubmitClick,
  };

  return (
    <CodeExecutionContext.Provider value={contextValue}>
      {children}
    </CodeExecutionContext.Provider>
  );
};