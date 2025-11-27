import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45295548-800e218e35273c9a8c48208a3';

const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15, // 🔹 15 елементів за запит
};

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      ...DEFAULT_PARAMS,
      q: query,
      page,
    },
  });

  return response.data; // саме data
}
