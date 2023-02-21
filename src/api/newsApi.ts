import axios, { AxiosRequestConfig } from 'axios';
import { NewsApiResponse } from '../types/types';

const BASE_URL = 'https://api.nytimes.com';
const API_KEY = 'mScVMtCvTO7fBzSIQmgG1N6TAs3IXnic';

export const newsApi = {
  async getArticles(page: number, query: string, signal?: AbortSignal) {
    const config: AxiosRequestConfig = { signal };
    let { data } = await axios.get<NewsApiResponse>(
      `${BASE_URL}/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=${API_KEY}`,
      config
    );
    data.response.docs = data.response?.docs?.map(article => ({
      ...article,
      _id: article._id.slice(15),
    }))
    return data;
  },
};
