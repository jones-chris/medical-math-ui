import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Formula } from '../models/formula.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  // private url = 'http://localhost:5000/formulas';
  public formulas: Formula[] = [];

  constructor(private http: Http) { }

  getFormulasRemotely() {
    return this.http.get(environment.apiUrl)
      .pipe(map(response => response.json()));
  }

  getChildFormulasRemotely(formulaId: number) {
    return this.http.get(environment.apiUrl + '/' + formulaId)
      .pipe(map(response => response.json()));
  }

  getChildFormulaByIdLocally(formulaId: number): Formula {
    for (const formula of this.formulas) {
      if (formula.id === +formulaId) {
        return formula;
      }
    }
    return null;
  }

  getChildFormulasByParentIdLocally(formulaId: number): Formula[] {
    const childFormulas = [];
    for (const formula of this.formulas) {
      if (formula.parentId === +formulaId) {
        childFormulas.push(formula);
      }
    }

    return childFormulas;
  }

}
