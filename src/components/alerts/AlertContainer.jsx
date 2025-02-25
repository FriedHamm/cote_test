'use client'
import {removeAlert} from "@/store/slices/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import WarningAlert from "@/components/alerts/WarningAlert";
import InfoAlert from "@/components/alerts/InfoAlert";

export default function AlertContainer() {
  const dispatch = useDispatch()
  const alerts = useSelector(state => state.alerts.alerts)

  const currentAlert = alerts[0]

  const handleClose = (id) => {
    dispatch(removeAlert(id))
  }

  if (!currentAlert) return null

  let AlertComponent
  switch (currentAlert.type) {
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
      id={currentAlert.id}  // id도 함께 전달
      show={currentAlert.show}
      message={currentAlert.message}
      onClose={handleClose}
      link={currentAlert?.link}
    />
  )
}