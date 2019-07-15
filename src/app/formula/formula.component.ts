import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Formula} from '../../shared/models/formula.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {FormulaService} from '../../shared/services/formula.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit, OnChanges {
  private formula: Formula;
  private hideResult = true;
  private result: number;
  private errorMessage: string;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private refAppComponent: AppComponent,
              private formulaService: FormulaService) {
    console.log(this.formula);
  }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(queryParams => {
      const formulaJson = queryParams.formula;
      this.formula = JSON.parse(formulaJson) as Formula;
      this.hideResult = true;
    });

    // first check if child formulas exist in refAppComponent
    // if yes, then assign to formula.childFormulas
    // if no, then get from flask api and update the master list of formulas in refAppComponent
    const childFormulas = this.getChildFormulasByParentIdFromParentComponent(this.formula.id);
    if (childFormulas.length > 0) {
      this.formula.childFormulas = childFormulas;
    } else {
      this.getChildFormulasFromService(this.formula.id);
    }
  }

  ngOnChanges() {
  }

  calculate() {
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

    if (this.formula.parentId === null) {
      this.result = this.formula.value;
      this.errorMessage = null;
      this.hideResult = false;
    }
  }

  navigateToParentFormula(parentFormulaId: number) {
    if (parentFormulaId) {
      this.formula = this.refAppComponent.formulas.find((formula) => formula.id === parentFormulaId);

      // Only call service when going DOWN formula tree, NOT UP.
      this.formula.childFormulas = this.getFormulasByParentIdFromParentComponent(parentFormulaId);

      this.hideResult = true;
    }
  }

  navigateToChildFormula(formulaId: number) {
    this.formula = this.getChildFormulaByIdFromParentComponent(formulaId);
    if (this.formula.hasChildren) {
      // first try getting child formulas form refAppComponent
      this.formula.childFormulas = this.getChildFormulasByParentIdFromParentComponent(formulaId);

      // if no child formulas found locally, then get them from the service (we know there should be at least 1 child because hasChildren
      // is true.
      if (this.formula.childFormulas.length === 0) {
        this.getChildFormulasFromService(formulaId);
      }
    }

    this.hideResult = true;
  }

  copyResultToClipboard() {
    const resultEl = document.getElementById('result');
    resultEl.select();
    document.execCommand('copy');
  }

  private getChildFormulasFromService(formulaId: number) {
    this.formulaService.getChildFormulas(formulaId)
      .subscribe(childFormulas => {

        // Update this component's formula with childFormulas
        this.formula.childFormulas = childFormulas;

        // Update master list of formulas
        childFormulas.forEach((childFormula) => this.refAppComponent.formulas.push(childFormula));

        // console.log('Child Formulas:  ' + childFormulas);
        // console.log('AppComponent Formulas:  ' + JSON.stringify(this.refAppComponent.formulas));
      });
  }

  private getFormulasByParentIdFromParentComponent(parentFormulaId: number): Formula[] {
    const childFormulas = [];

    for (const formula of this.refAppComponent.formulas) {
      if (formula.parentId === parentFormulaId) {
        childFormulas.push(formula);
      }
    }

    return childFormulas;
  }

  private getChildFormulaByIdFromParentComponent(formulaId: number): Formula {
    for (const formula of this.refAppComponent.formulas) {
      if (formula.id === formulaId) {
        return formula;
      }
    }
  }

  private getChildFormulasByParentIdFromParentComponent(formulaId: number): Formula[] {
    const childFormulas = [];
    for (const formula of this.refAppComponent.formulas) {
      if (formula.parentId === formulaId) {
        childFormulas.push(formula);
      }
    }

    return childFormulas;
  }

}
