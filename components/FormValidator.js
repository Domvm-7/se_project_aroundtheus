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
  }

  processForm() {
    // Check field validity
    // Change submit button state
    // Add event handlers
  }

  enableValidation() {
    function enableValidation(options) {
      const formEls = [...document.querySelectorAll(options.formSelector)];
      formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
          e.preventDefault();
        });

        setEventListeners(formEl, options);
      });
    }
  }

  disableValidation() {
    // Disable button state
    // Reset form validation
  }

  showInputError(inputEl) {
    const errorMessageEl = this.formElement.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  hideInputError(inputEl) {
    const errorMessageEl = this.formElement.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }
  checkInputValidity(inputEl, options) {
    if (!inputEl.validity.valid) {
      return showInputError(this.formElement, inputEl, options);
    }
    hideInputError(inputEl, options);
  }
  hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// Create an instance of FormValidator for each form
const formValidator = new FormValidator(settings, formElement);
formValidator.enableValidation();
