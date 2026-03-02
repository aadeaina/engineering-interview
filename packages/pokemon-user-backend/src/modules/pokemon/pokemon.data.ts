export const pokemonList = Array.from({ length: 150 }, (_, i) => ({
  pokedexNumber: i + 1,
  name: `Pokemon-${i + 1}`,
  type1: 'Normal',
}));