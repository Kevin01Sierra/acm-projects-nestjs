import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUrl, IsArray } from 'class-validator';

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown'
}

export enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown'
}

export class OriginDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

export class LocationDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CharacterStatus)
  @IsNotEmpty()
  status: CharacterStatus;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(CharacterGender)
  @IsNotEmpty()
  gender: CharacterGender;

  @IsOptional()
  origin?: OriginDto;

  @IsOptional()
  location?: LocationDto;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  episode?: string[];
}

export class UpdateCharacterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(CharacterStatus)
  @IsOptional()
  status?: CharacterStatus;

  @IsString()
  @IsOptional()
  species?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(CharacterGender)
  @IsOptional()
  gender?: CharacterGender;

  @IsOptional()
  origin?: OriginDto;

  @IsOptional()
  location?: LocationDto;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  episode?: string[];
}