'use client'
import WarningAlert from "@/components/alerts/WarningAlert";
import InfoAlert from "@/components/alerts/InfoAlert";
import {useDispatch, useSelector} from "react-redux";
import {removeAlert} from "@/store/slices/alertSlice";

export default function AlertContainer() {
  const dispatch = useDispatch()
  const alerts = useSelector(state => state.alerts.alerts)

  const handleClose = (id) => {
    dispatch(removeAlert(id))
  }

  if (!alerts.length) return null

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-4">
      {alerts.map((alert) => {
        let AlertComponent
        switch (alert.type) {
          case 'warning':
            AlertComponent = WarningAlert
            break
          case 'error':
            AlertComponent = ErrorAlert
            break
          case 'info':
            AlertComponent = InfoAlert
            break
          default:
            AlertComponent = WarningAlert
            break
        }
        return (
          <AlertComponent
            key={alert.id}
            id={alert.id}
            message={alert.message}
            onClose={handleClose}
            link={alert?.link}
          />
        )
      })}
    </div>
  )
}