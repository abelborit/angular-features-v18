import { CharactersApiResponse } from '../interfaces';

export const CharacterAdapter = (
  characterApiResponse: CharactersApiResponse
) => {
  return characterApiResponse.results;
};
