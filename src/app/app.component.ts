import {Component, OnInit} from '@angular/core';
import { FormulaService } from '../shared/services/formula.service';
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utils} from '../shared/utils/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private emptySearchMessage: string;
    public firstParentFormulaId: number;

    constructor(private _formulaService: FormulaService,
                private _breadcrumbService: BreadcrumbService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

    get formulaService(): FormulaService {
        return this._formulaService;
    }

    get breadcrumbService(): BreadcrumbService {
        return this._breadcrumbService;
    }

    setFirstParentFormulaId(value) {
        this.firstParentFormulaId = +value;
    }

    ngOnInit() {
        if (this.formulaService.formulas.length === 0) {
            this.getFormulas();
        }
    }

    private getFormulas() {
        this.formulaService.getFormulasRemotely()
            .subscribe(formulas => {
                this.formulaService.formulas = formulas;
            });
    }

    public getFormulasBySearch(event) {
        const searchText = event.currentTarget.value;
        this.formulaService.getFormulasBySearch(searchText)
            .subscribe(formulas => {
                if (formulas.length === 0) {
                    this.emptySearchMessage = 'Sorry!  I could not find a matching formula!';
                } else {
                    this.formulaService.formulas = formulas;
                    this.router.navigateByUrl('');
                    this.breadcrumbService.breadcrumbs.splice(0);
                    Utils.hideFormulaCards(false);
                }
            });
    }
}
