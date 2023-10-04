export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closePopupByEscape = this._handleEscClose.bind(this);
    this.closeByOutsideClick = this.closeByOutsideClick.bind(this);
    this.closeByClick = this.closeByClick.bind(this);
    this.closeButton = this.popupElement.querySelector(".popup__close");
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("click", this.closeByOutsideClick);
    document.addEventListener("keydown", this.closePopupByEscape);
    document.addEventListener("click", this.closeButtons);
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("click", this.closeByOutsideClick);
    document.removeEventListener("keydown", this.closePopupByEscape);
    document.removeEventListener("click", this.closeButtons);
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

  closeByClick() {
    const Popup = document.querySelector(".popup_opened");
    this.close(Popup);
  }

  setEventListeners() {
    const popupImages = Array.from(
      this.popupElement.querySelectorAll(".popup__image")
    );

    this.popupElement.addEventListener("click", this.closeByOutsideClick);
    this.closeButton.addEventListener("click", this.closeByClick);
  }
}
