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
        { country: 'United Kingdom', code: 'GB' }
    ];

    euCountries = {
        "AT": { "isoCode": "AT", "name": "Austria", "vat": 20, "limit": 35000 },
        "BE": { "isoCode": "BE", "name": "Belgium", "vat": 21, "limit": 35000 },
        "BG": { "isoCode": "BG", "name": "Bulgaria", "vat": 20, "limit": 35762 },
        "HR": { "isoCode": "HR", "name": "Croatia", "vat": 25, "limit": 36349 },
        "CY": { "isoCode": "CY", "name": "Cyprus", "vat": 19, "limit": 35000 },
        "CZ": { "isoCode": "CZ", "name": "Czech Republic", "vat": 21, "limit": 44285 },
        "DK": { "isoCode": "DK", "name": "Denmark", "vat": 25, "limit": 37450 },
        "EE": { "isoCode": "EE", "name": "Estonia", "vat": 20, "limit": 35000 },
        "FI": { "isoCode": "FI", "name": "Finland", "vat": 24, "limit": 35000 },
        "FR": { "isoCode": "FR", "name": "France", "vat": 20, "limit": 35000 },
        "DE": { "isoCode": "DE", "name": "Germany", "vat": 19, "limit": 100000 },
        "GR": { "isoCode": "GR", "name": "Greece", "vat": 24, "limit": 35000 },
        "HU": { "isoCode": "HU", "name": "Hungary", "vat": 27, "limit": 27245 },
        "IE": { "isoCode": "IE", "name": "Ireland", "vat": 23, "limit": 35000 },
        "IT": { "isoCode": "IT", "name": "Italy", "vat": 22, "limit": 35000 },
        "LV": { "isoCode": "LV", "name": "Latvia", "vat": 21, "limit": 35000 },
        "LT": { "isoCode": "LT", "name": "Lithuania", "vat": 21, "limit": 35000 },
        "LU": { "isoCode": "LU", "name": "Luxembourg", "vat": 17, "limit": 100000 },
        "MT": { "isoCode": "MT", "name": "Malta", "vat": 18, "limit": 35000 },
        "NL": { "isoCode": "NL", "name": "Netherlands", "vat": 21, "limit": 100000 },
        "PL": { "isoCode": "PL", "name": "Poland", "vat": 23, "limit": 34861 },
        "PT": { "isoCode": "PT", "name": "Portugal", "vat": 23, "limit": 35000 },
        "RO": { "isoCode": "RO", "name": "Romania", "vat": 19, "limit": 65000 },
        "SK": { "isoCode": "SK", "name": "Slovakia", "vat": 20, "limit": 49790 },
        "SI": { "isoCode": "SI", "name": "Slovenia", "vat": 22, "limit": 50000 },
        "ES": { "isoCode": "ES", "name": "Spain", "vat": 7, "limit": 35000 },
        "SE": { "isoCode": "SE", "name": "Sweden", "vat": 25, "limit": 30200 },
        "GB": { "isoCode": "GB", "name": "United Kingdom", "vat": 20, "limit": 80995 }
    }

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
    vat = {
        reduced: false,
        rate: 0
    }

    transactionQuestions = {
        thresholdReached: null,
        goodsTransported: null,
        goodsInstalled: null
    }

    finished = null;
    loading = false;

    constructor(
        private feathers: Feathers
    ) {
    }

    ngOnInit() {
    }

    restart() {
        this.selectedProduct = null;
        this.steps = {
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
        };
        this.taxForm = {
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
        this.suggestions = [];
        this.payTaxesIn = null;
        this.transactionQuestions = {
            thresholdReached: null,
            goodsTransported: null,
            goodsInstalled: null
        };
        this.finished = null;
        this.vat = {
            reduced: false,
            rate: 0
        }
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
        this.loading = true;
        if (this.selectedProduct.rate_name) {
            this.feathers.service('vat_rates').find({
                query: {
                    country: this.payTaxesIn,
                    name: this.selectedProduct.rate_name
                }
            }).then((res) => {
                if (res && res['data'] && res['data'][0]) {
                    this.vat.reduced = true;
                    this.vat.rate = res['data'][0]['rate'];
                } else {
                    this.vat.reduced = false;
                    this.vat.rate = this.euCountries[this.payTaxesIn].vat;
                }
                this.loading = false;
                console.log(res);
            }).catch((err) => {
                this.vat.reduced = false;
                this.vat.rate = this.euCountries[this.payTaxesIn].vat;
                this.loading = false;
                console.log(err);
            })
        } else {
            this.vat.reduced = false;
            this.vat.rate = this.euCountries[this.payTaxesIn].vat;
            this.loading = false;
        }
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
        this.steps[1].active = true;


    }

    selectItem(e) {
        console.log(e);
        if (e && e.description) {
            this.suggestions = [];
            this.selectedProduct = e;
            if (this.searchComponent) this.searchComponent.searchValue = this.selectedProduct['description'];
            this.steps[2].open = true;
            this.steps[2].active = true;
            this.steps[1].active = false;
            this.steps[3].active = false;
            this.secondStepComplete();
        }
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

            if (this.taxForm.seller.vat_liable === false) {
                this.payTaxesIn = this.taxForm.seller.country;
            } else {
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
