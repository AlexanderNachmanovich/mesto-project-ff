// index.js
import { initialCards } from "./cards.js";
import { openPopup, closePopup, handleEscClose } from "./modal.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import "../index.css";
import "../images/avatar.jpg";
import "../images/logo.svg";

const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const imagePopupImage = document.querySelector(
  ".popup_type_image .popup__image",
);
const imagePopupCaption = document.querySelector(
  ".popup_type_image .popup__caption",
);
const formAddCard = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

function showImagePopup(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = `Изображение ${name}`;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData.name,
    cardData.link,
    deleteCard,
    toggleLike,
    showImagePopup,
  );
  placesList.appendChild(cardElement);
});

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup);
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(addPopup);
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    cardNameInput.value,
    cardLinkInput.value,
    deleteCard,
    toggleLike,
    showImagePopup,
  );
  placesList.prepend(newCard);
  closePopup(addPopup);
  formAddCard.reset();
});

const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});
