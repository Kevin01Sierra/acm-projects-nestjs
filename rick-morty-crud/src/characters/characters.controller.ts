import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  Query,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/character.dto';

@Controller('elementos')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get('all')
  async findAllCharacters() {
    return this.charactersService.findAll(10000, 0); // Límite muy alto
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 20,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number = 0
  ) {
    if (limit < 1 || limit > 100) {
      limit = 20;
    }
    if (offset < 0) {
      offset = 0;
    }
    
    return this.charactersService.findAll(limit, offset);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCharacterDto: UpdateCharacterDto
  ) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.remove(id);
  }
}