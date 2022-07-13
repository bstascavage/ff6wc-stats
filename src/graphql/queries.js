/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($discordUserId: String!) {
    getUser(discordUserId: $discordUserId) {
      id
      discordUserId
      discordUserName
      discordDiscriminator
      discordAvatarUrl
      lastLogin
      runs {
        items {
          id
          userId
          runTime
          createdAt
          updatedAt
        }
        nextToken
      }
      role
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $discordUserId: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
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
        runs {
          nextToken
        }
        role
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRun = /* GraphQL */ `
  query GetRun($id: ID!) {
    getRun(id: $id) {
      id
      user {
        id
        discordUserId
        discordUserName
        discordDiscriminator
        discordAvatarUrl
        lastLogin
        runs {
          nextToken
        }
        role
        createdAt
        updatedAt
      }
      userId
      runTime
      createdAt
      updatedAt
    }
  }
`;
export const listRuns = /* GraphQL */ `
  query ListRuns(
    $filter: ModelRunFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRuns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          discordUserId
          discordUserName
          discordDiscriminator
          discordAvatarUrl
          lastLogin
          role
          createdAt
          updatedAt
        }
        userId
        runTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
