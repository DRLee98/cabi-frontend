/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: viewKeywordsQuery
// ====================================================

export interface viewKeywordsQuery_viewKeywords_keywords {
  __typename: "Keyword";
  id: number;
  name: string;
  slug: string;
}

export interface viewKeywordsQuery_viewKeywords {
  __typename: "KeywordsOutput";
  ok: boolean;
  error: string | null;
  keywords: viewKeywordsQuery_viewKeywords_keywords[];
}

export interface viewKeywordsQuery {
  viewKeywords: viewKeywordsQuery_viewKeywords;
}
