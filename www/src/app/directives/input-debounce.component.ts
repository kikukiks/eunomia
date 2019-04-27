import { Component, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'input-debounce',
    templateUrl: './input-debounce.component.html',
    styleUrls: ['./input-debounce.component.less']
})

export class InputDebounceComponent {
    @Input() autocomplete: boolean;
    @Input() placeholder: string;
    @Input() delay: number = 300;
    @Input() required: boolean = false;
    @Input() completed: boolean = false;
    @Input() disabled: boolean = false;
    @Input() invalid: boolean = false;
    @Input() inputValue: string = '';
    @Input() inputId: string = '';
    @Input() suggestions = [];
    @Output() value = new EventEmitter();
    @Output() infocus = new EventEmitter();
    @Output() outfocus = new EventEmitter();
    @Output() select = new EventEmitter();
    @Output() clear = new EventEmitter();
    @ViewChild("dinput") dinput: ElementRef;
    active = false;
    public searchValue: string;

    constructor(private elementRef: ElementRef) {
        const example = fromEvent(elementRef.nativeElement, 'keyup').pipe(map(() => this.searchValue));
        const debouncedInput = example.pipe(debounceTime(500));

        const subscribe = debouncedInput.subscribe(val => {
            this.value.emit(val)
        });
    }

    ngOnInit() {
        if (this.inputValue) {
            this.searchValue = this.inputValue;
        }
    }

    focusEmit() {
        this.infocus.emit();
    }

    focusOutEmit() {
        if (!this.searchValue) this.active = false;
        this.outfocus.emit();
    }

    focusInInput() {
        this.dinput.nativeElement.focus();
        this.active = true;
        this.focusEmit();
    }

    resetSearch() {
        this.searchValue = '';
        setTimeout(() => this.focusInInput(), 200) // TODO
    }

    clearInput() {
        if (!this.disabled) {
            this.clear.emit();
        }
    }

    selectItem(e) {
        this.select.emit(e);
    }

}
