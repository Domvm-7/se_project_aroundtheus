export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this.formElement = formElement;
    this.inputEls = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this.submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    // Add event listeners to input elements
    this.inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._toggleButtonState();
      });
    });
  }

  processForm() {
    // Check field validity
    // Change submit button state
    // Add event handlers
  }

  enableValidation() {
    this._setEventListeners();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }

  disableValidation() {
    this.inputEls.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this.submitButton.classList.add(this._inactiveButtonClass);
    this.submitButton.disabled = true;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputEls.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.submitButton.classList.add(this._inactiveButtonClass);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(this._inactiveButtonClass);
      this.submitButton.disabled = false;
    }
  }
}
const formElement = document.querySelector(settings.formSelector);
const formValidator = new FormValidator(settings, formElement);
formValidator.enableValidation();
