import {ViewChildren, Component, Directive, ElementRef, Renderer} from '@angular/core';

@Directive({selector: 'input'})

export class MyInput {
  constructor(private _elRef:ElementRef, private _renderer:Renderer) {}
  focusIf(attrValue:string) {
    console.log(this._elRef.nativeElement.getAttribute('name'))
    if(this._elRef.nativeElement.getAttribute('name') === attrValue) {
      this._renderer.invokeElementMethod(this._elRef.nativeElement, 'focus', []);
      return true;
    }
    return false;
  }
}