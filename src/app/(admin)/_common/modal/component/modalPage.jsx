// components/Modal.js
import React from 'react';

const Modal = ({ onClose, onConfirm }) => {
 

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Are you sure! you want to delete this item?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-confirm">Yes</button>
          <button onClick={onClose} className="btn-cancel">No</button>
        </div>
      </div>
      <style jsx>{`.modal-overlay {
    position: absolute;
    z-index: 9999999;
    background: #000000ad;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
}
.modal {
    max-width: 500px;
    margin: auto;
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    width: 100%;
}`}</style>
    </div>
  );
};

export default Modal;
