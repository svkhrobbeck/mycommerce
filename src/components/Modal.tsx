import { FC } from "react";
import { createPortal } from "react-dom";

interface IModal {
  children: JSX.Element;
  isOpen: boolean;
  handleClose: () => void;
  type?: "notification" | "custom";
}

const Modal: FC<IModal> = ({ children, isOpen, handleClose, type = "custom" }): JSX.Element => {
  const toggleClass: string = isOpen ? "flex" : "hidden";

  return createPortal(
    <div className={`${toggleClass} fixed p-5 overflow-y-auto z-[1000] inset-0 bg-black bg-opacity-50 justify-center items-start`}>
      <div className="relative p-8 bg-white z-[3] max-w-[600px] w-full mt-[240px] rounded-lg">
        {type === "custom" && (
          <button onClick={handleClose} className="absolute top-[6px] right-[12px] text-blue-600 text-[17px]">
            close
          </button>
        )}
        <div>{children}</div>
      </div>
      {type === "custom" && <div className="absolute z-[1] inset-0" onClick={handleClose} />}
    </div>,
    document.body
  );
};

export default Modal;
