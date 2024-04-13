import { config } from "./api.js";
import { showImagePopup } from "./index";

export function createCard(data, userId) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    toggleLike(
      likeButton,
      data._id,
      likeButton.classList.contains("card__like-button_is-active"),
    ),
  );

  const likeCountElement = cardElement.querySelector(".like-button__count");
  likeCountElement.textContent = data.likes.length;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = `Изображение ${data.name}`;
  cardImage.addEventListener("click", () =>
    showImagePopup(data.name, data.link),
  );

  if (data.owner._id === userId) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
      deleteCardFromServer(data._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((err) => {
          console.error("Ошибка при удалении карточки:", err);
        });
    });
  } else {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.style.display = "none";
  }

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;

  return cardElement;
}

export function toggleLike(likeButton, cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active", !isLiked);
      const likeCountElement = likeButton.nextElementSibling;
      likeCountElement.textContent = data.likes.length;
    })
    .catch((err) => console.error("Ошибка при изменении статуса лайка:", err));
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    )
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
};
