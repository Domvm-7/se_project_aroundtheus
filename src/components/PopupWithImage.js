import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__image");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.openPopup();
  }

  close() {
    super.closePopup();
  }
}
