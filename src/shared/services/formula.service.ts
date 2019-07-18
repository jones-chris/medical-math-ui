import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Formula } from '../models/formula.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private url = 'http://localhost:5000/formulas';
  public formulas: Formula[] = [];

  constructor(private http: Http) { }

  getFormulas() {
    return this.http.get(this.url)
      .pipe(map(response => response.json()));
  }

  getChildFormulas(formulaId: number) {
    return this.http.get(this.url + '/' + formulaId)
      .pipe(map(response => response.json()));
  }

  getChildFormulaById(formulaId: number): Formula {
    for (const formula of this.formulas) {
      if (formula.id === formulaId) {
        return formula;
      }
    }
    return null;
  }

  getChildFormulasByParentId(formulaId: number): Formula[] {
    const childFormulas = [];
    for (const formula of this.formulas) {
      if (formula.parentId === formulaId) {
        childFormulas.push(formula);
      }
    }

    return childFormulas;
  }

}
