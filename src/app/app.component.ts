import {Component, OnInit} from '@angular/core';
import { FormulaService } from '../shared/services/formula.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private formulaService: FormulaService) {}

  ngOnInit() {
    if (this.formulaService.formulas.length === 0) {
      this.getFormulas();
    }
  }

  getFormulas() {
    this.formulaService.getFormulas()
      .subscribe(formulas => {
        this.formulaService.formulas = formulas;
        console.log('Initial formulas are:  ' + formulas);
      });
  }
}
