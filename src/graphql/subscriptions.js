/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
          numOfChecks
          numOfDeadchecks
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
          numOfChecks
          numOfDeadchecks
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
          numOfChecks
          numOfDeadchecks
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
export const onCreateRun = /* GraphQL */ `
  subscription OnCreateRun {
    onCreateRun {
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
      numOfChecks
      numOfDeadchecks
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
export const onUpdateRun = /* GraphQL */ `
  subscription OnUpdateRun {
    onUpdateRun {
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
      numOfChecks
      numOfDeadchecks
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
export const onDeleteRun = /* GraphQL */ `
  subscription OnDeleteRun {
    onDeleteRun {
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
      numOfChecks
      numOfDeadchecks
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
