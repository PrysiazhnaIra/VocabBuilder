export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

type Category = string;
export type CategoriesResponse = Category[];

export interface Word {
  _id?: string;
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
  owner?: string;
  progress?: number;
}

export interface AllWords {
  results: Word[];
  totalPages?: number;
  page?: number;
  perPage?: number;
}

export interface GetWordsParams {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}

interface WordBodyPayload {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
}

export type UpdateWordBody = WordBodyPayload;
export type AddWordBody = WordBodyPayload;
