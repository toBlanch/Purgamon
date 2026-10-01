({
    accuracy: 90,
    basePower: 30,
    basePowerCallback(pokemon, target, move) {
      let bp = move.basePower;
      const soundcrashData = pokemon.volatiles["soundcrash"];
      if (soundcrashData?.hitCount) {
        bp *= Math.pow(2, soundcrashData.contactHitCount);
      }
      if (soundcrashData && pokemon.status !== "slp") {
        soundcrashData.hitCount++;
        soundcrashData.contactHitCount++;
        if (soundcrashData.hitCount < 5) {
          soundcrashData.duration = 2;
        }
      }
      if (pokemon.volatiles["defensecurl"]) {
        bp *= 2;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Special",
    name: "Sound Crash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, failinstruct: 1, noparentalbond: 1 },
    onModifyMove(move, pokemon, target) {
      if (pokemon.volatiles["soundcrash"] || pokemon.status === "slp" || !target)
        return;
      pokemon.addVolatile("soundcrash");
      pokemon.volatiles["soundcrash"].targetSlot = move.sourceEffect ? pokemon.lastMoveTargetLoc : pokemon.getLocOf(target);
    },
    onAfterMove(source, target, move) {
      const soundcrashData = source.volatiles["soundcrash"];
      if (soundcrashData && soundcrashData.hitCount === 5 && soundcrashData.contactHitCount < 5) {
        source.addVolatile("rolloutstorage");
        source.volatiles["rolloutstorage"].contactHitCount = soundcrashData.contactHitCount;
      }
    },
    condition: {
      duration: 1,
      onLockMove: "soundcrash",
      onStart() {
        this.effectState.hitCount = 0;
        this.effectState.contactHitCount = 0;
      },
      onResidual(target) {
        if (target.lastMove && target.lastMove.id === "struggle") {
          delete target.volatiles["soundcrash"];
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cute"
})