import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxExplainerComponent } from './components/tax-explainer.component';
import { HomeComponent } from './components/home.component';
import { InputDebounceComponent } from './directives/input-debounce.component';
import { Feathers } from './services/feathers.service';

@NgModule({
    declarations: [
        AppComponent,
        TaxExplainerComponent,
        HomeComponent,
        InputDebounceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [Feathers],
    bootstrap: [AppComponent]
})
export class AppModule { }
