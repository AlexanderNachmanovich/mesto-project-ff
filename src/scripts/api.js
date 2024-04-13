export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "10cab0b3-621c-43dd-94ed-66af12d577bc",
    "Content-Type": "application/json",
  },
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    )
    .catch((err) =>
      console.error("Ошибка при получении данных пользователя:", err),
    );
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    )
    .catch((err) => console.error("Ошибка при получении карточек:", err));
};

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getUserInfo(), getCards()])
    .then(([userData, cards]) => {
      console.log(userData, cards);
    })
    .catch((err) => console.error("Ошибка при загрузке данных:", err));
});

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => console.log("Ошибка при обновлении профиля:", err));
};

export const createCardOnServer = (name, link, likes) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`),
    )
    .catch((err) => console.error("Ошибка при создании карточки:", err));
  const cardLikeCount = cardElement.querySelector(".like-button__count");
  cardLikeCount.textContent = likes.length;
  return cardElement;
};

export const likeCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`),
    )
    .catch((err) =>
      console.error("Ошибка при постановке лайка на карточку:", err),
    );
};

export const unlikeCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`),
    )
    .catch((err) => console.error("Ошибка при снятии лайка с карточки:", err));
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarLink }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => console.error("Ошибка при обновлении аватара:", err));
};
