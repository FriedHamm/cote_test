'use client'
import { useState, useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function WarningAlert({ message, onClose, id }) {
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
    <div className="z-50 ">
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