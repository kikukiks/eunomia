import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { TaxExplainerComponent } from './components/tax-explainer.component';

const routes: Routes = [
    { path: 'home', component: TaxExplainerComponent },
    { path: 'tax-explainer', component: TaxExplainerComponent },
    { path: 'contact', component: TaxExplainerComponent },
    { path: '**', redirectTo: 'tax-explainer' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
