'use client'
import {InformationCircleIcon} from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";
import Link from "next/link";

export default function InfoAlert({id, message, link, onClose}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      // 일정 시간 후에 사라지면 onClose 콜백 호출하여 alert 제거
      onClose && onClose(id)
    }, 3000)

  }, [])

  if (!visible) return null

  return (
    <div className="rounded-md bg-blue-50 p-4 z-50 mx-auto">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400"/>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700 break-words">{message}</p>
          {link &&
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <Link href={link.href} className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                {link.title}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>}
        </div>
      </div>
    </div>
  )
}
