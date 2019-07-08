import {Component, OnInit} from '@angular/core';

import { FormulaService } from '../shared/services/formula.service';

import { Formula } from '../shared/models/formula.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medical-math-ui';
  formulas: Formula[];

  constructor(private formulaService: FormulaService) {
  }

  ngOnInit() {
    this.getFormulas();
  }

  getFormulas() {
    this.formulaService.getFormulas()
      .subscribe(formulas => {
        this.formulas = formulas;
        console.log(formulas);
      });
  }
}
