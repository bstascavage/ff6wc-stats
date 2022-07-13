export const getUserDiscordId = /* GraphQL */ `
  query GetUser($discordUserId: String!) {
    getUser(discordUserId: $discordUserId) {
      discordUserId
    }
  }
`;
