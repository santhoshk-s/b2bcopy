const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="bg-white p-4 rounded-lg z-10 max-w-md w-full mx-4">
            <button
              className="absolute top-2 right-2 text-black font-semibold hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
