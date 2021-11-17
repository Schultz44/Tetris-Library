import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LibMyTetrisComponent } from './tetris-library.component';

describe('LibMyTetrisComponent', () => {
  let component: LibMyTetrisComponent;
  let fixture: ComponentFixture<LibMyTetrisComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LibMyTetrisComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LibMyTetrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
