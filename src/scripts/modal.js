export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

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
