export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = null;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._likeButton.addEventListener("click", this._handleLikeButtonClick);
    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick({ name: this._name, link: this._link })
    );
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleFormSubmit = (event) => {
    event.preventDefault();
    const popup = document.getElementById("trash_button");
    popup.classList.remove("popup__active");
    this._cardElement.remove();
  };

  getView() {
    console.log("Card getView called");
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
