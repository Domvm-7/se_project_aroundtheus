import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this.popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    // Store the initial text content of the submit button
    this._submitButtonText =
      this._popupForm.querySelector(".popup__button").textContent;
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

  setLoadingState(isLoading) {
    const submitButton = this._popupForm.querySelector(".popup__button");

    if (submitButton) {
      if (isLoading) {
        submitButton.textContent = "Saving...";
      } else {
        submitButton.textContent = this._submitButtonText;
      }
    } else {
      console.error("Submit button not found in the form.");
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
