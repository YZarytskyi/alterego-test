import axios from 'axios';
import { NewsApiResponse } from '../types/types';

const BASE_URL = 'https://api.nytimes.com';
const API_KEY = 'mScVMtCvTO7fBzSIQmgG1N6TAs3IXnic';

export const newsApi = {
  async getArticles(page: number = 0) {
    const { data } = await axios.get<NewsApiResponse>(
      `${BASE_URL}/svc/search/v2/articlesearch.json?page=${page}&api-key=${API_KEY}&limit=12`
    );
    return data;
  },
};
