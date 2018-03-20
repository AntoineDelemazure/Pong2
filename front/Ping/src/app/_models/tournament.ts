import {Round} from "./round";

export class Tournament {
  // champs composants un tournois
  id: number;
  name: string;
  date: string;
  finished: boolean;
  open: boolean;
  currentRound: number;
  rounds: Round[];
  referee_id: number;

}
