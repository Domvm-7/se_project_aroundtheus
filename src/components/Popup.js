export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popupElement = document.querySelector(popupSelector);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.closePopupByEscape = this.closePopupByEscape.bind(this);
    this.closeByOutsideClick = this.closeByOutsideClick.bind(this);
  }

  openPopup() {
    this.popupElement.classList.add("popup__opened");
    document.addEventListener("click", this.closeByOutsideClick);
    document.addEventListener("keydown", this.closePopupByEscape);
  }

  closePopup() {
    this.popupElement.classList.remove("popup__opened");
    document.removeEventListener("click", this.closeByOutsideClick);
    document.removeEventListener("keydown", this.closePopupByEscape);
  }

  closePopupByEscape(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup__opened");
      this.closePopup(openedPopup);
    }
  }

  closeByOutsideClick(e) {
    if (e.target.classList.contains("popup")) {
      const popup = document.querySelector(".popup__opened");
      this.closePopup(popup);
    }
  }

  setEventListeners() {
    this.popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", this.closePopup);
    this.popupElement.addEventListener("click", this.closeByOutsideClick);
  }
}
