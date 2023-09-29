import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Wrappers */
const cardListEl = document.querySelector(".cards__list");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardImagePopup = document.querySelector("#image-popup");
const popupImageContainer = cardImagePopup.querySelector(".popup__image");

/* Buttons and other DOM */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditPopup.querySelector(".popup__close");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const imgPopupCloseButton = cardImagePopup.querySelector(".popup__close");

/* Form Data */
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

/* Funtions */
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

function handleImageClick(cardData) {
  console.log("Image was clicked");
  console.log(cardData);

  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardData.link;
  popupImage.alt = cardData.text;
  const popupCaption = document.querySelector(".popup__image-caption");
  popupCaption.textContent = cardData.name;

  openPopup(cardImagePopup);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditPopup);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardPopup);
  addCardForm.reset();
}

/* Form Listeners */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditPopup);
});

/* Add new card */
addNewCardButton.addEventListener("click", () => addCardPopup.openPopup());

addCardPopupCloseButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);

imgPopupCloseButton.addEventListener("click", () => {
  closePopup(cardImagePopup);
});

/* For Each Loop */
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

/* Form Validator*/
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileEditFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const CardPopup = new PopupWithForm("#add-card-popup");
CardPopup.openPopup();

const ImagePopup = new PopupWithImage("#image-popup");
ImagePopup.openPopup();
