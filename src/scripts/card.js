export function createCard(name, link, deleteCard, toggleLike, showImagePopup) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => showImagePopup(name, link));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Изображение ${name}`;

  return cardElement;
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
