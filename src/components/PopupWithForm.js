import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleAvatarClick) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._handleAvatarClick = handleAvatarClick;
  }
  _getInputValues() {
    const inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
