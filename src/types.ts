export type CategoryType = {
  id: number;
  name: string;
  description?: string;
  image?: string;
};

export type ItemType = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
};

export type queriesType = {
  [key: string]: string;
};

export type addCategoryFormReturnType = {
  name: string;
  description?: string;
  image?: string;
};
