import css from "./Modal.module.css";

interface ModalProps {
  readonly children: React.ReactNode;
  readonly onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
