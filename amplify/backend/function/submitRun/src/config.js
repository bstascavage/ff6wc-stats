const config = {
  flagsetRules: {
    Ultros_League: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          chars: 9,
          espers: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
    },
    Moogles_First_Tournament: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          chars: 9,
          espers: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess"],
    },
    TotM__Glass_Cannon: {
      startingChars: 3,
      minChars: 3,
      minEspers: 10,
      skip: {
        no_verify: true,
      },
      excludedAbilities: ["Possess"],
    },
    Other: {
      startingChars: 0,
      minChars: 0,
      minEspers: 0,
      skip: {
        no_verify: true,
      },
      excludedAbilities: [],
    },
  },
};

module.exports = { config };
