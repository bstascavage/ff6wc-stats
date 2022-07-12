export const getUserDiscordId = /* GraphQL */ `
  query GetUserdata($discordUserId: String!) {
    getUserdata(discordUserId: $discordUserId) {
      discordUserId
    }
  }
`;
