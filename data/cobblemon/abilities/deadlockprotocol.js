({
    onStart(pokemon) {
      pokemon.soundMoveInProgress = false;
    },
    onAfterMove(source, target, move) {      
      if (move.flags["sound"]){
        if (!source.soundMoveInProgress) {
          this.add("-start", source, "Deadlock Protocol");
          source.soundMoveInProgress = true;
        }
      } else if (source.soundMoveInProgress) {
        this.add("-end", source, "Deadlock Protocol");
        source.soundMoveInProgress = false;
      }
    },
    onFoeTrapPokemon(pokemon) {
      if ((this.effectState.target.soundMoveInProgress || pokemon.volatiles["perishsong"]) && !pokemon.hasAbility("soundproof"))
        pokemon.tryTrap();
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source)
        source = this.effectState.target;
        if (!source)
          return;

      pokemon.maybeTrapped = (this.effectState.target.soundMoveInProgress || pokemon.volatiles["perishsong"]) && !pokemon.hasAbility("soundproof");

    },
    onTrapPokemon(pokemon) {
      if(pokemon.soundMoveInProgress || pokemon.volatiles["perishsong"])
        pokemon.tryTrap();
    },
    flags: {},
    name: "Deadlock Protocol",
    rating: 4
})