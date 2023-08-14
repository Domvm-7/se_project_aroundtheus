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
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardImageModal = document.querySelector("#image-modal");
const modalImageContainer = cardImageModal.querySelector(".modal__image");

/* Buttons and other DOM */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const imgModalCloseButton = cardImageModal.querySelector(".modal__close");

/* Form Data */
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#card-url-input");

/* Funtions */
function closePopup(modal) {
  modal.classList.remove("modal__opened");
}
function openPopup(modal) {
  modal.classList.add("modal__opened");
}
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addCardForm.reset();
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");
  cardImageEl.addEventListener("click", () => {
    openPopup(cardImageModal);
    const modalImage = document.querySelector(".modal__image");
    modalImage.src = cardData.link;
    modalImage.alt = cardData.text;
    const modalCaption = document.querySelector(".modal__image-caption");
    modalCaption.textContent = cardData.name;
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.text;

  return cardElement;
}

/* Form Listeners */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});
profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

/* Add new card */
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

imgModalCloseButton.addEventListener("click", () => {
  closePopup(cardImageModal);
});
/* Esc Key Close */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closePopup(profileEditModal);
    closePopup(addCardModal);
    closePopup(cardImageModal);
  }
});

/* Click Outside Close */
function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("click", closeByOutsideClick);
}
function openPopup(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("click", closeByOutsideClick);
}

function closeByOutsideClick(e) {
  const modal = document.querySelector(".modal__opened");

  if (e.target.classList.contains("modal")) {
    closePopup(modal);
  }
}

/* For Each Loop */
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
