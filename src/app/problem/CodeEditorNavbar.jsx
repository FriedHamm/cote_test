import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

const languages = ['JavaScript', 'C++', 'C', 'Python', 'Java'];

function Tooltip({ children, targetRect }) {
  if (!targetRect) return null;

  // 버튼 중앙 위쪽에 위치하도록 계산 (동적으로 값이 필요한 부분은 inline style로 처리)
  const style = {
    left: targetRect.right,
    top: targetRect.top - targetRect.height, // 버튼 위 8px 간격
    transform: 'translateX(-100%)'
  };

  return createPortal(
    <p style={style} className="absolute z-50 whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded">
      {children}
    </p>,
    document.body
  );
}

export default function CodeEditorNavbar({ language = 'JavaScript', onLanguageChange: handleLanguageChange }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef(null);

  // 버튼의 위치를 가져와 tooltip의 위치를 업데이트
  useEffect(() => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [showTooltip]);

  function handleMouseEnter() {
    setShowTooltip(true);
  }

  function handleMouseLeave() {
    setShowTooltip(false);
  }

  return (
    <div className="bg-[#FFFAF0] p-2 flex items-center justify-between relative overflow-visible">
      <Listbox value={language} onChange={handleLanguageChange}>
        <div className="relative">
          <ListboxButton className="grid cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 truncate pr-6">{language}</span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
            {languages.map((lang) => (
              <ListboxOption
                key={lang}
                value={lang}
                className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{lang}</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      <button
        aria-label="code reset"
        className="relative"
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
        </svg>
      </button>

      {showTooltip && <Tooltip targetRect={buttonRect}>코드를 초기화 하려면 누르세요.</Tooltip>}
    </div>
  );
}