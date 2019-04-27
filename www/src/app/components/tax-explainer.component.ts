import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Feathers } from '../services/feathers.service';

@Component({
    selector: 'tax-explainer',
    templateUrl: './tax-explainer.component.html',
    styleUrls: ['./tax-explainer.component.less']
})

export class TaxExplainerComponent {

    @ViewChild('searchComponent') searchComponent;

    euList = [
        { country: 'Austria', code: 'AT' },
        { country: 'Belgium', code: 'BE' },
        { country: 'Bulgaria', code: 'BG' },
        { country: 'Croatia', code: 'HR' },
        { country: 'Cyprus', code: 'CY' },
        { country: 'Czech Republic', code: 'CZ' },
        { country: 'Denmark', code: 'DK' },
        { country: 'Estonia', code: 'EE' },
        { country: 'Finland', code: 'FI' },
        { country: 'France', code: 'FR' },
        { country: 'Germany', code: 'DE' },
        { country: 'Greece', code: 'EL' },
        { country: 'Hungary', code: 'HU' },
        { country: 'Ireland', code: 'IE' },
        { country: 'Italy', code: 'IT' },
        { country: 'Latvia', code: 'LV' },
        { country: 'Lithuania', code: 'LT' },
        { country: 'Luxembourg', code: 'LU' },
        { country: 'Malta', code: 'MT' },
        { country: 'Netherlands', code: 'NL' },
        { country: 'Poland', code: 'PO' },
        { country: 'Portugal', code: 'PT' },
        { country: 'Romania', code: 'RO' },
        { country: 'Slovakia', code: 'SK' },
        { country: 'Slovenia', code: 'SI' },
        { country: 'Spain', code: 'ES' },
        { country: 'Sweden', code: 'SW' },
        { country: 'United Kingdom', code: 'GB' },
    ];

    selectedProduct = null;

    steps = {
        1: {
            active: true,
            open: true
        },
        2: {
            active: false,
            open: false
        },
        3: {
            active: false,
            open: false
        }
    }

    taxForm = {
        product: {
            id: null,
            name: null,
            type: null
        },
        online: null,
        threshold: null,
        transported: null,
        installed: null,
        seller: {
            vat_liable: false,
            country: null
        },
        buyer: {
            vat_liable: false,
            country: null
        }
    }

    suggestions = [];

    constructor(
        private feathers: Feathers
    ) {
    }

    ngOnInit() {
    }

    search(e) {
        console.log(e)
        this.feathers.service('products').find({
            query: {
                q: e
            }
        }).then((res) => {
            if (res['data'] && res['data'].length){
                this.suggestions = res['data']
            } else {
                this.suggestions = [];
            }
            console.log(res);
        }).catch((err) => {
            console.log(err);
            this.suggestions = [];
        })
    }

    clearSearch() {
        this.suggestions = [];
    }

    calculateTax() {
        console.log('done')
    }

    resetSearch() {
        this.suggestions = [];
        this.selectedProduct = null;
        if (this.searchComponent) this.searchComponent.searchValue = null;
    }

    selectItem(e) {
        console.log(e);
        this.selectedProduct = e;
        this.suggestions = [];
        if (this.searchComponent) this.searchComponent.searchValue = this.selectedProduct['description'];
    }
}
