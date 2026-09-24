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
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source.getVolatile("lockedmove");
        if (lockedmove) {
          if (source.volatiles["lockedmove"].duration === 2) {
            delete source.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move, source, target)) {
          for (const side of target.side.foeSidesWithConditions()) {
            side.addSideCondition("bonefragments");
          }
          this.boost({ def: -1, }, target);
        }
        return this.NOT_FAIL;
      },
      onHit(target, source, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
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