import gql from "graphql-tag";

export const SIMPLE_USER_FRAGMENT = gql`
  fragment SimpleUserFragment on User {
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
      ...SimpleUserFragment
    }
  }
  ${SIMPLE_USER_FRAGMENT}
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
      ...SimpleUserFragment
    }
    reply {
      ...ReplyFragment
    }
  }
  ${SIMPLE_USER_FRAGMENT}
  ${REPLY_FRAGMENT}
`;

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFragment on Address {
    id
    zonecode
    address
    lat
    lng
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
      ...SimpleUserFragment
    }
    likedUsers {
      ...SimpleUserFragment
    }
    menus {
      ...SimpleMenuFragment
    }
    reviews {
      ...ReviewFragment
    }
  }
  ${ADDRESS_FRAGMENT}
  ${SIMPLE_USER_FRAGMENT}
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
      slug
    }
    owner {
      ...SimpleUserFragment
    }
    likedUsers {
      id
    }
  }
  ${SIMPLE_USER_FRAGMENT}
`;

export const MAP_VIEW_CAFE_FRAGMENT = gql`
  fragment MapViewCafeFragment on Cafe {
    id
    name
    smallCoverImg
    totalScore
    avgScore
    owner {
      ...SimpleUserFragment
    }
    likedUsers {
      id
    }
    address {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
  ${SIMPLE_USER_FRAGMENT}
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
    address {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    role
    smallProfileImg
    originalProfileImg
    createdAt
    updatedAt
    address {
      ...AddressFragment
    }
    likeCafes {
      ...SimpleCafeFragment
    }
    cafes {
      ...SimpleCafeFragment
    }
    review {
      ...ReviewFragment
    }
    reply {
      ...ReplyFragment
    }
  }
  ${ADDRESS_FRAGMENT}
  ${SIMPLE_CAFE_FRAGMENT}
  ${REVIEW_FRAGMENT}
  ${REPLY_FRAGMENT}
`;
