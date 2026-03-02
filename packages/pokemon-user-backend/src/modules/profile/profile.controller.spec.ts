import { describe, it, expect, vi } from 'vitest';
import { ProfileController } from './profile.controller';

describe('ProfileController', () => {
  it('should call create on service', async () => {
    const mockService = {
      create: vi.fn().mockResolvedValue({ id: 1, name: 'Ash' }),
    };

    const controller = new ProfileController(mockService as any);

    await controller.create({ name: 'Ash' });

    expect(mockService.create).toHaveBeenCalledWith('Ash');
  });

  it('should call findAll on service', async () => {
    const mockService = {
      findAll: vi.fn().mockResolvedValue([]),
    };

    const controller = new ProfileController(mockService as any);

    await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should call assignTeam on service', async () => {
    const mockService = {
      assignTeam: vi.fn().mockResolvedValue({ message: 'Team assigned successfully.' }),
    };

    const controller = new ProfileController(mockService as any);

    await controller.assignTeam('1', { pokemonIds: [1, 2, 3] });

    expect(mockService.assignTeam).toHaveBeenCalledWith(1, [1, 2, 3]);
  });
});