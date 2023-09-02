export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");

    this._likeButton.addEventListener("click", this._handleLikeButtonClick);
    this._trashButton.addEventListener("click", this._handleTrashButtonClick);
  }

  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleTrashButtonClick = () => {
    this._cardElement.remove();
  };

  getView() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");

    this._cardElement = cardTemplate.cloneNode(true);

    const cardTitleEl = this._cardElement.querySelector(".card__title");
    const cardImageEl = this._cardElement.querySelector(".card__image");

    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = "Image of " + this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
