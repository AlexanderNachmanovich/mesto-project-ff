import { openPopup, closePopup, handleEscClose } from "./modal.js";
import {
  createCard,
  deleteCard,
  toggleLike,
  deleteCardFromServer,
} from "./card.js";
import {
  getUserInfo,
  getCards,
  updateProfile,
  createCardOnServer,
  updateAvatar,
} from "./api.js";
import { validationSettings, enableValidation } from "./validation.js";
import "../index.css";
import "../images/avatar.jpg";
import "../images/logo.svg";

const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formAddCard = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const avatarPopup = document.querySelector(".popup_type-avatar");
const formAvatarUpdate = document.querySelector(
  '.popup__form[name="avatar-form"]',
);
export function showImagePopup(name, link) {
  const imagePopupImage = document.querySelector(
    ".popup_type_image .popup__image",
  );
  const imagePopupCaption = document.querySelector(
    ".popup_type_image .popup__caption",
  );
  imagePopupImage.src = link;
  imagePopupImage.alt = `${name}`;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

document.querySelector(".profile__image").addEventListener("click", () => {
  openPopup(avatarPopup);
});

function setEventListeners() {
  formEditProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const submitButton = formEditProfile.querySelector(".popup__button");
    submitButton.textContent = "Сохранение..."; // Изменение текста кнопки
    updateProfile(nameInput.value, jobInput.value)
      .then((updatedUserData) => {
        profileName.textContent = updatedUserData.name;
        profileDescription.textContent = updatedUserData.about;
        closePopup(editPopup);
      })
      .catch((err) => {
        console.error("Ошибка при обновлении данных профиля:", err);
      })
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const submitButton = formAddCard.querySelector(".popup__button");
    submitButton.textContent = "Сохранение..."; // Изменение текста кнопки на "Сохранение..."
    createCardOnServer(cardNameInput.value, cardLinkInput.value)
      .then((newCardData) => {
        const newCardElement = createCard(newCardData, newCardData.owner._id);
        placesList.prepend(newCardElement);
        closePopup(addPopup);
        formAddCard.reset();
      })
      .catch((err) => {
        console.error("Ошибка при добавлении карточки:", err);
      })
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  document.querySelectorAll(".popup__close").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const popup = closeButton.closest(".popup");
      closePopup(popup);
    });
  });

  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        closePopup(popup);
      }
    });
  });

  formAvatarUpdate.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const submitButton = formAvatarUpdate.querySelector(".popup__button");
    const avatarLink = formAvatarUpdate.querySelector(
      ".popup__input_type_url",
    ).value;

    submitButton.textContent = "Сохранение...";

    updateAvatar(avatarLink)
      .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closePopup(avatarPopup);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  });

  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
      openPopup(editPopup);
    });

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      openPopup(addPopup);
    });
}

function loadInitialData() {
  Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      const userId = userData._id;
      cardsData.forEach((card) => {
        const cardElement = createCard(card, userId);
        placesList.appendChild(cardElement);
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });
}

function initializeValidation() {
  enableValidation(validationSettings);
}

function initializeApp() {
  setEventListeners();
  loadInitialData();
  initializeValidation();
}

document.addEventListener("DOMContentLoaded", initializeApp);
