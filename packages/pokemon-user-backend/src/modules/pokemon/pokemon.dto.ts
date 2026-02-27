import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the Pokemon',
  })
  id: number;

  @ApiProperty({
    example: 'Bulbasaur',
    description: 'Name of the Pokemon',
  })
  name: string;
}