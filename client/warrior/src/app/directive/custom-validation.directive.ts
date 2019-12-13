import { Directive, OnInit, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputType]'
})
export class CustomValidationDirective implements OnInit {

  @Input() appInputType: string;

  regex: RegExp;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.appInputType !== '') {
      if (this.appInputType === 'numberWithDecimal') {
        this.regex = new RegExp('^[0-9]{0,15}([\.]{1}[0-9]{0,2})?$');
      } else if (this.appInputType === 'onlyNumber') {
        this.regex = new RegExp(/^[0-9]*$/g);
      } else if (this.appInputType === 'onlyCharacter') {
        this.regex = new RegExp(/^[a-zA-Z]*$/g);
      } else if (this.appInputType === 'alphaNumeric') {
        this.regex = new RegExp(/^[a-zA-Z0-9 ]*$/g);
      } else if (this.appInputType === 'onlyLowercase') {
        this.regex = new RegExp(/^[a-z]*$/g);
      } else if (this.appInputType === 'onlyUppercase') {
        this.regex = new RegExp(/^[A-Z]*$/g);
      } else if (this.appInputType === 'alphaNumericWithSpecial') {
        this.regex = new RegExp(/^[!@#$%^*&/.+\w]*$/g);
      } else {
        this.regex = new RegExp(/^[a-zA-Z0-9]*$/g);
      }
    }
  }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    if (this.appInputType === 'onlyNumber') {
      this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }
}
