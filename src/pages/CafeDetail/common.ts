import {
  cafeDetailQuery_cafeDetail_cafe,
  cafeDetailQuery_cafeDetail_cafe_likedUsers,
  cafeDetailQuery_cafeDetail_cafe_menus,
} from "../../__generated__/cafeDetailQuery";
import { Category } from "../../__generated__/globalTypes";
import { myProfileQuery_myProfile_user } from "../../__generated__/myProfileQuery";

interface categoryProp {
  key: string;
  name: string;
  menu: cafeDetailQuery_cafeDetail_cafe_menus[] | null | undefined;
}

export const filterCategory = (
  cafe: cafeDetailQuery_cafeDetail_cafe | null | undefined,
) => {
  const category: categoryProp[] = [
    { key: Category.Beverage, name: "음료", menu: [] },
    { key: Category.Dessert, name: "디저트", menu: [] },
    { key: Category.Bread, name: "빵", menu: [] },
    { key: Category.Meal, name: "식사", menu: [] },
    { key: Category.Goods, name: "상품", menu: [] },
    { key: Category.Etc, name: "기타", menu: [] },
  ];

  category.map(
    (category) =>
      (category.menu =
        cafe &&
        cafe.menus &&
        cafe.menus.filter(
          (menu: { category: string }) => menu.category === category.key,
        )),
  );

  return category;
};

export const getIsLike = (
  cafe: cafeDetailQuery_cafeDetail_cafe | null | undefined,
  user: myProfileQuery_myProfile_user | null | undefined,
): boolean => {
  let isLike = false;
  if (cafe && cafe.likedUsers) {
    isLike =
      cafe.likedUsers.filter(
        (likeUser: cafeDetailQuery_cafeDetail_cafe_likedUsers) =>
          user && likeUser.id === user.id,
      ).length > 0;
  }

  return isLike;
};
