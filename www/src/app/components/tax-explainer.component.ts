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
        threshold: null,
        transported: null,
        installed: null,
        seller: {
            vat_liable: null,
            country: null
        },
        buyer: {
            vat_liable: null,
            country: null
        }
    }

    suggestions = [];

    payTaxesIn = null;

    transactionQuestions = {
        thresholdReached: null,
        goodsTransported: null,
        goodsInstalled: null
    }

    finished = null;

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
            if (res['data'] && res['data'].length) {
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
        this.finished = true;
    }

    resetSearch() {
        this.suggestions = [];
        this.selectedProduct = null;
        if (this.searchComponent) this.searchComponent.searchValue = null;
        
        this.transactionQuestions = {
            thresholdReached: null,
            goodsTransported: null,
            goodsInstalled: null
        }

        this.taxForm.threshold = null;
        this.taxForm.transported = null;
        this.taxForm.installed = null;

        this.payTaxesIn = null;

        this.steps[2].active = false;
        this.steps[3].active = false;
        this.steps[1].active= true;


    }

    selectItem(e) {
        console.log(e);
        this.suggestions = [];
        this.selectedProduct = e;
        if (this.searchComponent) this.searchComponent.searchValue = this.selectedProduct['description'];
        this.steps[2].open = true;
        this.steps[2].active = true;
        this.steps[1].active = false;
        this.steps[3].active = false;
        this.secondStepComplete();
    }

    secondStepComplete() {
        if (
            this.selectedProduct
            && this.taxForm.seller.vat_liable !== null && this.taxForm.seller.country !== null
            && this.taxForm.buyer.vat_liable !== null && this.taxForm.buyer.country !== null
        ) {
            this.steps[3].open = true;
            this.steps[3].active = true;
            this.steps[1].active = false;
            this.steps[2].active = false;

            this.transactionQuestions = {
                thresholdReached: null,
                goodsTransported: null,
                goodsInstalled: null
            }

            this.taxForm.threshold = null;
            this.taxForm.transported = null;
            this.taxForm.installed = null;

            this.payTaxesIn = null;

            if (this.taxForm.buyer.vat_liable === false) {
                if (this.selectedProduct.type == 'service') this.payTaxesIn = this.taxForm.seller.country;
                else if (this.selectedProduct.type == 'product') this.transactionQuestions.thresholdReached = true;
            } else if (this.taxForm.buyer.vat_liable === true) {
                if (this.selectedProduct.type == 'service') this.payTaxesIn = this.taxForm.buyer.country;
                else if (this.selectedProduct.type == 'product') {
                    this.transactionQuestions.goodsTransported = true;
                }
            }
        }
    }

    checkLastStep(step) {
        if (step == 'threshold') {
            if (this.taxForm.threshold == true) this.payTaxesIn = this.taxForm.buyer.country;
            else this.payTaxesIn = this.taxForm.seller.country;
        } else if (step == 'transported') {
            if (this.taxForm.transported === false) {
                this.payTaxesIn = this.taxForm.buyer.country;
                this.transactionQuestions.goodsInstalled = false;
                this.taxForm.installed = null;
            } else {
                this.transactionQuestions.goodsInstalled = true;
                this.payTaxesIn = null;
            }
        } else if (step == 'installed') {
            if (this.taxForm.installed == true) this.payTaxesIn = this.taxForm.buyer.country;
            else this.payTaxesIn = this.taxForm.seller.country;
        }
    }
}
