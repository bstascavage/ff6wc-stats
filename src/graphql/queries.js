/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const runsForUser = /* GraphQL */ `
  query RunsForUser($userId: ID!, $limit: Int, $nextToken: String) {
    runsForUser(userId: $userId, limit: $limit, nextToken: $nextToken) {
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
  }
`;
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
  }
`;
export const runsByTime = /* GraphQL */ `
  query RunsByTime(
    $userId: String!
    $runTimeAttempt: ModelRunByUserCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRunFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RunsByTime(
      userId: $userId
      runTimeAttempt: $runTimeAttempt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const runsByAttempt = /* GraphQL */ `
  query RunsByAttempt(
    $userId: String!
    $attempt: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRunFilterInput
    $limit: Int
    $nextToken: String
  ) {
    RunsByAttempt(
      userId: $userId
      attempt: $attempt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
