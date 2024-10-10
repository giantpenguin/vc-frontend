import { gql } from "graphql-tag";
import { globals } from "@/core/globals";
import { graphqlClient } from "../../../client";
import type { Category, Query, QueryCategoriesArgs } from "@/core/api/graphql/types";
import type { DocumentNode } from "graphql";

function getCategoriesQueryDocument(): DocumentNode {
  return gql`
    query GetCategories(
      $storeId: String!
      $userId: String
      $cultureName: String
      $currencyCode: String
      $filter: String
    ) {
      categories(
        storeId: $storeId
        userId: $userId
        cultureName: $cultureName
        currencyCode: $currencyCode
        filter: $filter
      ) {
        totalCount
        items {
          name
          id
          code
          slug
          path
          imgSrc
          description {
            id
            descriptionType
            content
          }
          seoInfo {
            pageTitle
            metaKeywords
            metaDescription
          }
          breadcrumbs {
            title
            seoPath
          }
          parent {
            id
            name
            slug
          }
          images {
            url
          }
          properties {
            id
            name
            value
          }
        }
      }
    }
  `;
}

export async function getCategories(payload: Omit<QueryCategoriesArgs, "storeId">): Promise<Category[]> {
  const { storeId, userId, cultureName, currencyCode } = globals;

  const { data } = await graphqlClient.query<Required<Pick<Query, "categories">>, QueryCategoriesArgs>({
    query: getCategoriesQueryDocument(),
    variables: {
      storeId,
      userId,
      cultureName,
      currencyCode,
      ...payload,
    },
  });

  return data.categories.items ?? [];
}
