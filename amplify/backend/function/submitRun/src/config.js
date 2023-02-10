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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek", "Tools"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "MagiTek"],
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
      excludedAbilities: ["Possess", "X_Magic", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
      excludedAbilities: ["Possess", "Shock", "MagiTek"],
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
