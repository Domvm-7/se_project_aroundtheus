import { api } from "../components/Api.js";

export default class Card {
  constructor(
    { name, link, _id, isLiked },
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
    this._id = _id;
    this._isLiked = isLiked;
  }

  _handleLikeButtonClick = () => {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_active"
    );
    if (isLiked) {
      this._handleDislike();
    } else {
      this._handleLike();
    }
  };

  _handleLike() {
    api
      .likeCard(this._id)
      .then((updatedCard) => {
        console.log("Card liked successfully", updatedCard);
        this._likeButton.classList.add("card__like-button_active");
      })
      .catch((error) => {
        console.error("Error liking card", error);
      });
  }

  _handleDislike() {
    api
      .dislikeCard(this._id)
      .then((updatedCard) => {
        console.log("Card disliked successfully", updatedCard);
        this._likeButton.classList.remove("card__like-button_active");
      })
      .catch((error) => {
        console.error("Error disliking card", error);
      });
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();
    const popup = document.getElementById("trash_button");
    popup.classList.remove("popup__active");
    this._cardElement.remove();
  };
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

  getId() {
    return this._id;
  }

  removeCardElement() {
    this._cardElement.remove();
  }
}
