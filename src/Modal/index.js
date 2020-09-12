import React, { useState, useEffect } from 'react';
import './index.css';

export default function Modal({ data, onRequestClose }) {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <button type="button" onClick={onRequestClose}>
          X
        </button>

        <div style={{ display: 'float' }}>
          <div>
            <p className="modal__title">Team Name: </p>
            <p className="modal__title">Team Position: </p>
          </div>

          <div>
            <p className="modal__title">Total Wins: </p>
            <p className="modal__title">Total Draws: </p>
            <p className="modal__title">Total Loss: </p>
          </div>
        </div>
      </div>
    </div>
  );
}
