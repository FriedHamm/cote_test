'use client'
import { useState, useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function WarningAlert({ show, message, onClose, id }) {
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
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}