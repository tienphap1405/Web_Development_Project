// src/api/animeApi.js
import { request, gql } from "graphql-request";

const GRAPHQL_ENDPOINT = "https://graphql.anilist.co";

const GET_ANIME_QUERY = gql`
query ($page: Int, $perPage: Int, $sortingType: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: $sortingType, isAdult: false, status: RELEASING) {
      id
      title {
        romaji
        english
      }
      description
      coverImage {
        large
      }
    }
  }
}
`;

// Create a function to fetch anime
export const fetchAnime = async (page = 1, perPage = 10, sortingType = "POPULARITY_DESC") => {

  try {
    const variables = { page, perPage, sortingType };
    const data = await request(GRAPHQL_ENDPOINT, GET_ANIME_QUERY, variables);
    return data.Page.media;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
};
