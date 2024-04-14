import { showImagePopup } from "./index.js";

export function createCard(data, userId, { onLike, onImageClick, onDelete }) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCountElement = cardElement.querySelector(".like-button__count");

  cardImage.src = data.link;
  cardImage.alt = `Изображение ${data.name}`;
  cardTitle.textContent = data.name;
  likeCountElement.textContent = data.likes.length;

  // Set active state of the like button if the user has liked the card
  likeButton.classList.toggle(
    "card__like-button_is-active",
    data.likes.some((like) => like._id === userId),
  );

  // Event listeners
  cardImage.addEventListener("click", () => onImageClick(data));
  likeButton.addEventListener("click", () => onLike(data, likeButton));

  // Show delete button only if the user is the owner of the card
  if (data.owner._id === userId) {
    deleteButton.addEventListener("click", () => onDelete(data, cardElement));
  } else {
    deleteButton.style.display = "none";
  }

  return cardElement;
}
