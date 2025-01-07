import { CharacterInterface } from './character.interface';

export interface CharactersApiResponse {
  info: Info;
  results: CharacterInterface[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}
