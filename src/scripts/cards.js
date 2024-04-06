// cards.js
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

export const initialCards = [
  {
    name: "Домбай",
    link: "https://static.tildacdn.com/tild6366-6565-4766-b266-363739393564/33.jpg",
  },
  { name: "Эльбрус", link: "https://cdn.culture.ru/c/70586.jpg" },
  {
    name: "Финский залив",
    link: "https://live.staticflickr.com/65535/48478280311_93b2eed794_c.jpg",
  },
  {
    name: "Карачаево-Черкессия",
    link: "https://s10.stc.all.kpcdn.net/russia/wp-content/uploads/2021/08/SHoaninskij_drevnehristianskij_hram__Karachaevo-CHerkesiya_Viki.jpg",
  },
  {
    name: "Карелия",
    link: "https://www.tutu.ru/c/wp-content/uploads/2023/07/ruskeala-4-1536x1024.jpg",
  },
  {
    name: "Полярный",
    link: "https://i.pinimg.com/736x/6f/d1/96/6fd196c1e5361bf638b4c948112702a4.jpg",
  },
];
