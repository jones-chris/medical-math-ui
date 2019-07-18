import {Directive, Input, HostListener} from '@angular/core';

@Directive({ selector: '[appHideFormulaCards]' })
export class ToggleFormulaCardsDirective {
  @Input() appHideFormulaCards;

  constructor() {}

  @HostListener('click') onClick() {
    document.getElementById('formula-cards').hidden = this.appHideFormulaCards;
  }

}
