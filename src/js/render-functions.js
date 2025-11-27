import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Елементи DOM
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-button');

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Створення розмітки галереї
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Очищення галереї
export function clearGallery() {
  galleryEl.innerHTML = '';
}

// Показ лоадера
export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

// Приховування лоадера
export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

// Показ кнопки Load more
export function showLoadMoreButton() {
  loadMoreBtnEl.classList.remove('is-hidden');
}

// Приховування кнопки Load more
export function hideLoadMoreButton() {
  loadMoreBtnEl.classList.add('is-hidden');
}
