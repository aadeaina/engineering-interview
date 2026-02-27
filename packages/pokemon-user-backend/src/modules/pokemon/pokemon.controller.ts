import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './pokemon.dto';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOkResponse({
    type: PokemonDto,
    isArray: true,
  })
  findAll(): Promise<PokemonDto[]> {
    return this.pokemonService.findAll();
  }
}


// import { Controller, Get } from '@nestjs/common';
// import { PokemonService } from './pokemon.service';

// @Controller('pokemon')
// export class PokemonController {
//   constructor(private readonly pokemonService: PokemonService) {}

//   @Get()
//   async getAll() {
//     return this.pokemonService.findAll();
//   }
// }