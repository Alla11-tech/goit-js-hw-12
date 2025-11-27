import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.form-input');
const loadMoreBtnEl = document.querySelector('.load-more-button');

const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
  event.preventDefault();

  const query = inputEl.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();

  await fetchAndRenderImages({ isLoadMore: false });
}

async function onLoadMoreClick() {
  await fetchAndRenderImages({ isLoadMore: true });
}

async function fetchAndRenderImages({ isLoadMore }) {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: apiTotalHits } = data;

    if (currentPage === 1) {
      totalHits = apiTotalHits;
    }

    if (!hits || hits.length === 0) {
      hideLoadMoreButton();
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits); // 🔹 тут додаються картки

    const totalPages = Math.ceil(totalHits / PER_PAGE);
    currentPage += 1;

    if (currentPage <= totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (isLoadMore) {
      smoothScrollAfterLoad();
    }
  } catch (error) {
    console.error(error);
    hideLoadMoreButton();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
