export interface Article {
  _id: string;
  headline: { main: string };
  snippet: string;
  lead_paragraph: string;
  news_desk: string;
  web_url: string;
  pub_date: string;
  byline: { original: string };
  multimedia: Array<{ url: string }>;
}

export interface NewsApiResponse {
  response: {
    docs: Array<Article>;
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}

export interface ThunkError {
  rejectValue: { message: string };
}
