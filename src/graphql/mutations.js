/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRun = /* GraphQL */ `
  mutation CreateRun(
    $input: CreateRunInput!
    $condition: ModelRunConditionInput
  ) {
    createRun(input: $input, condition: $condition) {
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
export const updateRun = /* GraphQL */ `
  mutation UpdateRun(
    $input: UpdateRunInput!
    $condition: ModelRunConditionInput
  ) {
    updateRun(input: $input, condition: $condition) {
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
export const deleteRun = /* GraphQL */ `
  mutation DeleteRun(
    $input: DeleteRunInput!
    $condition: ModelRunConditionInput
  ) {
    deleteRun(input: $input, condition: $condition) {
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
