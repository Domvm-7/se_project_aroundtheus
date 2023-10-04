import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
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

/* Buttons and other DOM */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

/* Form Data */
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

/* Funtions */
function handleImageClick(cardData) {
  imagePopup.open(cardData);
  console.log("hello");
}
function handleProfileEditSubmit(inputValues) {
  console.log(inputValues);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}
function handleAddCardFormSubmit({ name, link }) {
  const card = renderCard({ name, link }, cardListEl);
  cardList.addItem(card);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
}

/* Form Listeners */
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

/* Add new card */
addNewCardButton.addEventListener("click", () => cardPopup.open());

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

/* Popup With*/
const profilePopup = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm("#add-card-popup", handleAddCardFormSubmit);
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

/* Section */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardList.renderItems();

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const userProfile = new UserInfo(".profile__title", ".profile__description");
userProfile.getUserInfo();
