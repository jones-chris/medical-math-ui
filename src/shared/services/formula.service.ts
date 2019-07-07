import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Formula } from '../models/formula.model';
import {map} from 'rxjs/operators';

@Injectable()
export class FormulaService {
  private url = 'http://localhost:5000/formulas';
  private formulas: Formula[] = [];

  constructor(private http: Http) { }

  getFormulas() {
    return this.http.get(this.url)
      .pipe(map(response => response.json()));
  }

}
