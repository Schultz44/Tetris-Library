import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceKeydownDirective]'
})
export class DebounceKeydownDirectiveDirective {
  @Input() debounceTime = 500;
  @Output() debounceKeydown = new EventEmitter();
  private keydown = new Subject();
  private subscription: Subscription;
  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscription = this.keydown
      .pipe(throttleTime(this.debounceTime))
      .subscribe(e => this.debounceKeydown.emit(e));
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  keydownEvent(event: KeyboardEvent){
    event.preventDefault();
    event.stopPropagation();
    this.keydown.next(event)
    console.log('we did it', this.subscription)
  }

}
