export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

type Category = string;
export type CategoriesResponse = Category[];

export interface NewWord {
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
}

export interface Word extends NewWord {
  _id: string;
  owner?: string;
  progress?: number;
}

export interface AllWords {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
}
