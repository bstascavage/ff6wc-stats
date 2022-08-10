/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const submitRun = /* GraphQL */ `
  mutation SubmitRun(
    $runTime: String!
    $runDate: String!
    $flagset: Flagset
    $ktStartTime: String
    $kefkaTime: String
    $userId: String!
    $chars: [Character]!
    $abilities: [Ability]!
    $numOfChars: String!
    $numOfEspers: String!
    $numOfChecks: String!
    $numOfPeekedChecks: String
    $numOfBosses: String!
    $numOfChests: String
    $skip: Boolean!
    $dragons: [Dragon]!
    $finalBattle: [FinalBattleTrait]
    $highestLevel: String
    $superBalls: Superballs
    $egg: Egg
    $auction: Auction
    $thiefPeek: ThiefPeek
    $thiefReward: ThiefReward
    $coliseum: Coliseum
    $race: Race
    $mood: Mood
    $seed: String
    $raceId: String
  ) {
    submitRun(
      runTime: $runTime
      runDate: $runDate
      flagset: $flagset
      ktStartTime: $ktStartTime
      kefkaTime: $kefkaTime
      userId: $userId
      chars: $chars
      abilities: $abilities
      numOfChars: $numOfChars
      numOfEspers: $numOfEspers
      numOfChecks: $numOfChecks
      numOfPeekedChecks: $numOfPeekedChecks
      numOfBosses: $numOfBosses
      numOfChests: $numOfChests
      skip: $skip
      dragons: $dragons
      finalBattle: $finalBattle
      highestLevel: $highestLevel
      superBalls: $superBalls
      egg: $egg
      auction: $auction
      thiefPeek: $thiefPeek
      thiefReward: $thiefReward
      coliseum: $coliseum
      race: $race
      mood: $mood
      seed: $seed
      raceId: $raceId
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
          runDate
          attempt
          runTime
          runTimeRaw
          ktStartTime
          ktStartTimeRaw
          kefkaTime
          kefkaTimeRaw
          flagset
          chars
          abilities
          numOfChars
          numOfEspers
          numOfChecks
          numOfDeadchecks
          numOfPeekedChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thiefPeek
          thiefReward
          coliseum
          race
          mood
          seed
          raceId
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
          runDate
          attempt
          runTime
          runTimeRaw
          ktStartTime
          ktStartTimeRaw
          kefkaTime
          kefkaTimeRaw
          flagset
          chars
          abilities
          numOfChars
          numOfEspers
          numOfChecks
          numOfDeadchecks
          numOfPeekedChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thiefPeek
          thiefReward
          coliseum
          race
          mood
          seed
          raceId
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
          runDate
          attempt
          runTime
          runTimeRaw
          ktStartTime
          ktStartTimeRaw
          kefkaTime
          kefkaTimeRaw
          flagset
          chars
          abilities
          numOfChars
          numOfEspers
          numOfChecks
          numOfDeadchecks
          numOfPeekedChecks
          numOfBosses
          skip
          dragons
          finalBattle
          highestLevel
          superBalls
          egg
          auction
          thiefPeek
          thiefReward
          coliseum
          race
          mood
          seed
          raceId
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
      runDate
      attempt
      runTime
      runTimeRaw
      ktStartTime
      ktStartTimeRaw
      kefkaTime
      kefkaTimeRaw
      flagset
      chars
      abilities
      numOfChars
      numOfEspers
      numOfChecks
      numOfDeadchecks
      numOfPeekedChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thiefPeek
      thiefReward
      coliseum
      race
      mood
      seed
      raceId
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
      runDate
      attempt
      runTime
      runTimeRaw
      ktStartTime
      ktStartTimeRaw
      kefkaTime
      kefkaTimeRaw
      flagset
      chars
      abilities
      numOfChars
      numOfEspers
      numOfChecks
      numOfDeadchecks
      numOfPeekedChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thiefPeek
      thiefReward
      coliseum
      race
      mood
      seed
      raceId
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
      runDate
      attempt
      runTime
      runTimeRaw
      ktStartTime
      ktStartTimeRaw
      kefkaTime
      kefkaTimeRaw
      flagset
      chars
      abilities
      numOfChars
      numOfEspers
      numOfChecks
      numOfDeadchecks
      numOfPeekedChecks
      numOfBosses
      skip
      dragons
      finalBattle
      highestLevel
      superBalls
      egg
      auction
      thiefPeek
      thiefReward
      coliseum
      race
      mood
      seed
      raceId
      createdAt
      updatedAt
    }
  }
`;
