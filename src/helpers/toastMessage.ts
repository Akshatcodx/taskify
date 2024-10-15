import { toast } from "react-toastify";
import { DisplayToastProps } from "../Interfaces/interfaces";

export const TOAST_TYPES = {
  success: "Success",
  error: "Error",
  warning: "Warning",
};
export const displayToast = ({ msg, type }: DisplayToastProps) => {
  toast.dismiss(); //for removing previous toast message and showing other
  if (type === TOAST_TYPES["success"]) {
    toast.success(msg);
  } else if (type === TOAST_TYPES["warning"]) {
    toast.warn(msg);
  } else {
    toast.error(msg);
  }
};
