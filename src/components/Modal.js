import ReactDOM from "react-dom";

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className=" fixed inset-40 flex justify-center items-center m-auto">
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
