import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
const profileEditpopup = document.querySelector("#profile-edit-popup");
const addCardpopup = document.querySelector("#add-card-popup");
const profileEditForm = profileEditpopup.querySelector(".popup__form");
const addCardForm = addCardpopup.querySelector(".popup__form");
const cardImagepopup = document.querySelector("#image-popup");
const popupImageContainer = cardImagepopup.querySelector(".popup__image");

/* Buttons and other DOM */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditpopup.querySelector(".popup__close");
const addCardpopupCloseButton = addCardpopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const imgpopupCloseButton = cardImagepopup.querySelector(".popup__close");

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

  openPopup(cardImagepopup);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditpopup);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardpopup);
  addCardForm.reset();
}

/* Form Listeners */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditpopup);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditpopup);
});

/* Add new card */
addNewCardButton.addEventListener("click", () => openPopup(addCardpopup));

addCardpopupCloseButton.addEventListener("click", () =>
  closePopup(addCardpopup)
);

imgpopupCloseButton.addEventListener("click", () => {
  closePopup(cardImagepopup);
});

// /* Click Outside Close */
// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("click", closeByOutsideClick);
//   document.addEventListener("keydown", closepopupByEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("click", closeByOutsideClick);
//   document.removeEventListener("keydown", closepopupByEscape);
// }

// function closeByOutsideClick(e) {
//   if (e.target.classList.contains("popup")) {
//     const popup = document.querySelector(".popup_opened");
//     closePopup(popup);
//   }
// }

// /* Esc Key Close */
// function closepopupByEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

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
