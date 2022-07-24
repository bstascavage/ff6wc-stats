const config = {
  flagsetRules: {
    Standard: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        chars: 9,
        espers: 12,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
    },
    Moogles_First_Tournament: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        chars: 9,
        espers: 12,
        operation: "OR",
      },
      excludedAbilities: ["Possess"],
    },
  },
};

module.exports = { config };
