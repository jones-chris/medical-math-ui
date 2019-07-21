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
import {BreadcrumbService} from '../shared/services/breadcrumb.service';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'formulas/:id', component: FormulaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FormulaComponent,
    NavBarComponent,
    ToggleFormulaCardsDirective,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    ClipboardModule
  ],
  providers: [
    FormulaService,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
