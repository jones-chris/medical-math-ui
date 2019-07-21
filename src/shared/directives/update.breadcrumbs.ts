import {Directive, HostListener, Input, OnChanges} from '@angular/core';
import {FormulaService} from '../services/formula.service';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Directive({ selector: '[appUpdateBreadcrumbs]' })
export class UpdateBreadcrumbsDirective {
  @Input('appUpdateBreadcrumbs') formulaId: number;

  constructor(private formulaService: FormulaService,
              private breadcrumbService: BreadcrumbService) {}

  @HostListener('click') onClick() {
    // If there is no formulaId, then clear breadcrumbs.
    if (!this.formulaId) {
      this.breadcrumbService.breadcrumbs.splice(0);
    } else {
      // get name of formula based on param id from formula service
      const formula = this.formulaService.formulas.find(aFormula => aFormula.id === +this.formulaId);

      // find index of breadcrumb in array.
      const breadcrumbIndex = this.breadcrumbService.breadcrumbs.findIndex(crumb => crumb.name === formula.name);

      // if not found, add id to end of array.
      // if found, then remove all elements from array after (not including) the index.
      if (breadcrumbIndex === -1) {
        // it's safe to assume the formula will be found, because we wouldn't be in the route if the formula didn't exist.
        this.breadcrumbService.breadcrumbs.push({
          id: formula.id,
          name: formula.name
        });
      } else {
        this.breadcrumbService.breadcrumbs.splice(breadcrumbIndex + 1);
      }
    }
  }

}
