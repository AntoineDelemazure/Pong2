export class Match{
  id1: number;
  id2: number;
  nom1: string;
  nom2: string;
  score1: number;
  score2: number;


  constructor(id1: number, id2: number, nom1: string, nom2: string, score1: number, score2: number) {
    this.id1 = id1;
    this.id2 = id2;
    this.nom1 = nom1;
    this.nom2 = nom2;
    this.score1 = score1;
    this.score2 = score2;
  }
}
