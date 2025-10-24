import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Character, ApiResponse } from './interfaces/character.interface';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/character.dto';

@Injectable()
export class CharactersService {
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private localCharacters: Map<number, Character> = new Map();
  private nextLocalId = 1000;

  constructor(private readonly httpService: HttpService) {}

  async findAll(limit: number = 20, offset: number = 0): Promise<{ results: Character[], info: any }> {
    try {
      const page = Math.floor(offset / limit) + 1;
      
      const response = await firstValueFrom(
        this.httpService.get<ApiResponse>(`${this.apiUrl}?page=${page}`)
      );

      // Total de personajes en la API
      const totalApiCount = response.data.info.count;
      const localCharacters = Array.from(this.localCharacters.values());
      const totalCount = totalApiCount + localCharacters.length;
      
      // Resultados de la página actual
      const apiCharacters = response.data.results;
      const allCharactersInPage = [...apiCharacters, ...localCharacters];
      
      const startIndex = offset % limit;
      const endIndex = startIndex + limit;
      const paginatedResults = allCharactersInPage.slice(startIndex, endIndex);

      return {
        results: paginatedResults,
        info: {
          count: totalCount,
          pages: Math.ceil(totalCount / limit),
          next: (offset + limit) < totalCount ? `?limit=${limit}&offset=${offset + limit}` : null,
          prev: offset > 0 ? `?limit=${limit}&offset=${Math.max(0, offset - limit)}` : null
        }
      };
    } catch (error) {
      if (error.response?.status === 404) {
        const localCharacters = Array.from(this.localCharacters.values());
        
        if (localCharacters.length === 0) {
          throw new NotFoundException('No se encontraron personajes');
        }

        return {
          results: localCharacters.slice(offset, offset + limit),
          info: {
            count: localCharacters.length,
            pages: Math.ceil(localCharacters.length / limit),
            next: (offset + limit) < localCharacters.length ? `?limit=${limit}&offset=${offset + limit}` : null,
            prev: offset > 0 ? `?limit=${limit}&offset=${Math.max(0, offset - limit)}` : null
          }
        };
      }
      throw new BadRequestException('Error al obtener los personajes');
    }
  }

  async findOne(id: number): Promise<Character> {
    if (id >= 1000) {
      const character = this.localCharacters.get(id);
      if (!character) {
        throw new NotFoundException(`Personaje con ID ${id} no encontrado`);
      }
      return character;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<Character>(`${this.apiUrl}/${id}`)
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Personaje con ID ${id} no encontrado`);
      }
      throw new BadRequestException('Error al obtener el personaje');
    }
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const newCharacter: Character = {
      id: this.nextLocalId++,
      name: createCharacterDto.name,
      status: createCharacterDto.status,
      species: createCharacterDto.species,
      type: createCharacterDto.type || '',
      gender: createCharacterDto.gender,
      origin: createCharacterDto.origin || { name: 'Unknown', url: '' },
      location: createCharacterDto.location || { name: 'Unknown', url: '' },
      image: createCharacterDto.image || 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
      episode: createCharacterDto.episode || [],
      url: `${this.apiUrl}/${this.nextLocalId - 1}`,
      created: new Date().toISOString()
    };

    this.localCharacters.set(newCharacter.id, newCharacter);
    return newCharacter;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    const character = await this.findOne(id);

    if (id < 1000) {
      const updatedCharacter: Character = {
        ...character,
        ...updateCharacterDto,
        id: character.id,
        url: character.url,
        created: character.created
      };

      const newId = this.nextLocalId++;
      updatedCharacter.id = newId;
      updatedCharacter.url = `${this.apiUrl}/${newId}`;
      
      this.localCharacters.set(newId, updatedCharacter);
      return updatedCharacter;
    }

    const updatedCharacter: Character = {
      ...character,
      ...updateCharacterDto
    };

    this.localCharacters.set(id, updatedCharacter);
    return updatedCharacter;
  }

  async remove(id: number): Promise<{ message: string, character: Character }> {
    const character = await this.findOne(id);

    if (id < 1000) {
      return {
        message: `No se puede eliminar el personaje ${id} de la API original. Personaje marcado como eliminado.`,
        character
      };
    }

    this.localCharacters.delete(id);
    return {
      message: `Personaje ${id} eliminado exitosamente`,
      character
    };
  }
}