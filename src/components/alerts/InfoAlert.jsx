import { InformationCircleIcon } from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";
import Link from "next/link";

export default function InfoAlert({id, show, message, link, onClose}) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        // 일정 시간 후에 사라지면 onClose 콜백 호출하여 alert 제거
        onClose && onClose(id)
      }, 5000)
      return () => clearTimeout(timer) // 닫기 버튼이 존재할 때 의미가 생김. 그 때에는 언마운트가 빨리 될 것임. 닫기 버튼에는 아이디 값을 통해서 hide를 실행시켜야 함
    }
  }, [show, onClose])

  if (!visible) return null

  return (
    <div className="rounded-md bg-blue-50 p-4 fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{message}</p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0">
            <Link href={link.href} className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
              {link.title}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
