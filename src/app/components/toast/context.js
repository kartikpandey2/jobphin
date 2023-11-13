import { createContext } from "react";

export const toastInitState = {
  show: false,
  type: "",
  message: "",
};

const ToastContext = createContext(toastInitState);

export default ToastContext;
