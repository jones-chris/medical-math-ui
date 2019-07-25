import {Component, OnInit} from '@angular/core';
import { FormulaService } from '../shared/services/formula.service';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _formulaService: FormulaService,
              private _breadcrumbService: BreadcrumbService) {}

  get formulaService(): FormulaService {
    return this._formulaService;
  }

  get breadcrumbService(): BreadcrumbService {
    return this._breadcrumbService;
  }

  ngOnInit() {
    if (this.formulaService.formulas.length === 0) {
      this.getFormulas();
    }
  }

  getFormulas() {
    this.formulaService.getFormulasRemotely()
      .subscribe(formulas => {
        this.formulaService.formulas = formulas;
        console.log('Initial formulas are:  ' + formulas);
      });
  }
}
