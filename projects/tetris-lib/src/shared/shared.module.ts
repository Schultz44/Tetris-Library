import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebounceKeydownDirectiveDirective } from 'src/shared/directives/DebounceKeydownDirective.directive';

@NgModule({
  imports: [

  ],
  declarations: [
    DebounceKeydownDirectiveDirective
  ],
  exports: [
    DebounceKeydownDirectiveDirective
  ]
})
export class SharedModule { }
