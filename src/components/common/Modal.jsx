const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Arrière-plan cliquable natif sans role="button" sur une div */}
      <button
        type="button"
        aria-label="Fermer la fenêtre modale"
        className="fixed inset-0 bg-black bg-opacity-50 border-none w-full h-full cursor-default"
        onClick={onClose}
      />
      
      {/* Contenu de la modale */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;