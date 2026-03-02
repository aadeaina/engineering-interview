import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto,AssignTeamDto } from './profile.dto';


@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post()
    create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto.name);
    }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

    @Post(':id/team')
    assignTeam(
    @Param('id') id: string,
    @Body() dto: AssignTeamDto,
    ) {
    return this.profileService.assignTeam(Number(id), dto.pokemonIds);
    }


}