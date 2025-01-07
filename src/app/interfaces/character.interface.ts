export interface CharacterInterface {
  id: number;
  name: string;
  // status: Status;
  // species: Species;
  // gender: Gender;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface LinkedElement {
  name: string;
  url: string;
}

/* por si en un futuro Origin y Location se le agregan nuevas propiedades solo se colocan aquí */
export interface Origin extends LinkedElement {}
export interface Location extends LinkedElement {}

// export enum Gender {
//   FEMALE = 'Female',
//   MALE = 'Male',
//   UNKNOWN = 'unknown',
// }

// export enum Species {
//   ALIEN = 'Alien',
//   HUMAN = 'Human',
// }

// export enum Status {
//   ALIVE = 'Alive',
//   DEAD = 'Dead',
//   UNKNOWN = 'unknown',
// }
