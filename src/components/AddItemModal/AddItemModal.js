import React from 'react';

import './AddItemModal.sass';

const AddItemModal = props => {
  return (
    <form className="add-item-modal">
      <i
        className="fas fa-arrow-left rocket-control__back-btn add-item-modal__close-btn"
        onClick={props.closeModal}
      />
      <h2 className="add-item-modal__header">Add a new goal</h2>
      <input
        id="modal-goal-title"
        className="add-item-modal__input"
        type="text"
        minLength="1"
        maxLength="20"
        placeholder="Title"
        required
      />
      <input
        id="modal-initial-step"
        className="add-item-modal__input"
        type="number"
        min="0"
        max="9998"
        maxLength="4"
        placeholder="Initial Step"
        required
        onKeyDown={e => {
          if (e.target.value.length === 1 && e.target.value[0] === '0')
            if (e.key.charCodeAt(0) > 47 && e.key.charCodeAt(0) < 58) e.preventDefault();
          if (['+', '-', '.', 'e'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={e => {
          props.resetInputsError();
          return e.target.value.length > 4
            ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
            : null;
        }}
      />
      <input
        id="modal-steps"
        className="add-item-modal__input"
        type="number"
        min="1"
        max="9998"
        maxLength="4"
        placeholder="Steps"
        required
        onKeyDown={e => {
          if (e.target.value.length === 0)
            if (e.key === '0') e.preventDefault();
          if (['+', '-', '.', 'e'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={e => {
          props.resetInputsError();
          return e.target.value.length > 4
            ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
            : null;
        }}
      />
      <button className="add-item-modal__btn" onClick={props.submitModal}>
        Submit
      </button>
    </form>
  );
};

export default AddItemModal;
