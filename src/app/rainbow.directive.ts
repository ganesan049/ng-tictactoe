import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appRainbow]'
})
export class RainbowDirective {
  possibleColors = [
    'darksalmon', 'hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
    'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'
  ];
  constructor() { }

  @HostBinding('style.color') color:string;
  @HostBinding('style.border-color') borderColor:string;

  @HostListener('keydown') newColor(){
    const colorPicker = Math.floor(Math.random()*this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPicker];
    console.log(this.color,this.borderColor)
  }
}
