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

/* Form Validators */
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

const profileEditFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* Popup Instances */
const deleteCard = new PopupWithFormSubmit("#trash-popup");
const imagePopup = new PopupWithImage("#image-popup");
const avatarPopup = new PopupWithForm("#avatar-edit-popup", handleAvatarSubmit);
const profilePopup = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditSubmit
);
const cardPopup = new PopupWithForm("#add-card-popup", handleAddCardFormSubmit);

deleteCard.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

/* Get Initial Cards */
let cardList;
api.getInitialCards().then((initialCards) => {
  console.log("intialCards", initialCards);
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

  /* Get User Info */
  api
    .getUserInfo()
    .then((userInfo) => {
      console.log("User information retrieved successfully:", userInfo);
      if (userInfo) {
        document.querySelector(".profile__image").src = userInfo.avatar;
      } else {
        console.error("Invalid user information received");
      }
    })
    .catch((error) => {
      console.error("Error getting user information:", error);
    });
});

/* Profile Image Click Handler */
const profileImage = document.querySelector(".profile__image");
profileImage.addEventListener("click", () => {
  avatarPopup.open();
});

/* Handlers */
function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

function handleProfileEditSubmit(inputValues) {
  const updatedData = {
    name: inputValues.name,
    about: inputValues.about,
  };

  // Change button text to "Saving..."
  profilePopup.setLoadingState(true);

  api
    .updateUserProfile(updatedData)
    .then((updatedUserInfo) => {
      userProfile.setUserInfo(updatedUserInfo);
      console.log("User profile updated successfully:", updatedUserInfo);
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
    })
    .finally(() => {
      // Reset button text to its original state
      profilePopup.setLoadingState(false);
    });
}
function handleAvatarSubmit({ avatar }) {
  // Change button text to "Saving..."
  avatarPopup.setLoadingState(true);

  api
    .updateAvatar({ avatar: avatar })
    .then((updatedUserInfo) => {
      console.log("Avatar updated successfully:", updatedUserInfo);
      document.querySelector(".profile__image").src = updatedUserInfo.avatar;
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      // Reset button text to its original state
      avatarPopup.setLoadingState(false);
    });
}

function handleFormSubmit() {
  userProfile.setUserInfo(inputValues);
}

function handleAddCardFormSubmit({ name, link }) {
  // Change button text to "Saving..."
  cardPopup.setLoadingState(true);

  api
    .createCard({ name, link })
    .then((createdCard) => {
      console.log("Card created successfully", createdCard);
      const cardElement = renderCard(createdCard);
      cardList.addItem(cardElement);
    })
    .catch((error) => {
      console.error("Error creating card", error);
    })
    .finally(() => {
      // Reset button text to its original state
      cardPopup.setLoadingState(false);
    });
}

function renderCard(cardData) {
  console.log("cardData", cardData);
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleFormSubmit
  );
  return card.getView();
}

/* Form Listeners */
profileEditButton.addEventListener("click", () => {
  profilePopup.open();
  const userData = userProfile.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  profileEditFormValidator.resetValidation();
});

/* Add new card */
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  cardPopup.open();
});

/* Popup With Form Submit for Delete Card */
function handleDeleteClick(card) {
  const cardId = card.getId();

  if (!cardId) {
    console.error("Invalid cardId format. Must be a valid ObjectId.");
    return;
  }

  deleteCard.open();

  deleteCard.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCardElement();
        deleteCard.close();
      })
      .catch((error) => {
        console.error("Error deleting card", error);
      });
  });
}
