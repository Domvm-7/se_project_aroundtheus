export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closePopupByEscape = this._handleEscClose.bind(this);
    this.closeByOutsideClick = this.closeByOutsideClick.bind(this);
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("click", this.closeByOutsideClick);
    document.addEventListener("keydown", this.closePopupByEscape);
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("click", this.closeByOutsideClick);
    document.removeEventListener("keydown", this.closePopupByEscape);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  }

  closeByOutsideClick(e) {
    if (e.target.classList.contains("popup")) {
      const Popup = document.querySelector(".popup_opened");
      this.close(Popup);
    }
  }

  setEventListeners() {
    this.popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    this.popupElement.addEventListener("click", this.closeByOutsideClick);
  }
}
