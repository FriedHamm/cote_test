'use client'
import { useState, useRef, useEffect } from 'react';
import {MdKeyboardArrowDown, MdRefresh} from "react-icons/md";

export default function CodeEditorNavbar({ onLanguageChange }) {
  const languages = ['C', 'C++', 'Python', 'Javascript', 'Java'];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[3]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-3 gap-4 bg-[#FFFAF0] border-b flex items-center justify-between" ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 opacity-55"
      >
        <span>{selectedLanguage}</span>
        <MdKeyboardArrowDown />
      </button>
      <div className="opacity-55 flex items-center gap-1">
        <button>
          <MdRefresh/>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-10">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}