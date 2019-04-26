import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { TaxExplainerComponent } from './components/tax-explainer.component';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, data: {animation: 'HomePage'}  },
    { path: 'tax-explainer', component: TaxExplainerComponent, data: {animation: 'TaxPage'}  },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
