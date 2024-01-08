import Card from "../components/Card.js";
import { api } from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithFormSubmit from "../components/PopupWithFormSubmit.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../../utils/utils.js";
import "../pages/index.css";

/* Wrappers */
const cardListEl = document.querySelector(".cards__list");
const profileEditPopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

/* Buttons and other DOM */
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

/* Form Data */
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* Api Endpoints */
const userProfile = new UserInfo(".profile__title", ".profile__description");

const inputValues = {
  name: profileTitleInput.value,
  job: profileDescriptionInput.value,
};

console.log("inputValues", inputValues);

handleProfileEditSubmit(inputValues);

const profileImage = document.querySelector(".profile__image");
profileImage.addEventListener("click", () => {
  avatarPopup.open();
});

function handleAvatarClick() {
  avatarPopup.open();
}

function handleAvatarSubmit({ avatarUrl }) {
  api
    .updateAvatar({ avatar: avatarUrl })
    .then((updatedUserInfo) => {
      console.log("Avatar updated successfully:", updatedUserInfo);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });
}

let cardList;
api.getInitialCards().then((initialCards) => {
  console.log("initialCards", initialCards);
  cardList = new Section(
    {
      items: initialCards,
      renderer(item) {
        const cardElement = renderCard(item);
        this._container.appendChild(cardElement);
      },
    },
    ".cards__list"
  );
  cardList.renderItems();

  api.getUserInfo().then((userInfo) => {
    console.log(userInfo);

    if (userInfo) {
      userProfile.setUserInfo({
        name: userInfo.name,
        job: userInfo.about,
      });
    } else {
      console.error("Invalid user information received");
    }
  });
});

/* Funtions */
function handleImageClick(cardData) {
  imagePopup.open(cardData);
}
function handleProfileEditSubmit(inputValues) {
  userProfile.setUserInfo(inputValues);
}
function handleCardCreateSubmit({ name, link }) {
  const card = renderCard({ name, link }, cardListEl);
  cardList.addItem(card);

  api
    .createCard({ name, link })
    .then((createdCard) => {
      console.log("Card created successfully:", createdCard);
    })
    .catch((error) => {
      console.error("Error creating card:", error);
    });
}
function handleAddCardFormSubmit({ name, link }) {
  const card = renderCard({ name, link }, cardListEl);
  cardList.addItem(card);

  api
    .updateUserProfile(inputValues)
    .then((updatedUserInfo) => {
      console.log("User profile updated successfully:", updatedUserInfo);
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
    });
}
function handleFormSubmit() {}

/* Form Listeners */
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  const userData = userProfile.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileEditFormValidator.resetValidation();
});

/* Add new card */
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  cardPopup.open();
});

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

const cardPopup = new PopupWithForm(
  "#add-card-popup",
  handleAddCardFormSubmit,
  handleCardCreateSubmit
);
cardPopup.setEventListeners();

const deleteCard = new PopupWithFormSubmit("#trash-popup");
deleteCard.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const avatarPopup = new PopupWithFormSubmit(
  "#avatar-edit-popup",
  handleAvatarClick,
  handleAvatarSubmit
);
avatarPopup.setEventListeners();

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleFormSubmit
  );
  return card.getView();
}

/* Popup With Form Submit */
function handleDeleteClick(card) {
  deleteCard.open();

  deleteCard.setSubmitAction(() => {
    this._cardElement.remove();
    deleteCard.close();
    console.log(card);
  });
}
