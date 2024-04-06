import { createCard, deleteCard, toggleLike, initialCards } from "./cards.js";
import { openPopup, closePopup, handleEscClose } from "./modal.js";
import "../index.css";
import "../images/avatar.jpg";
import "../images/logo.svg";

document.addEventListener("DOMContentLoaded", function () {
  const placesList = document.querySelector(".places__list");
  const editPopup = document.querySelector(".popup_type_edit");
  const addPopup = document.querySelector(".popup_type_new-card");
  const imagePopup = document.querySelector(".popup__content_content_image");
  const closeButtons = document.querySelectorAll(".popup__close");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  function showImagePopup(name, link) {
    const popupImage = document.querySelector(
      ".popup_type_image .popup__image",
    );
    const popupCaption = document.querySelector(
      ".popup_type_image .popup__caption",
    );
    // Следующая строка выбирает весь попап, а не только контент изображения
    const popup = document.querySelector(".popup_type_image");

    popupImage.src = link;
    popupImage.alt = `Изображение ${name}`;
    if (popupCaption) {
      popupCaption.textContent = name;
    }

    openPopup(popup); // Теперь попап должен открываться корректно
  }

  initialCards.forEach(function (cardData) {
    const cardElement = createCard(
      cardData.name,
      cardData.link,
      deleteCard,
      toggleLike,
      showImagePopup,
    );
    placesList.appendChild(cardElement);
  });

  const formAddCard = document.querySelector(
    ".popup_type_new-card .popup__form",
  );
  const cardNameInput = formAddCard.querySelector(
    ".popup__input_type_card-name",
  );
  const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

  formAddCard.addEventListener("submit", function (evt) {
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

  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", function () {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
      openPopup(editPopup);
    });

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", function () {
      openPopup(addPopup);
    });

  document.querySelectorAll(".card__image").forEach((card) => {
    card.addEventListener("click", function () {
      showImagePopup(card.getAttribute("alt"), card.src);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const popup = event.target.closest(".popup");
      closePopup(popup);
    });
  });

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(event.target);
    }
  });

  const formEditProfile = document.querySelector(
    ".popup_type_edit .popup__form",
  );

  formEditProfile.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editPopup);
  });
});
