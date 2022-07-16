/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const submitRun = /* GraphQL */ `
  mutation SubmitRun(
    $runTime: String!
    $flagset: Flagset
    $ktStartTime: String
    $kefkaTime: String
    $userId: String!
    $chars: [Character]!
    $abilities: [Ability]!
    $numOfChars: String!
    $numOfEspers: String!
    $numOfDeadChecks: String!
    $numOfBosses: String!
    $numOfChests: String
    $skip: Boolean!
    $dragons: [Dragon]!
    $finalBattle: [FinalBattleTrait]
    $highestLevel: String
    $superBalls: Boolean
    $egg: Boolean
    $auction: String
    $thief: Thief
    $coliseum: Boolean
  ) {
    submitRun(
      runTime: $runTime
      flagset: $flagset
      ktStartTime: $ktStartTime
      kefkaTime: $kefkaTime
      userId: $userId
      chars: $chars
      abilities: $abilities
      numOfChars: $numOfChars
      numOfEspers: $numOfEspers
      numOfDeadChecks: $numOfDeadChecks
      numOfBosses: $numOfBosses
      numOfChests: $numOfChests
      skip: $skip
      dragons: $dragons
      finalBattle: $finalBattle
      highestLevel: $highestLevel
      superBalls: $superBalls
      egg: $egg
      auction: $auction
      thief: $thief
      coliseum: $coliseum
    )
  }
`;
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
          attempt
          flagset
          runTime
          chars
          abilities
          numOfChars
          numOfEspers
          numOfDeadChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thief
          coliseum
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
          attempt
          flagset
          runTime
          chars
          abilities
          numOfChars
          numOfEspers
          numOfDeadChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thief
          coliseum
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
          attempt
          flagset
          runTime
          chars
          abilities
          numOfChars
          numOfEspers
          numOfDeadChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thief
          coliseum
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
      attempt
      flagset
      runTime
      chars
      abilities
      numOfChars
      numOfEspers
      numOfDeadChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thief
      coliseum
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
      attempt
      flagset
      runTime
      chars
      abilities
      numOfChars
      numOfEspers
      numOfDeadChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thief
      coliseum
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
      attempt
      flagset
      runTime
      chars
      abilities
      numOfChars
      numOfEspers
      numOfDeadChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thief
      coliseum
      createdAt
      updatedAt
    }
  }
`;
