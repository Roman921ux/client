import { TDtoFighter } from "./fighter";

type FightersPair = {
  leftCornerFighterId: TDtoFighter;
  rightCornerFighterId: TDtoFighter;
  _id: string;
};

type TVoted = {
  userId: string;
  voted: "leftCorner" | "rightCorner";
};

type TVote = {
  leftCorner: number;
  rightCorner: number;
  voted: TVoted[];
  _id: string;
};

type TComment = {
  userId: string;
  comment: string;
  createdAt: string;
};

export type TDtoFight = {
  _id: string;
  nameFight: string;
  video: string | null;
  date: Date;
  fighters: FightersPair;
  upComing: boolean;
  vote: TVote;
  comments: TComment[];
  __v: number;
};
