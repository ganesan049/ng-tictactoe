import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import {takeUntil,tap,filter} from 'rxjs/operators'

@Directive({
  selector: '[appHoldable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  state: Subject<string> = new Subject();
  cancel:Observable<string>;
  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v == 'cancel'),
      tap(v => {
        console.log('%c stopped hold','color:red;font-weight:bold;')
        this.holdTime.emit(0);
      })
    )
  }

  @HostListener('mouseup',['$event'])
  @HostListener('mouseleave',['$event'])
  onExit(){
    this.state.next('cancel');
  }

  @HostListener('mousedown') onHold(){
    console.log('%c started hold','color:green;font-weight:bold;')
    this.state.next('start');

    const n = 100;
    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        console.log(v*n)
        this.holdTime.emit(v*n);
      })
    )
    .subscribe();
  }
}
