'use client'
import { createContext, useState } from 'react';

export const ConsoleContext = createContext();

export const ConsoleProvider = ({ children }) => {
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [selectedTestResult, setSelectedTestResult] = useState(0);
  const [selectedConsoleTab, setSelectedConsoleTab] = useState(0);
  const [isRunLoading, setIsRunLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  return (
    <ConsoleContext.Provider value={{
      selectedTestCase,
      setSelectedTestCase,
      selectedTestResult,
      setSelectedTestResult,
      selectedConsoleTab,
      setSelectedConsoleTab,
      isRunLoading,
      setIsRunLoading,
      isSubmitLoading,
      setIsSubmitLoading
    }}>
      {children}
    </ConsoleContext.Provider>
  );
};