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
    console.log('In App constructor');
    console.log(this.formulas);
  }

  ngOnInit() {
    console.log('In App ngOnit');
    console.log('Before getting formulas, the formulas are: ' + this.formulas);
    this.getFormulas();
    console.log('After getting formulas, the formulas are: ' + this.formulas);
  }

  getFormulas() {
    // this.formulaService.getFormulas()
    //   .subscribe(formulas => {
    //     this.formulas = formulas;
    //   });

    // this.formulaService.getFormulas()
    //   .then(formulas => {
    //     this.formulas = formulas;
    //   });

    this.formulaService.getFormulas()
      .subscribe(formulas => {
        this.formulas = formulas;
        console.log(formulas);
      });

    // this.formulaService.getFormulas()
    //   .subscribe(formulas => {
    //     this.formulas = formulas;
    //   });

      // .toPromise()
      // .then(data => this.formulas = data);

    // this.formulaService.getFormulas()
    //   .then(formulas => this.formulas = formulas);
  }
}
