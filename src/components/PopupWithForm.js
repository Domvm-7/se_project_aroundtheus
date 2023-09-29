import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(
      "#add-card-popup",
      "#profile-edit-popup"
    );
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
