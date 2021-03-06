import { Category } from "../../../__generated__/globalTypes";

export const CategoryList = [
  { name: "βοΈ μλ£", value: Category.Beverage },
  { name: "π¨ λμ νΈ", value: Category.Dessert },
  { name: "π λΉ΅", value: Category.Bread },
  { name: "π μμ¬", value: Category.Meal },
  { name: "π μν", value: Category.Goods },
  { name: "κΈ°ν", value: Category.Etc },
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
