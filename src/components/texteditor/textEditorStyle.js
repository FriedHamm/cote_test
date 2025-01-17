export const textEditorStyle = {
  // 1. Paragraph
  paragraph: 'leading-relaxed mb-2 text-gray-800',

  // 2. Blockquote
  blockquote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4',

  // 3. Bold
  bold: 'font-bold',

  // 4. BubbleMenu
  //    (BubbleMenu는 위치나 애니메이션 등 JS로 잡아줄 부분이 많아서
  //     아래 클래스는 컨테이너 혹은 래퍼에 적용해주면 돼)
  bubbleMenu: 'bg-white p-2 shadow-md border border-gray-200 rounded-md',

  // 5. Code
  code: `bg-gray-100 text-red-500 px-1 rounded font-mono text-sm before:content-[''] after:content-['']`,

  // 6. CodeBlock
  codeBlock: 'bg-gray-100 text-gray-700 p-3 rounded-md font-mono text-sm my-4',

  // 7. Document
  //    (일반적으로 Document 자체에 별도 스타일은 잘 안 줌)
  document: '',

  // 8. HardBreak
  //    (하드 브레이크는 줄바꿈 역할이므로 별도 스타일이 필요 없다면 비워둘 수 있음)
  hardBreak: '',

  // 9. HorizontalRule
  horizontalRule: 'my-6 border-t border-gray-300',

  // 10. Italic
  italic: 'italic',

  // 11. Link
  link: 'underline text-blue-600 hover:text-blue-800',

  // 12. ListItem
  //     (개별 li에 줄 스타일: 본인이 원하는 대로 사용.
  //      보통 ul, ol 스타일도 같이 잡아야 함)
  listItem: 'list-inside',

  // 13. Strike
  strike: 'line-through',

  // 14. Subscript
  subscript: 'align-sub text-xs',

  // 15. Superscript
  superscript: 'align-super text-xs',

  // 16. Text
  //     (Plain text는 특별한 스타일 없이 갈 수 있지만,
  //      전체 폰트 사이즈/컬러 통일을 위해 아래처럼 설정)
  text: 'text-base text-gray-900',
}