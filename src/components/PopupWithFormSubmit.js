import Popup from "./Popup.js";

export default class PopupWithFormSubmit extends Popup {
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    const submitButton = this.popupElement.querySelector(".popup__button");

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
