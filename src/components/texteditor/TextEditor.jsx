'use client'

import {useEditor, EditorContent, BubbleMenu} from '@tiptap/react'

import {RiH1, RiListOrdered} from "react-icons/ri";
import { RiH2 } from "react-icons/ri";
import { RiH3 } from "react-icons/ri";
import { RiDoubleQuotesL } from "react-icons/ri"; // 이건 나중에 넣을 예정
import { RiBold } from "react-icons/ri";
import { RiCodeFill } from "react-icons/ri";
import { RiCodeBlock } from "react-icons/ri";
import { RiItalic } from "react-icons/ri";
import { RiListUnordered } from "react-icons/ri";
import { RiStrikethrough } from "react-icons/ri";
import { RiSuperscript } from "react-icons/ri";
import { RiSubscript } from "react-icons/ri";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from '@tiptap/extension-text';
import Blockquote from '@tiptap/extension-blockquote'
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import HardBreak from "@tiptap/extension-hard-break";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {Heading} from "@tiptap/extension-heading";
import {Placeholder} from "@tiptap/extension-placeholder";
import {useEffect, useRef} from "react";

const baseClasses = 'p-2 rounded';
const activeClasses = 'bg-purple-500 hover:bg-purple-600';
const inactiveClasses = 'bg-transparent hover:bg-gray-300';

// editor는 editor 객체
// type은 플러그인 이름
// typeProps는 해당 플러그인의 속성?..
// toggleMethod는 말 그대로
const MenuButton = ({ editor, type, typeProps = null, toggleMethod, children }) => {
  const isActive = typeProps
    ? editor.isActive(type, typeProps)
    : editor.isActive(type);

  const handleClick = () => {
    console.log(toggleMethod)
    const chain = editor.chain().focus();
    if (typeProps) {
      chain[toggleMethod](typeProps);
    } else {
      chain[toggleMethod]();
    }
    chain.run();
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

// 이건 글 작성할 때 사용할 에디터임.
// prose에 텍스트 기본 색상이 정해져 있으니 수정하고 싶으면 수정 ㄱㄱ
// typography의 설정을 바꾸고 싶으면 tailwind 설정에서 바꿔야 함.
// 물론 내가 귀찮아서 prose를 사용하는 것임. 나중에 필요하면 지우고 다시 만들던가.. 해야함.. (귀찮지만..)
// Document, Text, Paragraph는 필수임, ListItem이랑 OrderedList, BulletList는 한 묶음임 하나라도 없으면 x

Heading.configure({
  levels: [1, 2, 3]
})

// errors는 react-hook-form에서만 사용되는 것임 일단은.. 포커스 용도로 쓰는 것. 그래서 보통은 undefined임
const TextEditor = ({ className, placeholder, initValue, value, onChange: handleChange, error }) => {

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading,
      Blockquote,
      Bold,
      Code,
      HardBreak,
      CodeBlock,
      HorizontalRule,
      Italic,
      ListItem,
      OrderedList,
      BulletList,
      Strike,
      Superscript,
      Subscript,
      Placeholder.configure({
        placeholder: placeholder
      })
    ],
    editorProps: {
      attributes: {
        class: `prose ${className}`,
      }
    },
    content: initValue || '',
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    }
  })

  useEffect(() => {
    if (editor){
      handleChange(initValue);
      editor?.commands?.setContent(initValue)
    }
  }, [editor, initValue])

  useEffect(() => {
    if (error?.message) editor?.commands?.focus();
  }, [error, editor])

  if (!editor) {
    return null;
  }

  return (
    <>
      <BubbleMenu editor={editor}>
        <div className={`bg-white border border-gray-200 rounded-lg shadow inline-flex p-1`}>
          <MenuButton editor={editor} type={'heading'} typeProps={{level: 1}} toggleMethod={'toggleHeading'}>
            <RiH1/>
          </MenuButton>
          <MenuButton editor={editor} type={'heading'} typeProps={{level: 2}} toggleMethod={'toggleHeading'}>
            <RiH2/>
          </MenuButton>
          <MenuButton editor={editor} type={'heading'} typeProps={{level: 3}} toggleMethod={'toggleHeading'}>
            <RiH3/>
          </MenuButton>
          <MenuButton editor={editor} type={'bold'} toggleMethod={'toggleBold'}>
            <RiBold/>
          </MenuButton>
          <MenuButton editor={editor} type={'italic'} toggleMethod={'toggleItalic'}>
            <RiItalic/>
          </MenuButton>
          <MenuButton editor={editor} type={'strike'} toggleMethod={'toggleStrike'}>
            <RiStrikethrough/>
          </MenuButton>
          <MenuButton editor={editor} type={'orderedList'} toggleMethod={'toggleOrderedList'}>
            <RiListOrdered/>
          </MenuButton>
          <MenuButton editor={editor} type={'bulletList'} toggleMethod={'toggleBulletList'}>
            <RiListUnordered/>
          </MenuButton>
          <MenuButton editor={editor} type={'codeBlock'} toggleMethod={'toggleCodeBlock'}>
            <RiCodeBlock/>
          </MenuButton>
          <MenuButton editor={editor} type={'code'} toggleMethod={'toggleCode'}>
            <RiCodeFill/>
          </MenuButton>
          <MenuButton editor={editor} type={'superscript'} toggleMethod={'toggleSuperscript'}>
            <RiSuperscript/>
          </MenuButton>
          <MenuButton editor={editor} type={'subscript'} toggleMethod={'toggleSubscript'}>
            <RiSubscript/>
          </MenuButton>
        </div>
      </BubbleMenu>
      <EditorContent editor={editor}/>
    </>
  )
}

export default TextEditor
