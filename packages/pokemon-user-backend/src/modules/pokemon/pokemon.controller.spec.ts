import { describe, it, expect, vi } from 'vitest';
import { PokemonController } from './pokemon.controller';

describe('PokemonController', () => {
  it('should call findAll on service', async () => {
    const mockService = {
      findAll: vi.fn().mockResolvedValue([
        { id: 1, name: 'Bulbasaur' },
      ]),
    };

    const controller = new PokemonController(mockService as any);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      { id: 1, name: 'Bulbasaur' },
    ]);
  });
});