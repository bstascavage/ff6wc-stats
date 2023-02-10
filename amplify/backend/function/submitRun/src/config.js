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
    Ultros_League__Season_3: {
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
      excludedAbilities: ["Possess", "Shock"],
    },
    Coliseum__Terra: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock"],
      requiredChars: ["Terra"],
    },
    Coliseum__Locke: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Locke"],
    },
    Coliseum__Edgar: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Edgar"],
    },
    Coliseum__Sabin: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Sabin"],
    },
    Coliseum__Cyan: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek", "Tools"],
      requiredChars: ["Cyan"],
    },
    Coliseum__Gau: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      permitAbilityCheckOverride: true,
      requiredChars: ["Gau"],
    },
    Coliseum__Celes: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Magitek"],
      requiredChars: ["Celes"],
    },
    Coliseum__Setzer: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess"],
      permitAbilityCheckOverride: true,
      requiredChars: ["Setzer"],
    },
    Coliseum__Strago: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "X_Magic", "Magitek"],
      requiredChars: ["Strago"],
    },
    Coliseum__Relm: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Relm"],
    },
    Coliseum__Shadow: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Shadow"],
    },
    Coliseum__Mog: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: ["Possess", "Shock", "Magitek"],
      requiredChars: ["Mog"],
    },
    Coliseum__Gogo: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: [],
      permitAbilityCheckOverride: true,
      requiredChars: ["Gogo"],
    },
    Coliseum__Umaro: {
      startingChars: 3,
      minChars: 6,
      minEspers: 9,
      skip: {
        reqs: {
          bosses: 12,
        },
        conditionsMet: 1,
        operation: "OR",
      },
      excludedAbilities: [
        "Possess",
        "Capture",
        "Runic",
        "X_Magic",
        "Sketch",
        "Control",
      ],
      permitAbilityCheckOverride: true,
      requiredChars: ["Umaro"],
    },
    Other: {
      startingChars: 0,
      minChars: 0,
      minEspers: 0,
      skip: {
        no_verify: true,
      },
      excludedAbilities: [],
      permitAbilityCheckOverride: true,
    },
  },
};

module.exports = { config };
