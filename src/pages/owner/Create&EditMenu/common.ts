import { Category } from "../../../__generated__/globalTypes";

export const CategoryList = [
  { name: "☕️ 음료", value: Category.Beverage },
  { name: "🍨 디저트", value: Category.Dessert },
  { name: "🍞 빵", value: Category.Bread },
  { name: "🍚 식사", value: Category.Meal },
  { name: "🎀 상품", value: Category.Goods },
  { name: "기타", value: Category.Etc },
];

export const getOption = (
  options: string[],
  additionalOptions: string[],
  getValues: Function,
) => {
  let list: {
    name: string;
    price?: number | undefined;
    optionItems?: {}[] | undefined;
  }[] = [];
  if (options.length > 0) {
    options.forEach((option) => {
      let itemList: {}[] = [];
      const name: string = getValues(`${option}_name`);
      const price: number = getValues(`${option}_price`);
      const items = additionalOptions.filter((item) => item.includes(option));
      if (items.length > 0) {
        items.forEach((item) => {
          const itemName: string = getValues(`${item}_name`);
          const itemPrice: string = getValues(`${item}_price`);
          const itemObj = { name: itemName, price: +itemPrice };
          if (itemName && itemName !== "") {
            itemList.push(itemObj);
          }
        });
      }
      if (name && name !== "") {
        let optionObj: {
          name: string;
          price?: number;
          optionItems?: {}[];
        } = {
          name,
          price: +price,
          ...(itemList && itemList.length > 0 && { optionItems: itemList }),
        };
        list.push(optionObj);
      }
    });
  }
  return list;
};
