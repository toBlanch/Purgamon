({
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cleave",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "cleave",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Cleave");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source, effect) {
        if (effect?.effectType === "Move") {
          this.add("-activate", target, "move: Cleave");
          this.boost({ def: 1, spd: 1 }, target, target, null, false, true);
          return damage * 0.75;
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Rock",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
})