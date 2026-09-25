({
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Skeletal Stance",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "skeletalstance",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Skeletal Stance");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source, effect) {
        if (effect?.effectType === "Move") {
          return damage * 0.2;
        }
      },
      onHit(target, source, move) {
        if (this.checkMoveMakesContact(move, source, target)) {
          for (const side of target.side.foeSidesWithConditions()) {
            side.addSideCondition("bonefragments");
          }
          this.boost({ def: -1, }, target);
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Poison",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
})