"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import ToastContext, { toastInitState } from "./components/toast/context";
import Toast from "./components/toast";

const popins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [toastDetails, updateToastDetails] = useState(toastInitState);

  let timeoutId;

  const handleToastUpdate = (type, message) => {
    const newToastDetails = {
      show: true,
      type,
      message,
    };

    updateToastDetails(newToastDetails);
    timeoutId = setTimeout(() => updateToastDetails(toastInitState), 3000);
  };

  const handleToastClose = () => {
    updateToastDetails(toastInitState);
  };

  return (
    <html lang="en">
      <body className={popins.className}>
        <Toast onClose={handleToastClose} {...toastDetails} />
        <ToastContext.Provider
          value={{ toastDetails, toast: handleToastUpdate }}
        >
          {children}
        </ToastContext.Provider>
      </body>
    </html>
  );
}
