import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FormulaService } from '../shared/services/formula.service';
import { AppComponent } from './app.component';
import { FormulaComponent } from './formula/formula.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClipboardModule } from 'ngx-clipboard';
import {ToggleFormulaCardsDirective} from '../shared/directives/toggle.formula.cards';
import {BreadcrumbModule} from 'angular-crumbs';

const routes: Routes = [
  {
    path: 'formulas/:id',
    component: FormulaComponent,
    data: {
      breadcrumb: 'Formula'
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FormulaComponent,
    NavBarComponent,
    ToggleFormulaCardsDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    ClipboardModule,
    BreadcrumbModule
  ],
  providers: [
  	FormulaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
	
}
