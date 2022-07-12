/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserdata = /* GraphQL */ `
  mutation CreateUserdata(
    $input: CreateUserdataInput!
    $condition: ModelUserdataConditionInput
  ) {
    createUserdata(input: $input, condition: $condition) {
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
export const updateUserdata = /* GraphQL */ `
  mutation UpdateUserdata(
    $input: UpdateUserdataInput!
    $condition: ModelUserdataConditionInput
  ) {
    updateUserdata(input: $input, condition: $condition) {
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
export const deleteUserdata = /* GraphQL */ `
  mutation DeleteUserdata(
    $input: DeleteUserdataInput!
    $condition: ModelUserdataConditionInput
  ) {
    deleteUserdata(input: $input, condition: $condition) {
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
