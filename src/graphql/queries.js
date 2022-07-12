/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserdata = /* GraphQL */ `
  query GetUserdata($discordUserId: String!) {
    getUserdata(discordUserId: $discordUserId) {
      id
      discordUserId
      discordUserName
      discordDiscriminator
      discordAvatarUrl
      lastLogin
      createdAt
      updatedAt
    }
  }
`;
export const listUserdata = /* GraphQL */ `
  query ListUserdata(
    $discordUserId: String
    $filter: ModelUserdataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserdata(
      discordUserId: $discordUserId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        discordUserId
        discordUserName
        discordDiscriminator
        discordAvatarUrl
        lastLogin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
