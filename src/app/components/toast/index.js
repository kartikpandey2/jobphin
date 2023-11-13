import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import cx from "classnames";
import { ErrorBadge, CheckBadgeIcon } from "../icon";

export default function Toast(props) {
  const { show, onClose, type, message } = props;

  let typeStyles = "";

  switch (type) {
    case "success": {
      typeStyles = "bg-success";
      break;
    }

    case "error": {
      typeStyles = "bg-error";
      break;
    }

    default: {
    }
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog onClose={onClose} className={"relative z-10"}>
        <div className="fixed top-4 left-0 right-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  typeStyles,
                  "max-w-md transform overflow-hidden rounded-xl px-6 py-3 text-left align-middle shadow-xl transition-all"
                )}
              >
                <div className={cx("flex font-medium text-white")}>
                  {type === "success" ? <CheckBadgeIcon /> : <ErrorBadge />}
                  <div className="pl-2">{message}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
