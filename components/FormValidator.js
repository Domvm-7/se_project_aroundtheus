export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
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
}

// Create an instance of FormValidator for each form
const formValidator = new FormValidator(settings, formElement);
formValidator.enableValidation();
