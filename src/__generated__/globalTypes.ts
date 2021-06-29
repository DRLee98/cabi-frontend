/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  Beverage = "Beverage",
  Bread = "Bread",
  Dessert = "Dessert",
  Etc = "Etc",
  Goods = "Goods",
  Meal = "Meal",
}

export enum MessageType {
  System = "System",
  User = "User",
}

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
}

export interface AddressInputType {
  zonecode: string;
  address?: string | null;
  sido?: string | null;
  sigungu?: string | null;
  sigunguCode?: string | null;
  bname?: string | null;
  lat?: number | null;
  lng?: number | null;
  user?: UserInputType | null;
  cafe?: CafeInputType | null;
}

export interface CafeDetailInput {
  id: number;
}

export interface CafeInputType {
  name: string;
  description: string;
  originalCoverImg?: string | null;
  smallCoverImg?: string | null;
  address: AddressInputType;
  keywords?: KeywordInputType[] | null;
  owner: UserInputType;
  likedUsers?: UserInputType[] | null;
  menus?: MenuInputType[] | null;
  reviews?: ReviewInputType[] | null;
  ratings?: RatingInputType[] | null;
  totalScore: number;
  avgScore: number;
}

export interface ChatRoomInputType {
  users: UserInputType[];
  messages?: MessageInputType[] | null;
  name: string;
  secret?: boolean | null;
  password?: string | null;
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address: AddressInputType;
  originalProfileImg?: string | null;
  smallProfileImg?: string | null;
}

export interface CreateCafeInput {
  name: string;
  description: string;
  address: AddressInputType;
  originalCoverImg?: string | null;
  smallCoverImg?: string | null;
  keywordsName?: string[] | null;
}

export interface CreateCafeReviewInput {
  contents: string;
  score: number;
  cafeId: number;
}

export interface CreateChatRoomInput {
  secret?: boolean | null;
  password?: string | null;
  name: string;
}

export interface CreateMenuInput {
  name: string;
  description: string;
  price: number;
  category: Category;
  options?: OptionInputType[] | null;
  cafeId: number;
  originalMenuImg?: string | null;
  smallMenuImg?: string | null;
  nutrient?: CreateNutrientInput | null;
}

export interface CreateMenuReviewInput {
  contents: string;
  score: number;
  cafeId: number;
  menuId: number;
}

export interface CreateMessageInput {
  context: string;
  chatRoomId: number;
}

export interface CreateNutrientInput {
  volume?: number | null;
  calorie?: number | null;
  salt?: number | null;
  carbohydrate?: number | null;
  sugars?: number | null;
  fat?: number | null;
  transFat?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  protein?: number | null;
}

export interface CreateReplyInput {
  contents: string;
  reviewId: number;
}

export interface DeleteCafeInput {
  id: number;
}

export interface DeleteMenuInput {
  cafeId: number;
  menuId: number;
}

export interface EditCafeInput {
  name?: string | null;
  description?: string | null;
  originalCoverImg?: string | null;
  smallCoverImg?: string | null;
  cafeId: number;
  address?: AddressInputType | null;
  keywordsName?: string[] | null;
}

export interface EditMenuInput {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  originalMenuImg?: string | null;
  smallMenuImg?: string | null;
  category?: Category | null;
  options?: OptionInputType[] | null;
  cafeId: number;
  menuId: number;
  editNutrient?: EditNutrientInput | null;
}

export interface EditNutrientInput {
  volume?: number | null;
  calorie?: number | null;
  salt?: number | null;
  carbohydrate?: number | null;
  sugars?: number | null;
  fat?: number | null;
  transFat?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  protein?: number | null;
}

export interface EditProfileInput {
  name?: string | null;
  password?: string | null;
  originalProfileImg?: string | null;
  smallProfileImg?: string | null;
  oldPassword?: string | null;
  address?: AddressInputType | null;
}

export interface EntranceChatRoomInput {
  id: number;
  password?: string | null;
}

export interface IsSecretChatRoomInput {
  id: number;
}

export interface KeywordInputType {
  name: string;
  slug: string;
  cafes?: CafeInputType[] | null;
}

export interface ListenNewMessageInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MenuDetailInput {
  cafeId: number;
  menuId: number;
}

export interface MenuInputType {
  name: string;
  description: string;
  price: number;
  originalMenuImg?: string | null;
  smallMenuImg?: string | null;
  ownerId: number;
  category: Category;
  cafe: CafeInputType;
  nutrient?: NutrientInputType | null;
  options?: OptionInputType[] | null;
  reviews?: ReviewInputType[] | null;
  ratings?: RatingInputType[] | null;
  totalScore: number;
  avgScore: number;
}

export interface MessageInputType {
  context: string;
  type: MessageType;
  writer?: UserInputType | null;
  chatRoom: ChatRoomInputType;
}

export interface NutrientInputType {
  volume?: number | null;
  calorie?: number | null;
  salt?: number | null;
  carbohydrate?: number | null;
  sugars?: number | null;
  fat?: number | null;
  transFat?: number | null;
  saturatedFat?: number | null;
  cholesterol?: number | null;
  protein?: number | null;
  menu: MenuInputType;
}

export interface OptionInputType {
  name: string;
  price?: number | null;
  optionItems?: OptionItemInputType[] | null;
}

export interface OptionItemInputType {
  name: string;
  price?: number | null;
}

export interface RatingInputType {
  score: number;
  review: ReviewInputType;
  cafe?: CafeInputType | null;
  menu?: MenuInputType | null;
}

export interface ReplyInputType {
  contents: string;
  review: ReviewInputType;
  writer: UserInputType;
}

export interface ReviewInputType {
  contents: string;
  rating?: RatingInputType | null;
  writer: UserInputType;
  reply?: ReplyInputType[] | null;
  cafe?: CafeInputType | null;
  menu?: MenuInputType | null;
}

export interface SearchCafesInput {
  word: string;
}

export interface SearchCafesKeywordInput {
  slug: string;
}

export interface SearchCafesLatLngInput {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ToggleLikeCafeInput {
  cafeId: number;
}

export interface UserInputType {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  originalProfileImg?: string | null;
  smallProfileImg?: string | null;
  address: AddressInputType;
  cafes?: CafeInputType[] | null;
  likeCafes?: CafeInputType[] | null;
  review?: ReviewInputType[] | null;
  reply?: ReplyInputType[] | null;
  chatRooms?: ChatRoomInputType[] | null;
  messages?: MessageInputType[] | null;
}

export interface UserProfileInput {
  id: number;
}

export interface ViewChatRoomInput {
  id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
