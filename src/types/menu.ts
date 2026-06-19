export type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tags?: string[];
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  description: string;
};

export type MenuState = {
  categories: MenuCategory[];
  items: MenuItem[];
};
