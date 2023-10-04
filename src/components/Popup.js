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
    document.addEventListener("keydown", this.closePopupByEscape);
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.closePopupByEscape);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  closeByOutsideClick(e) {
    if (e.target.classList.contains("popup")) {
      this.close();
    }
  }

  closeByClick() {
    this.close();
  }

  setEventListeners() {
    this.popupElement.addEventListener("click", this.closeByOutsideClick);
    this.closeButton.addEventListener("click", this.closeByClick);
  }
}
