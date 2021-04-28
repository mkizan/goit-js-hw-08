import images from "./gallery-items.js";

const listEl = document.querySelector(".js-gallery");
const modalOpenEl = document.querySelector(".js-lightbox");
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
const modalImageEl = document.querySelector(".lightbox__image");

const addElGallery = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};
const createGallery = images.map(addElGallery).join("");

listEl.insertAdjacentHTML("beforeend", createGallery);

listEl.addEventListener("click", onImageClick);
modalCloseBtn.addEventListener("click", onModalClose);
modalOpenEl.addEventListener("click", onOverlayClick);

function onImageClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) return;

  window.addEventListener("keydown", onEscapeKeydown);
  modalImageEl.src = "";
  modalOpenEl.classList.add("is-open");
  modalImageEl.src = e.target.dataset.source;
}

function onModalClose() {
  window.removeEventListener("keydown", onEscapeKeydown);
  modalOpenEl.classList.remove("is-open");
}

function onOverlayClick(e) {
  if (e.target.classList.contains("lightbox__overlay")) onModalClose();
}

function onEscapeKeydown(e) {
  if (e.code === "Escape") onModalClose();
}
