({
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Boulder Bash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    self: {
      volatileStatus: "boudlerbash"
    },
    condition: {
      noCopy: true,
      onStart(pokemon) {
        this.add("-singlemove", pokemon, "Boulder Bash", "[silent]");
      },
      onSourceModifyDamage() {
        return this.chainModify(1.5);
      },
      onBeforeMovePriority: 100,
      onBeforeMove(pokemon) {
        this.debug("removing Boulder Bash drawback before attack");
        pokemon.removeVolatile("boulderbash");
      }
    },
    target: "any",
    type: "Rock",
    contestType: "Tough"
})