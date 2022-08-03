/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateRun = /* GraphQL */ `
  subscription OnCreateRun($filter: ModelSubscriptionRunFilterInput) {
    onCreateRun(filter: $filter) {
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
export const onUpdateRun = /* GraphQL */ `
  subscription OnUpdateRun($filter: ModelSubscriptionRunFilterInput) {
    onUpdateRun(filter: $filter) {
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
export const onDeleteRun = /* GraphQL */ `
  subscription OnDeleteRun($filter: ModelSubscriptionRunFilterInput) {
    onDeleteRun(filter: $filter) {
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
