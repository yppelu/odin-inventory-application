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

export type CategoryItemRelationType = {
  id: number;
  category_id: number;
  item_id: number;
};

export type queriesType = {
  [key: string]: string;
};

export type addCategoryFormReturnType = {
  name: string;
  description?: string;
  image?: string;
};

export type addItemFormReturnType = {
  name: string;
  description?: string;
  price: number;
  categoryIds: number[];
  image?: string;
};
