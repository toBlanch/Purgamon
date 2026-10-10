({
    onAfterMove(source, target, move) {
      if (move.flags["sound"])
        source.addVolatile("deadlockprotocol");
    },
    onTryAddVolatile(status, pokemon) {
      if (status.id === "perishsong")
        pokemon.addVolatile("deadlockprotocol");
    },
    condition: {
      onStart(target) {
        this.add("-start", target, "Deadlock Protocol");
      },
      onFoeTrapPokemon(pokemon) {
        if (!pokemon.hasAbility("soundproof"))
          pokemon.tryTrap();
      },
      onFoeMaybeTrapPokemon(pokemon, source) {
        if (!source)
          source = this.effectState.target;
          if (!source)
            return;

        pokemon.maybeTrapped = !pokemon.hasAbility("soundproof");
      },
      onTrapPokemon(pokemon) {
        pokemon.tryTrap();
      },
      onMoveAborted(pokemon, target, move) {
        if (!pokemon.volatiles["perishsong"])
          pokemon.removeVolatile("deadlockprotocol");
      },
      onAfterMove(pokemon, target, move) {
        if (!move.flags["sound"] && !pokemon.volatiles["perishsong"])
          pokemon.removeVolatile("deadlockprotocol");
      },
      onEnd(target) {
        this.add("-end", target, "Deadlock Protocol");
      }
    },
    flags: {},
    name: "Deadlock Protocol",
    rating: 4
})