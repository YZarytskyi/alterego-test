import axios from 'axios';
import { NewsApiResponse } from '../types/types';

export const newsApi = {
  async getArticles(page: number = 0) {
    const { data } = await axios.get<NewsApiResponse>(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?page=${page}&api-key=mScVMtCvTO7fBzSIQmgG1N6TAs3IXnic`
    );
    return data;
  },
};
