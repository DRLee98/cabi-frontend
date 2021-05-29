import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    smallProfileImg
  }
`;

export const REPLY_FRAGMENT = gql`
  fragment ReplyFragment on Reply {
    id
    contents
    createdAt
    updatedAt
    writer {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    contents
    createdAt
    updatedAt
    rating {
      score
    }
    writer {
      ...UserFragment
    }
    reply {
      ...ReplyFragment
    }
  }
  ${USER_FRAGMENT}
  ${REPLY_FRAGMENT}
`;

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFragment on Address {
    id
    zonecode
    address
  }
`;

export const NUTRIENT_FRAGMENT = gql`
  fragment NutrientFragment on Nutrient {
    id
    volume
    calorie
    salt
    carbohydrate
    sugars
    fat
    transFat
    saturatedFat
    cholesterol
    protein
  }
`;

export const OPTION_FRAGMENT = gql`
  fragment OptionFragment on Option {
    name
    price
    optionItems {
      name
      price
    }
  }
`;

export const MENU_FRAGMENT = gql`
  fragment MenuFragment on Menu {
    id
    name
    description
    price
    originalMenuImg
    ownerId
    category
    totalScore
    avgScore
    createdAt
    updatedAt
    options {
      ...OptionFragment
    }
    nutrient {
      ...NutrientFragment
    }
    reviews {
      ...ReviewFragment
    }
  }
  ${OPTION_FRAGMENT}
  ${NUTRIENT_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const SIMPLE_MENU_FRAGMENT = gql`
  fragment SimpleMenuFragment on Menu {
    id
    name
    smallMenuImg
    category
  }
`;

export const CAFE_FRAGMENT = gql`
  fragment CafeFragment on Cafe {
    id
    name
    description
    originalCoverImg
    totalScore
    avgScore
    createdAt
    updatedAt
    address {
      ...AddressFragment
    }
    keywords {
      id
      name
      slug
    }
    owner {
      ...UserFragment
    }
    likedUsers {
      ...UserFragment
    }
    menus {
      ...SimpleMenuFragment
    }
    reviews {
      ...ReviewFragment
    }
  }
  ${ADDRESS_FRAGMENT}
  ${USER_FRAGMENT}
  ${SIMPLE_MENU_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const SIMPLE_CAFE_FRAGMENT = gql`
  fragment SimpleCafeFragment on Cafe {
    id
    name
    smallCoverImg
    totalScore
    avgScore
    createdAt
    updatedAt
    keywords {
      name
    }
    owner {
      ...UserFragment
    }
    likedUsers {
      id
    }
  }
  ${USER_FRAGMENT}
`;

export const RANK_CAFE_FRAGMENT = gql`
  fragment RankCafeFragment on Cafe {
    id
    name
    originalCoverImg
    totalScore
    avgScore
    createdAt
    updatedAt
    likedUsers {
      id
    }
  }
`;
