import {Directive, HostListener, Input} from '@angular/core';
import {FormulaService} from '../services/formula.service';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Directive({ selector: '[appUpdateBreadcrumbs]' })
export class UpdateBreadcrumbsDirective {
  @Input('appUpdateBreadcrumbs') formulaId: number;
  @Input('position') position = -1;

  constructor(private formulaService: FormulaService,
              private breadcrumbService: BreadcrumbService) {}

  @HostListener('click') onClick() {
    // If there is no formulaId, then clear breadcrumbs.
    const breadcrumbs = this.breadcrumbService.breadcrumbs;
    if (this.formulaId) {
      // Get name of formula based on param id from formula service
      const formula = this.formulaService.formulas.find(aFormula => aFormula.id === +this.formulaId);

      // Find index of breadcrumb in array.  Go backwards in for statement because we want to remove the most recent (lowest-level child)
      // formula name that matches.
      for (let i = breadcrumbs.length - 1; i >= 0; i--) {
        if (breadcrumbs[i].formula.name === formula.name) {
          this.position = i;
        }
      }

      // If not found, add id to end of array.
      // If found, then remove all elements from array after (not including) the index.
      if (this.position === -1) {
        breadcrumbs.push({
          formula: formula,
          position: breadcrumbs.length
        });
      } else {
        breadcrumbs.splice(this.position + 1);
      }
    } else {
      breadcrumbs.splice(0);
    }
  }

}
