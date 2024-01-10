export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLike,
    handleDislike
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._cardElement = null;
    this._id = _id;
    this._isLiked = isLiked;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
  }

  _handleLikeButtonClick() {
    if (this._isLiked) {
      this._handleDislike(this);
    } else {
      this._handleLike(this);
    }
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    if (this._likeButton && this._trashButton && this._cardImageEl) {
      this._likeButton.addEventListener("click", this._handleLikeButtonClick);
      this._cardImageEl.addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
      this._trashButton.addEventListener("click", () =>
        this._handleDeleteClick(this)
      );
    } else {
      console.error(
        "Failed to set event listeners. One or more elements are undefined."
      );
    }
  }

  _updateLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _updateView() {
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    const cardImageEl = this._cardElement.querySelector(".card__image");

    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = "Image of " + this._name;

    this._updateLikeState();
  }

  getView() {
    console.log("Card getView called");
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");

    this._cardElement = cardTemplate.cloneNode(true);

    this._setEventListeners();
    this._updateView();

    return this._cardElement;
  }

  getId() {
    return this._id;
  }

  removeCardElement() {
    this._cardElement.remove();
  }

  setLikedState(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeState();
  }
}
