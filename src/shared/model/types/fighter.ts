export type TFighter = {
  name: string;
  fightClub: string;
  country: string;
  weightCategory: string;
  dignity: string;
  photo: string;
};

export type TDtoFighter = TFighter & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
