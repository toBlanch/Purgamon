({
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Bone Fragments",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "bonefragments",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Bone Fragments");
        this.effectState.time = 3;
      },
      onSideRestart(side) {
        if (this.effectState.time >= 3)
          return false;
        this.add("-sidestart", side, "Bone Fragments");
        this.effectState.time = 3;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded())
          return;
        if (!pokemon.hasItem("heavydutyboots")) {
          const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("bonefragments")), -6, 6);
          this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
        }
        this.effectState.time -= 1;
        if (this.effectState.time == 0) {
          this.add("-sideend", pokemon.side, "move: Bone Fragments", "[of] " + pokemon);
          pokemon.side.removeSideCondition("bonefragments");
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Ground",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
})