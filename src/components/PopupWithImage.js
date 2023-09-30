import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popup = this.popupElement.querySelector(popupSelector);
    this._image = this.popupElement.querySelector(".popup__image");
    this._caption = this.popupElement.querySelector(".popup__image-caption");
  }

  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = text;
    this._popupCaption.textContent = name;
    this.super.openPopup();
  }
}
