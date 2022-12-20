import { Fragment } from "react";
import ReactDOM from "react-dom";

import  "./Modal.css";

const Backdrop = ({ onClose }) => {
  return <div className={'backdrop'} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={'modal'}>
      <div className={'content'}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, onClose }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
