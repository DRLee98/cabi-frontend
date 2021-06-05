import { Category } from "../../__generated__/globalTypes";

export const getCategoryName = (category: string) => {
  switch (category) {
    case Category.Beverage:
      return "음료";
    case Category.Dessert:
      return "디저트";
    case Category.Bread:
      return "빵";
    case Category.Meal:
      return "식사";
    case Category.Goods:
      return "상품";
    case Category.Etc:
      return "기타";
    default:
      return "기타";
  }
};
