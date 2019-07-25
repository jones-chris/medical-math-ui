import {Formula} from './formula.model';

export class Breadcrumb {
  // id: number;
  // name: string;
  formula: Formula;
  position: number;

  // constructor(id: number, name: string) {
  //   this.id = id;
  //   this.name = name;
  // }

  constructor(formula: Formula, position: number) {
    this.formula = formula;
    this.position = position;
  }
}
