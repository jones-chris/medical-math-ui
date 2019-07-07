import {Component, Input, OnChanges, OnInit, Optional, Output} from '@angular/core';
import {Formula} from '../../shared/models/formula.model';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit, OnChanges {
  @Input() formula: Formula;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
