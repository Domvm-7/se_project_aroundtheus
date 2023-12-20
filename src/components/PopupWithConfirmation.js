import Popup from "./Popup.js";

class PopupWithFormSubmit extends Popup {
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    const submitButton = this._popupElement.querySelector(".popup__button");

    submitButton.addEventListener("click", () => {
      this._handleFormSubmit();
    });
  }
}
