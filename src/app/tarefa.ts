export class Tarefa {
  id: string;
  name: string;
  description: string;
  points: number;
  doBefore: any;
  createdAt: any;
  people: {
    id: string;
    name: string;
    status: string;
    comment: string;
    idAtual: string;
  }[];
}
