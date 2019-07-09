import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Formula} from '../../shared/models/formula.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit, OnChanges {
  @Input() formula: Formula;
  private hideResult = true;
  private result: number;
  private errorMessage: string;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  calculate() {
    // find way to get values
      // values are written to object model via 2-way data binding, so just get value from object model (formula field)
      // we assume here that the elements are in the order of the formula parameters.  Therefore, make sure the database query returns the
      // child formulas in the correct order!
    const params: string[] = [];
    const args: number[] = [];
    this.formula.childFormulas.forEach((childFormula) => {
      params.push(childFormula.abbreviation);
      args.push(childFormula.value);
    });

    if (args.includes(undefined)) {
      this.errorMessage = 'All formula parameters must have a value';
      return;
    }

    const func = new Function(params.join(','), this.formula.function);

    // pass values into formula calculation, get return value
    // assign return value to formula's value in object model
    this.formula.value = func.apply(this, args);

    // route to upward formula
    if (this.formula.parentId !== null) {
      this.navigateToParentFormula();
    } else {
      this.result = this.formula.value;
      this.errorMessage = null;
      this.hideResult = false;
    }
  }

  navigateToParentFormula() {
    this.router.navigateByUrl('/formulas/' + this.formula.parentId);
  }

}
