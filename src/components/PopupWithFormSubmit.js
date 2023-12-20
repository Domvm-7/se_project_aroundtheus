import Popup from "./Popup.js";

export default class PopupWithFormSubmit extends Popup {
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    const submitButton = this._popupElement.querySelector("trash-popup");

    submitButton.addEventListener("click", () => {
      this._handleFormSubmit();
    });
  }
}
