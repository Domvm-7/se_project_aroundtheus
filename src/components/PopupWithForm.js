import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this.popupElement.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.openPopup();
  }

  close() {
    this._popupForm.reset();
    super.closePopup();
  }
}
